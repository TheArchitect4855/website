<script>
    import { onMount } from "svelte";
	import * as router from 'svelte-spa-history-router';
	import * as requests from '../lib/requests';

	export let sessionData;

	onMount(async () => {
		let session = localStorage.getItem('admin-session-id');
		if(!session) {
			router.push('/admin/login');
			return;
		}

		session = encodeURIComponent(session);
		const res = await requests.get(`/admin/session/${session}`, {});

		if(res.error) {
			router.push('/admin/login');
			return;
		}

		sessionData = res;
	});
</script>
