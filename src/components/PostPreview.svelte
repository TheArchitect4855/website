<script>
	import { link } from "svelte-spa-history-router";
	import { toHumanReadable } from "../lib/strings";
	import * as requests from '../lib/requests';

	export let data;

	async function deletePost() {
		if(!confirm(`Are you sure you want to delete ${data.title}? This cannot be undone!`)) return;
		await requests.del(`/blog/${data.id}`, {});
		window.location.reload();
	}
</script>

<article class="float-hover">
	<h3>{ data.title }</h3>
	<p>{ data.content }</p>
	<small>
		{#if data.posted}
			Posted { new Date(data.posted).toLocaleDateString() }
		{:else}
			Created { new Date(data.created).toLocaleDateString() } | Private
		{/if}
		| { toHumanReadable(data.views) } views
	</small>
	<br />
	<a href={ `/blog/${data.id}` } use:link>Read More</a>
	{#if localStorage.getItem('admin-session-id')}
		&nbsp;<a href={ `/admin/blog/edit?id=${data.id}` } use:link>Edit</a>
		&nbsp;<button class="link" on:click={ deletePost }>Delete</button>
	{/if}
</article>

<style>
	article {
		background-color: var(--background-color-2);
		border-radius: 8px;
		margin: 1em 0;
		padding: 1em;
	}

	article > h3 {
		margin: 0; 
	}
</style>
