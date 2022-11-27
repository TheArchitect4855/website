<script>
    import { onMount } from "svelte";
    import PostPreview from "../components/PostPreview.svelte";
    import Spinner from "../components/Spinner.svelte";
	import * as requests from '../lib/requests';

	let latestPost = null;
	onMount(load);
	async function load() {
		const res = await requests.get('/blog', { limit: 1 });
		latestPost = res.list[0];
	}
</script>

<svelte:head>
	<title>Kurtis Knodel // Home</title>
</svelte:head>

<main>
	<h2>Welcome!</h2>
	<p>
		I'm Kurtis. I am a skilled software developer who is always trying to learn something new.
		I have been programming since I was 11 years old, and throughout this time I have learned
		a lot about the field. I am currently taking freelance contracts, so if you need something
		done please <a href="mailto:kurtis@kurtisknodel.com?subject=Freelance%20Work">let me know</a>.
	</p>
	<hr />
	<h2>The Latest from Me</h2>
	<iframe width="100%" src="https://www.youtube-nocookie.com/embed/S8n3ywvMdW8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	{#if latestPost}
		<PostPreview data={ latestPost } />
	{/if}
</main>

<style>
	iframe {
		aspect-ratio: 16/9;
		border-radius: 8px;
	}
</style>
