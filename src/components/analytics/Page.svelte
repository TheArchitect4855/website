<script>
	import Summary from './Summary.svelte';
	import { toSqlDate } from "../../lib/dates";
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
    import SiteContent from './SiteContent.svelte';
    import Referrals from './Referrals.svelte';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	const colours = [
		'#ff0000',
		'#ffac00',
		'#fff100',
		'#0bff00',
		'#00f6ff',
		'#7f00ff',
	];

	const now = new Date();
	let analyticsEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	let analyticsStart = new Date(analyticsEnd.getTime() - 604_800_000);

	let startSql = toSqlDate(analyticsStart);
	let endSql = toSqlDate(analyticsEnd);
</script>

<h2>Analytics</h2>
<Summary start={ startSql } end={ endSql } colours={ colours } />
<SiteContent start={ startSql } end={ endSql } />
<Referrals start={ startSql } end={ endSql } />
