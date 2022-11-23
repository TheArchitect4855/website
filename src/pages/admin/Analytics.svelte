<script>
    import AdminGuard from "../../components/AdminGuard.svelte";
	import { Line } from 'svelte-chartjs';
    import { toSqlDate } from "../../lib/dates";
	import * as requests from '../../lib/requests';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	let sessionData;

	const now = new Date();
	let analyticsEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	let analyticsStart = new Date(analyticsEnd.getTime() - 604_800_000);

	let viewChartData = null;
	$: loadAnalyticsData(analyticsStart, analyticsEnd);

	async function loadAnalyticsData(start, end) {
		const views = await requests.get('/analytics/view', {
			view: 'views',
			start: toSqlDate(start),
			end: toSqlDate(end),
		});

		const uniqueViews = await requests.get('/analytics/view', {
			view: 'unique_views',
			start: toSqlDate(start),
			end: toSqlDate(end),
		});

		// https://coolors.co/dd7700-e40066-03cea4-4c86a8-574ae2
		const labels = views.map((v) => v.date);
		const datasets = [
			{
				label: 'Views',
				data: views.map((v) => v.value),
				backgroundColor: '#e06a',
				borderColor: '#e40066',
			},
			{
				label: 'Unique Views',
				data: uniqueViews.map((v) => v.value),
				backgroundColor: '#0caa',
				borderColor: '#03cea4',
			},
		];

		viewChartData = {
			labels,
			datasets,
		};
	}
</script>

<AdminGuard bind:sessionData />
<main>
	<h2>Analytics</h2>
	{#if viewChartData}
		<Line data={ viewChartData } />
	{/if}
</main>
