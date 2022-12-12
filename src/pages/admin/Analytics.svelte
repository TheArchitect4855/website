<script>
	import AdminGuard from "../../components/AdminGuard.svelte";
	import AnalyticsPage from '../../components/analytics/Page.svelte';

	let sessionData;
</script>

<AdminGuard bind:sessionData />
<main>
	<AnalyticsPage />
</main>
