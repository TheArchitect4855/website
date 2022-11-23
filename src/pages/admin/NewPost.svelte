<script>
    import { marked } from "marked";
    import Selector from "../../components/Selector.svelte";
	import * as requests from '../../lib/requests';
	import * as router from 'svelte-spa-history-router';

	const tabs = [
		{ name: 'Editor', value: 0 },
		{ name: 'Preview', value: 1 },
	];

	let currentTab = 0;
	let postTitle = '';
	let postMarkdown = '';
	let postHtml = '';
	$: postHtml = marked.parse(postMarkdown);

	async function submitPost() {
		if(!confirm('Create post?')) return;

		const { ext_id } = await requests.post('/blog', {
			title: postTitle,
			content: postMarkdown,
		});

		router.push(`/blog/${ext_id}`);
	}
</script>

<main>
	<h2>Create Post</h2>
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
	<div>
		<button on:click={ submitPost }>Create Post</button>
	</div>
</main>

<style>
	.editor {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 1em;
	}

	main {
		display: flex;
		flex-direction: column;
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
