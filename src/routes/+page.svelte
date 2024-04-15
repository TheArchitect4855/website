<script>
	import BlogPosts from "$lib/BlogPosts.svelte";
	import projects from '$lib/projects.json';
</script>

<section>
	<h2>About Me</h2>
	<p>
		I am a skilled and self-taught software developer with over 10 years of experience.
		I like making video games and low-level tech.
	</p>
</section>

<section>
	<h2>Blog</h2>
	<BlogPosts />
</section>

<section>
	<h2>Projects</h2>
	<div class="projects">
	{#each projects as p}
	<article>
		<h3>{p.name}</h3>
		<div>{p.description}</div>
		<a href={p.link} target="_blank">Project Link</a>
	</article>
	{/each}
	</div>
</section>

<style>
	article {
		margin: 0;
		max-width: calc(50% - 3ch);
		min-width: 15ch;
	}

	.projects {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1ch;
	}
</style>
