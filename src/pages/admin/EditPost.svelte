<script>
    import { onMount } from "svelte";
    import AdminGuard from "../../components/AdminGuard.svelte";
    import PostEditor from "../../components/PostEditor.svelte";
    import Spinner from "../../components/Spinner.svelte";
	import * as requests from '../../lib/requests';
	import * as router from 'svelte-spa-history-router';

	let sessionData;
	let isPublic;
	let postData = null;

	onMount(load);

	async function load() {
		const params = new URLSearchParams(window.location.search);
		const id = params.get('id');
		postData = await requests.get(`/blog/${id}`, {});
		isPublic = postData.posted != null;
	}

	async function save() {
		if(!confirm('Save changes?')) return;

		await requests.patch(`/blog/${postData.id}`, {
			title: postData.title,
			content: postData.content,
			is_public: isPublic,
		});

		router.push('/blog');
	}
</script>

<AdminGuard bind:sessionData />
<main>
	<h2>Edit Post</h2>
	{#if postData?.error}
		<p class="error">{ postData.error }</p>
	{:else if postData}
		<PostEditor bind:postTitle={ postData.title } bind:postMarkdown={ postData.content } />
		<button on:click={ save }>Save</button>
		<label>
			<input type="checkbox" bind:checked={ isPublic } />
			Public?
		</label>
	{:else}
		<Spinner />
	{/if}
</main>
