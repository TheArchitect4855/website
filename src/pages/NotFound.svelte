<script>
    import { link } from "svelte-spa-history-router";

</script>
<svelte:head>
	<title>Kurtis Knodel // Nowhere</title>
</svelte:head>

<main>
	<h1>There's nothing here.</h1>
	<h3>Perhaps you got lost...</h3>
	<a href="/" use:link>Take me Home</a>
</main>

<style>
	main {
		margin-top: 20vh;
		text-align: center;
	}
</style>