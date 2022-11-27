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
	import AdminAnalytics from './pages/admin/Analytics.svelte';
	import AdminNewPost from './pages/admin/NewPost.svelte';
	import AdminEditPost from './pages/admin/EditPost.svelte';
	import AdminManageAccounts from './pages/admin/ManageAccounts.svelte';

	const routes = [
		{ path: '/', component: Home },
		{ path: '/blog', component: Blog },
		{ path: '/blog/(?<id>.+)' , component: Post },
		{ path: '/projects', component: Projects },
		{ path: '/contact', component: Contact },
		{ path: '/admin', component: Admin },
		{ path: '/admin/login', component: AdminLogin },
		{ path: '/admin/analytics', component: AdminAnalytics },
		{ path: '/admin/blog/new', component: AdminNewPost },
		{ path: '/admin/blog/edit', component: AdminEditPost },
		{ path: '/admin/manage-accounts', component: AdminManageAccounts },
		{ path: '/login/(?<id>.+)', component: Login },
		{ path: '/.+', component: NotFound },
	];
</script>

<Header />
<Router { routes } />
<Footer />
