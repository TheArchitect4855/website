<script>
	import * as router from 'svelte-spa-history-router';
	import * as requests from '../lib/requests';
	let message = null;

	async function createAccount(e) {
		e.preventDefault();

		const form = new FormData(e.target);
		const res = await requests.post('/admin/account', {
			name: form.get('name'),
			email: form.get('email'),
		});

		if(res.error) {
			message = res.error;
		} else {
			router.push('/admin/manage-accounts');
		}
	}
</script>
<form on:submit={ createAccount }>
	<label>
		Email:
		<input name="email" type="text" pattern=".+@.+\..+" required />
	</label>
	<label>
		Name:
		<input name="name" type="text" required />
	</label>
	<button type="submit">Create User</button>
	<p class="error">{ message ?? '' }</p>
</form>

<style>
	label {
		display: block;
		margin: 0.5em 0;
	}
</style>
