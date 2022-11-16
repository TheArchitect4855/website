<script>
    import { onMount } from 'svelte';
	import { Router } from 'svelte-spa-history-router';
    import Footer from './components/Footer.svelte';
    import Header from './components/Header.svelte';
    import Blog from './pages/Blog.svelte';
    import Contact from './pages/Contact.svelte';
	import Home from './pages/Home.svelte';
    import NotFound from './pages/NotFound.svelte';
    import Projects from './pages/Projects.svelte';
	import * as requests from './lib/requests';
    import Post from './pages/Post.svelte';

	const routes = [
		{ path: '/', component: Home },
		{ path: '/blog', component: Blog },
		{ path: '/blog/(?<id>.+)' , component: Post },
		{ path: '/projects', component: Projects },
		{ path: '/contact', component: Contact },
		{ path: '/.+', component: NotFound },
	];

	onMount(() => {
		load();
	});

	async function load() {
		requests.get('/session', {});
	}
</script>

<Header />
<Router { routes } />
<Footer />
