<script>
    import { marked } from "marked";
    import Selector from "./Selector.svelte";
	import * as requests from '../lib/requests';

	const tabs = [
		{ name: 'Editor', value: 0 },
		{ name: 'Preview', value: 1 },
	];

	export let postTitle = '';
	export let postMarkdown = '';

	let mediaDialog;
	let fileUpload;
	let currentTab = 0;
	let postHtml = '';
	$: postHtml = marked.parse(postMarkdown);

	async function uploadMedia() {
		const file = fileUpload[0];
		const id = await requests.upload('/media', file);
		if(file.type.startsWith('image/')) {
			postMarkdown += `![${file.name}](${requests.getApi()}/media/${id})`;
		} else {
			postMarkdown += `[${file.name}](${requests.getApi()}/media/${id})`;
		}
	}
</script>

<div>
	<Selector options={ tabs } bind:selected={ currentTab } />
	{#if currentTab == 0}
		<section class="editor">
			<div>
				<button on:click={() => mediaDialog.showModal()}>Insert Media</button>
				<dialog bind:this={ mediaDialog }>
					<h3>Upload Media</h3>
					<hr />
					<form method="dialog" on:submit={ uploadMedia }>
						<label>
							Select a file to upload:
							<input type="file" bind:files={ fileUpload } required />
						</label>
						<button type="submit">Upload</button>
						<button type="button" class="danger" on:click={() => mediaDialog.close()}>Cancel</button>
					</form>
				</dialog>
			</div>
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

	label {
		display: block;
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
