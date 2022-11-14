<a href="/">Home</a>
<a href="/blog">Blog</a>
<a href="/projects">Projects</a>
<a href="https://resume.kurtisknodel.com" target="_blank" rel="noreferrer">Resumé</a>

<style>
	a {
		color: var(--text-color);
		position: relative;
		text-decoration: none;
	}

	a::after {
		background-color: var(--text-color);
		content: '';
		padding: 0.5px 0;
		transition: right 0.2s;

		position: absolute;
		top: calc(100% - 2px);
		left: 0;
		right: 100%;
	}

	a:hover::after {
		right: 0;
	}
</style>
