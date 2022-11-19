<script>
    import { onMount } from 'svelte';
	import { routeParams, push  } from 'svelte-spa-history-router';
	import * as requests from '../lib/requests';

	let id = $routeParams.id;
	onMount(async () => {
		const res = await requests.get('/admin/session/activate', { id });
		localStorage.setItem('admin-session-id', res);
		push('/admin');
	});
</script>
