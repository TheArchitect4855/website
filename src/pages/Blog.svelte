<script>
	import { onMount } from "svelte";
	import PostPreview from "../components/PostPreview.svelte";
	import Spinner from "../components/Spinner.svelte";
	import * as requests from '../lib/requests';

	let posts = null;
	onMount(load);

	async function load() {
		posts = await requests.get('/blog', {});
	}
</script>

<svelte:head>
	<title>Kurtis Knodel // Blog</title>
	<meta name="description" content="See my latest blog posts about computer science, tech, and random cool things." />
</svelte:head>

<main>
	<h2>Blog</h2>
	{#if posts && posts.list.length > 0}
		{#each posts.list as post}
			<PostPreview data={ post } />
		{/each}
	{:else if posts}
		<p>There's nothing here... 🦗</p>
	{:else}
		<Spinner />
	{/if}
</main>
