<script>
	import projects from "../assets/projects.json";
</script>

<svelte:head>
	<title>Kurtis Knodel // Projects</title>
	<meta name="description" content="Check out my projects!" />
</svelte:head>

<main>
	<h2>Projects</h2>
	<div class="container">
		{#each projects as proj}
			<article class="float-hover">
				<h3>{ proj.title }</h3>
				<p>{ proj.description }</p>
				<a href={ proj.link } target="_blank" rel="noreferrer">Project Link</a>
			</article>
		{/each}
	</div>
</main>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}

	article {
		background-color: var(--background-color-2);
		border-radius: 8px;
		box-shadow: 0 0 0 #0005;
		padding: 1em;
	}

	article > h3 {
		margin: 0;
	}
</style>
