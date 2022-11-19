<script>
    import AdminAccount from "../components/AdminAccount.svelte";
import AdminGuard from "../components/AdminGuard.svelte";
	import * as requests from '../lib/requests';

	let sessionData;
	let accountData = null;

	$: if(sessionData && !accountData) loadAccountData(sessionData.acct_id);

	async function loadAccountData(acctId) {
		const id = encodeURIComponent(acctId);
		const res = await requests.get(`/admin/account/${id}`, {});
		accountData = res;
	}
</script>

<AdminGuard bind:sessionData />
<main>
	<h2>Admin Page</h2>
	<div class="grid">
		<section>
			<h3>My Account</h3>
			{#if accountData?.error}
				<p class="error">{ accountData.error }</p>
			{:else if accountData}
				<AdminAccount data={ accountData } />
			{/if}
		</section>

		{#if sessionData?.is_root}
			<section>
				<h3>Manage Accounts</h3>
				TODO
			</section>
		{/if}
	</div>
</main>

<style>
	.grid {
		display: grid;
		gap: 1em;
		grid-auto-rows: 30ch;
		grid-template-columns: 1fr 1fr;
	}

	main {
		max-width: 120ch;
	}

	section {
		background-color: var(--background-color-2);
		border-radius: 8px;
		padding: 1em;
	}

	section > h3 {
		margin: 0;
	}
</style>
