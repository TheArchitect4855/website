<script>
    import { marked } from "marked";
    import Selector from "./Selector.svelte";

	const tabs = [
		{ name: 'Editor', value: 0 },
		{ name: 'Preview', value: 1 },
	];

	export let postTitle = '';
	export let postMarkdown = '';

	let currentTab = 0;
	let postHtml = '';
	$: postHtml = marked.parse(postMarkdown);
</script>

<div>
	<Selector options={ tabs } bind:selected={ currentTab } />
	{#if currentTab == 0}
		<section class="editor">
			<input type="text" placeholder="Post Title" bind:value={ postTitle } />
			<textarea placeholder="Start writing..." bind:value={ postMarkdown }></textarea>
		</section>
	{:else if currentTab == 1}
		<section>
			<h2>{ postTitle || 'No title' }</h2>
			{@html postHtml || 'No content'}
		</section>
	{:else}
		<p class="error">Invalid tab value "{ currentTab }"</p>
	{/if}
</div>

<style>
	.editor {
		display: flex;
		flex-direction: column;
		gap: 1em;
		height: 75vh;
	}

	section {
		margin: 1em 0;
	}

	textarea {
		box-sizing: border-box;
		flex-grow: 1;
		resize: none;
		width: 100%;
	}
</style>
