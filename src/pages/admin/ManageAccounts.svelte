<script>
    import AdminAccount from "../../components/AdminAccount.svelte";
import AdminGuard from "../../components/AdminGuard.svelte";
    import Spinner from "../../components/Spinner.svelte";
	import * as requests from '../../lib/requests';

	let sessionData;
	let offset = 0;
	let limit = 10;
	let accounts = null;

	$: load(offset, limit);
	async function load(offset, limit) {
		const res = await requests.get('/admin/account', {
			offset,
			limit,
		});

		accounts = res;
	}
</script>

<AdminGuard bind:sessionData />
<main>
	<h2>Manage Accounts</h2>
	{#if accounts?.error}
		<p class="error">{ accounts.error }</p>
	{:else if accounts}
		<p>Showing { offset + 1 } to { Math.min(limit, accounts.count) } of { accounts.count } accounts </p>
		{#each accounts.list as acct}
			<article>
				<AdminAccount bind:data={ acct } />
			</article>
		{/each}
	{:else}
		<Spinner />
	{/if}
</main>

<style>
	article {
		background-color: var(--background-color-2);
		border-radius: 8px;
		margin: 1em 0;
		padding: 1em;
	}
</style>
