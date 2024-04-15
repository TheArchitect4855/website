<script lang="ts">
	import { onMount } from "svelte";

	type FeedItem = {
		content_html: string,
		content_text: string,
		date_published: string,
		id: string,
		title: string,
		url: string,
	};

	type JsonFeed = {
		feed_url: string,
		home_page_url: string,
		items: FeedItem[],
		title: string,
		version: string,
	};

	type Post = {
		title: string,
		preview: string,
		link: string,
	};

	const url = 'https://kurtis.weblog.lol/feed.json';
	const previewLen = 150;
	onMount(loadPosts);

	let error: string;
	let posts: Post[];

	async function loadPosts() {
		const req = await fetch(url);
		if (!req.ok) {
			error = `${req.status} ${req.statusText}:\n${await req.text()}`;
			return;
		}

		const content = await req.json() as JsonFeed;
		const elem = document.createElement('div');
		posts = content.items.map((e) => {
			elem.innerHTML = e.content_html; // I trust my own weblog
		const titleLen = e.title.length + 1;
			let preview = elem.innerText.substring(titleLen);
			if (preview.length > previewLen) preview = preview.substring(0, previewLen - 3) + '...';
			return {
				title: e.title,
				link: e.url,
				preview,
			};
		});
	}
</script>

{#if posts}
{#each posts as p}
<article>
	<h3>{p.title}</h3>
	<p>{p.preview}</p>
	<a href={p.link}>Read More</a>
</article>
{/each}
{:else if error}
<span style:color="red">{error}</span>
{:else}
<i>Loading...</i>
{/if}
