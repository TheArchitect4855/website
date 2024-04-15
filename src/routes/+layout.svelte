<script lang="ts">
	import motd from '$lib/motd.json';
	import { onMount } from 'svelte';

	let messageOfTheDay: string = '';

	const epoch = 1695451740;
	const secondsPerRotation = 86_164;
	const secondsPerRevolution = 31_557_556;
	const secondsPerQuarter = secondsPerRevolution / 4;
	let neodate: string = '';

	onMount(() => {
		const frac = Date.now() % 1000;
		setTimeout(() => setInterval(tickNeodate, 8), frac);
		tickNeodate();
	});

	function tickNeodate() {
		const now = Date.now() / 1000 - epoch;
		const timeOfDay = (now % secondsPerRotation / secondsPerRotation * 100).toFixed(2).padStart(5, '0');
		const revolution = Math.floor(now / secondsPerRevolution);
		const quarter = Math.floor(now / secondsPerQuarter);
		const rotationOfQuarter = Math.ceil((now - quarter * secondsPerQuarter) / secondsPerRotation);
		const quarterOfRevolution = Math.ceil((now - revolution * secondsPerRevolution) / secondsPerQuarter);
		neodate = `${timeOfDay} ${rotationOfQuarter}R/${quarterOfRevolution}Q/R${revolution + 1}`;

		const rotation = Math.round(now / secondsPerRotation);
		messageOfTheDay = motd[rotation % motd.length];
	}
</script>

<header>
	<div>
		<h1>Kurtis Knodel</h1>
		<div>{ messageOfTheDay }</div>
	</div>
	<div style:text-align="right">
		<div style:white-space="nowrap">{ neodate }</div>
		<a href="https://resume.kurtisknodel.com" target="_blank">resum&eacute;</a>
	</div>
</header>

<main>
	<slot></slot>
</main>

<style>
	@media (prefers-color-scheme: dark) {
		:global(html) {
			--color-highlight: #a00;
			--color-surface: #111;
			--color-on-surface: #eee;
		}
	}

	:global(a) {
		color: var(--color-highlight);
	}

	:global(a[target="_blank"]::after) {
		content: '⬈';
		font-size: 80%;
	}

	:global(article) {
		border: 2px solid var(--color-on-surface);
		margin-block: 1ch;
		padding: 1ch;
	}

	:global(article h3) {
		margin: 0;
	}

	:global(body) {
		background-color: var(--color-surface);
		color: var(--color-on-surface);
		font-family: 'Merriweather', serif;
		font-size: 15px;
		margin: 0 auto;
		max-width: 80ch;
		padding: 1ch;
	}

	header {
		border-bottom: 1px solid var(--color-on-surface);
		padding-bottom: 1em;

		display: flex;
		align-items: start;
		justify-content: space-between;
	}

	header h1 {
		margin: 0;
	}
</style>
