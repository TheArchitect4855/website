<script>
    import NavLinks from "./NavLinks.svelte";
	import { currentURL } from 'svelte-spa-history-router';

	let mobNavOpen = false;
	currentURL.subscribe(() => {
		mobNavOpen = false;
		window.scrollTo(window.scrollX, 0);
	});

	document.addEventListener('click', () => {
		mobNavOpen = false;
	});
</script>

<header>
	<h1>Kurtis Knodel</h1>
	<nav class="desktop">
		<NavLinks />
	</nav>
</header>

<nav class={ mobNavOpen ? 'mobile visible' : 'mobile hidden' } on:click={(e) => e.stopPropagation()} on:keypress={console.dir}>
	<NavLinks />
</nav>

<button class="mobile" on:click={(e) => {
	e.stopPropagation();
	mobNavOpen = !mobNavOpen
}}>
	{#if mobNavOpen}
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
			<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
		</svg>
	{/if}
</button>

<style>
	@media only screen and (max-device-width: 480px) {
		.desktop {
			display: none !important;
		}
	}

	@media only screen and (min-device-width: 480px) {
		.mobile {
			display: none !important;
		}
	}

	h1 {
		margin: 0;
	}

	header {
		background-color: var(--background-color-1);
		border-bottom: 1px solid var(--text-color-1);
		box-shadow: 0 0 5px #0005;
		padding: 0.5em 1em;
		position: sticky;
		top: 0;
		z-index: 100;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	nav.desktop {
		display: flex;
		gap: 1em;
	}

	nav.mobile {
		background-color: var(--background-color-1);
		border-left: 1px solid var(--text-color-1);
		box-shadow: 0 0 5px #0005;
		padding: 1em 1em 6rem 1em;
		transition: transform 0.5s;
		width: 50vw;
		z-index: 50;

		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		gap: 1em;

		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
	}

	.hidden {
		transform: translateX(100%);
	}

	.visible {
		transform: translateX(0);
	}

	button.mobile {
		border: none;
		border-radius: 50%;
		box-shadow: 0 0 5px #0005;
		cursor: pointer;
		padding: 0;
		z-index: 150;

		position: fixed;
		right: 2rem;
		bottom: 2rem;
		width: 3.5rem;
		height: 3.5rem;
	}

	button.mobile > .icon {
		width: 2rem;
		height: 2rem;
		margin: 0.75rem;
	}
</style>
