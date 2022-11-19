<script>
    import { onMount } from "svelte";
	import { link, routeParams } from "svelte-spa-history-router";
	import * as requests from '../lib/requests';
	import * as marked from 'marked';
    import Spinner from "../components/Spinner.svelte";

	let id = $routeParams.id;
	let data = null;
	onMount(load);
	async function load() {
		data = await requests.get(`/blog/${id}`, {});
		data.content = marked.parse(data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
	}
</script>

<svelte:head>
	{#if data}
		<title>Kurtis Knodel // { data.title }</title>
	{:else}
		<title>Kurtis Knodel // Blog</title>
	{/if}
</svelte:head>

<main>
	{#if data}
		<h2>{ data.title }</h2>
		<small>By { data.author } | Posted { new Date(data.posted).toLocaleString() } | { data.views } views</small>
		<hr />
		<div>{@html data.content }</div>
		<a href="/blog" use:link>Back</a>
	{:else}
		<Spinner />
	{/if}
</main>
