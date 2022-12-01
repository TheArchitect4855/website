<script>
    import { marked } from "marked";
	import * as requests from '../../lib/requests';
	import * as router from 'svelte-spa-history-router';
    import PostEditor from "../../components/PostEditor.svelte";
    import AdminGuard from "../../components/AdminGuard.svelte";

	let sessionData;
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

<AdminGuard bind:sessionData />
<main>
	<h2>Create Post</h2>
	<PostEditor bind:postTitle bind:postMarkdown />
	<div>
		<button on:click={ submitPost }>Create Post</button>
	</div>
</main>
