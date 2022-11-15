<script>
	import { Router } from 'svelte-spa-history-router';
    import Footer from './components/Footer.svelte';
    import Header from './components/Header.svelte';
	import Home from './pages/Home.svelte';
    import NotFound from './pages/NotFound.svelte';

	const routes = [
		{ path: '/', component: Home },
		{ path: '/.+', component: NotFound },
	];
</script>

<Header />
<Router { routes } />
<Footer />
