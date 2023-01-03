<script>
	import { currentURL, Router } from 'svelte-spa-history-router';
	import * as analytics from './lib/analytics';
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
    import Redirect from './components/Redirect.svelte';

	const routes = [
		{ path: '/', component: Home },
		{ path: '/blog', component: Blog },

		// Blog redirects
		{ path: '/blog/ExQJVSoi7zhLSFVpr1_BEwfb3xup9dFnGIR2Jy0otXw=', resolver: redirectResolver('/blog/WrhAGKfvQEuuwWyHpGHWyQ') },
		{ path: '/blog/1Z7fBnGTIlOklNRJ0_nDXnANHcPRYSmRyakATw6lDts', resolver: redirectResolver('/blog/XaQDp4FqRwea7aw0ylgPog') },

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

		// Not found
		{ path: '/.+', component: NotFound },
	];

	let currentPage = null;
	currentURL.subscribe((v) => {
		if(currentPage) analytics.leavePage(currentPage);
		analytics.viewPage(v.pathname, document.referrer);
		currentPage = v.pathname;
	});

	function redirectResolver(to) {
		return (route) => {
			route.props.to = to;
			return Redirect;
		};
	}
</script>

<Header />
<Router { routes } />
<Footer />
