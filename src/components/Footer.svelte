<script>
    import { link } from "svelte-spa-history-router";

	const year = new Date().getFullYear();
</script>

<footer>
	<span>Copyright &copy; Kurtis Knodel { year }</span>
	<a href="/contact" use:link>Contact Me</a>
</footer>

<style>
	a {
		color: var(--background-color-4);
	}

	footer {
		background-color: var(--text-color-2);
		color: var(--background-color-1);
		font-size: 0.75rem;
		padding: 0.5rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
