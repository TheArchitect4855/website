<script>
	import { currentURL, Router } from 'svelte-spa-history-router';
    import Footer from './components/Footer.svelte';
    import Header from './components/Header.svelte';
    import Blog from './pages/Blog.svelte';
    import Contact from './pages/Contact.svelte';
	import Home from './pages/Home.svelte';
    import NotFound from './pages/NotFound.svelte';
    import Projects from './pages/Projects.svelte';

	const routes = [
		{ path: '/', component: Home },
		{ path: '/blog', component: Blog },
		{ path: '/projects', component: Projects },
		{ path: '/contact', component: Contact },
		{ path: '/.+', component: NotFound },
	];
</script>

<Header />
<Router { routes } />
<Footer />
