<script>
	import * as requests from '../../lib/requests';
	let message = null;
	let canSubmit = true;

	async function login(e) {
		e.preventDefault();

		const email = document.querySelector('#email-input').value;
		const res = await requests.post('/admin/session', {
			email,
		});

		if(res?.error) {
			message = res.error;
			return;
		}

		canSubmit = false;
		message = 'Login link sent';
	}
</script>

<main>
	<div>
		<h2>Admin Login</h2>
		<form on:submit={ login }>
			<label for="email-input">Email:</label>
			<input id="email-input" type="text" pattern=".+@.+\..+" required />
			<button type="submit" disabled={ !canSubmit }>Log In</button>
			<p class="error">{ message ?? '' }</p>
		</form>
	</div>
</main>

<style>
	input {
		display: block;
		margin: 1em 0;
	}

	main {
		display: flex;
		padding-top: 25vh;
		justify-content: center;
	}
</style>
