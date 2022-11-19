<script>
    import { link } from "svelte-spa-history-router";

	export let data;
</script>

<article class="float-hover">
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
	}

	article > h3 {
		margin: 0; 
	}
</style>
