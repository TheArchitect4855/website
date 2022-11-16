<script>
    import { link } from "svelte-spa-history-router";

	export let data;
</script>

<article>
	<h3>{ data.title }</h3>
	<p>{ data.content }</p>
	<small>Posted { new Date(data.posted).toLocaleDateString() } | { data.views } views</small>
	<br />
	<a href={ `/blog/${data.ext_id}` } use:link>Read More</a>
</article>

<style>
	article {
		background-color: var(--background-color-2);
		border-radius: 8px;
		margin: 1em 0;
		padding: 1em;
		transition: box-shadow 0.2s, transform 0.2s;
	}

	article:hover {
		box-shadow: 0 0 10px #0005;
		transform: scale(1.05);
	}

	article > h3 {
		margin: 0; 
	}
</style>
