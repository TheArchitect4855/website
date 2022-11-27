<script>
	import * as requests from '../lib/requests';
	import * as router from 'svelte-spa-history-router';

	export let data;

	let email = data.email;
	let name = data.name;
	let busy = false;
	let message = null;

	async function updateAccount(e) {
		e.preventDefault();
		busy = true;

		const acctId = encodeURIComponent(data.id);
		const res = await requests.patch(`/admin/account/${acctId}`, {
			email, name,
		});

		data = res;
		busy = false;
	}

	async function deleteAccount() {
		if(!confirm(`Are you sure you want to DELETE ${ name }? This cannot be undone.`)) return;

		busy = true;
		const acctId = encodeURIComponent(data.id);
		const res = await requests.del(`/admin/account/${acctId}`, {});
		if(res?.error) {
			message = res.error;
			busy = false;
		} else {
			localStorage.removeItem('admin-session-id');
			router.push('/admin/login');
		}
	}
</script>

<form
	class="container"
	on:submit={ updateAccount }
>
	<div>
		Account ID: <span class="mono">{ data.id }</span>
		<br />
		Org ID: <span class="mono">{ data.org }</span>
	</div>
	<label>
		Email:
		<input name="email" type="text" bind:value={ email } required />
	</label>
	<label>
		Name:
		<input name="name" type="text" bind:value={ name } required />
	</label>
	<div>
		Account created
		{ new Date(data.created).toLocaleString() }
	</div>
	<div>
		<button type="submit" disabled={ busy }>Save</button>
		<button class="danger" type="button" disabled={ busy } on:click={ deleteAccount }>Delete Account</button>
	</div>
	<p class="error">{ message ?? '' }</p>
</form>

<style>
	.container > * {
		display: block;
		margin: 0.5em 0;
	}

	.mono {
		font-family: monospace;
	}
</style>
