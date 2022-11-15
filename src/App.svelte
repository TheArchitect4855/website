<script>
	import { Router } from 'svelte-spa-history-router';
    import Footer from './components/Footer.svelte';
    import Header from './components/Header.svelte';
	import Home from './pages/Home.svelte';

	const routes = [
		{ path: '/', component: Home },
	];
</script>

<Header />
<Router { routes } />
<Footer />
