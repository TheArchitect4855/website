<script>
    import AdminAccount from "../components/AdminAccount.svelte";
	import AdminGuard from "../components/AdminGuard.svelte";
	import * as requests from '../lib/requests';
	import * as router from 'svelte-spa-history-router';
    import { onMount } from "svelte";
	import { toSqlDate } from '../lib/dates';
    import AdminCreateAccount from "../components/AdminCreateAccount.svelte";

	let sessionData;
	let accountData = null;
	let analyticsViews = 0;
	let analyticsUniqueViews = 0;
	let blogPostCount = 0;

	$: if(sessionData && !accountData) loadAccountData(sessionData.acct_id);

	onMount(load);

	async function load() {
		// Get analytics data
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const yesterday = new Date(today.getTime() - 86_400_000);
		const start = toSqlDate(yesterday);
		const end = toSqlDate(today);

		const viewsRes = await requests.get('/analytics/view', {
			view: 'views',
			start,
			end,
		});

		analyticsViews = viewsRes[0]?.value ?? 0;

		const uniqueViewsRes = await requests.get('/analytics/view', {
			view: 'unique_views',
			start,
			end,
		});

		analyticsUniqueViews = uniqueViewsRes[0]?.value ?? 0;

		// Get blog post data
		const blogRes = await requests.get('/blog', { limit: 0 });
		blogPostCount = blogRes.count;
	}

	async function loadAccountData(acctId) {
		const id = encodeURIComponent(acctId);
		const res = await requests.get(`/admin/account/${id}`, {});
		accountData = res;
	}

	async function logout() {
		const id = encodeURIComponent(localStorage.getItem('admin-session-id'));
		localStorage.removeItem('admin-session-id');
		await requests.del(`/admin/session/${id}`, {});
		router.push('/');
	}
</script>

<svelte:head>
	<title>Kurtis Knodel // Admin</title>
</svelte:head>
<AdminGuard bind:sessionData />
<main>
	<h2>Admin Page</h2>
	<div class="grid">
		<section>
			<h2>My Account</h2>
			{#if accountData?.error}
				<p class="error">{ accountData.error }</p>
			{:else if accountData}
				<AdminAccount data={ accountData } />
			{/if}
		</section>

		<section>
			<h2>Analytics</h2>
			<div class="inline">
				<h3>{ analyticsViews }</h3> views yesterday
			</div>
			<div class="inline">
				<h3>{ analyticsUniqueViews }</h3> unique views yesterday
			</div>
			<a href="/admin/analytics" use:router.link>View full report</a>
		</section>

		<section>
			<h2>Blog</h2>
			<div class="inline">
				<h3>{ blogPostCount }</h3> posts
			</div>
			<a href="/blog" target="_blank" rel="noreferrer" use:router.link>View All</a>
			<br />
			<a href="/admin/blog/new" use:router.link>Create Post</a>
		</section>

		{#if sessionData?.is_root}
			<section>
				<h2>Manage Accounts</h2>
				<AdminCreateAccount />
				<a href="/admin/manage-accounts" use:router.link>Manage Accounts</a>
			</section>
		{/if}
	</div>
	<button on:click={ logout }>Log Out</button>
</main>

<style>
	.inline {
		margin: 1em 0;
	}

	.inline > * {
		display: inline;
	}

	.grid {
		display: grid;
		gap: 1em;
		grid-auto-rows: 30ch;
		grid-template-columns: 1fr 1fr;
		margin: 1em 0;
	}

	main {
		max-width: 120ch;
	}

	section {
		background-color: var(--background-color-2);
		border-radius: 8px;
		padding: 1em;
	}

	section > h2 {
		margin: 0;
	}
</style>
