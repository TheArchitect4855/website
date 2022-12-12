<script>
	import { Line } from 'svelte-chartjs';
	import * as requests from '../../lib/requests';
	import Dots from './Dots.svelte';

	export let start;
	export let end;
	export let colours;

	let data = null;
	let totalViews = 0;
	let totalUniqueViews = 0;
	$: load(start, end);

	async function load(start, end) {
		// TODO: Bounce rate
		const views = await requests.get('/analytics/view', { view: 'views', start, end });
		const unique = await requests.get('/analytics/view', { view: 'unique_views', start, end });

		totalViews = views.reduce((s, v) => s + parseInt(v.value), 0);
		totalUniqueViews = unique.reduce((s, v) => s + parseInt(v.value), 0);

		const datasets = [
			{
				data: views.map((v) => v.value),
				label: 'Views',
				backgroundColor: colours[0] + 'aa',
				borderColor: colours[0],
			},
			{
				data: unique.map((v) => v.value),
				label: 'Unique Views',
				backgroundColor: colours[1] + 'aa',
				borderColor: colours[1],
			}
		];

		data = {
			datasets,
			labels: views.map((v) => v.date),
		};
	}
</script>

<h3>Summary</h3>
{#if data}
	<section>
		<span class="num">{ totalViews }</span> views
		&nbsp;&nbsp;&nbsp;&nbsp;
		<span class="num">{ totalUniqueViews }</span> unique views
	</section>
	<Line data={ data } />
{:else}
	<Dots />
{/if}

<style>
	.num {
		font-size: 1.25rem;
	}
</style>
