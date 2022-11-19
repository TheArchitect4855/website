<script>
	import { Router } from 'svelte-spa-history-router';
    import Footer from './components/Footer.svelte';
    import Header from './components/Header.svelte';
    import Blog from './pages/Blog.svelte';
    import Contact from './pages/Contact.svelte';
	import Home from './pages/Home.svelte';
    import NotFound from './pages/NotFound.svelte';
    import Projects from './pages/Projects.svelte';
    import Post from './pages/Post.svelte';
    import Admin from './pages/Admin.svelte';
    import AdminLogin from './pages/admin/Login.svelte';
	import Login from './pages/Login.svelte';

	const routes = [
		{ path: '/', component: Home },
		{ path: '/blog', component: Blog },
		{ path: '/blog/(?<id>.+)' , component: Post },
		{ path: '/projects', component: Projects },
		{ path: '/contact', component: Contact },
		{ path: '/admin', component: Admin },
		{ path: '/admin/login', component: AdminLogin },
		{ path: '/login/(?<id>.+)', component: Login },
		{ path: '/.+', component: NotFound },
	];
</script>

<Header />
<Router { routes } />
<Footer />
