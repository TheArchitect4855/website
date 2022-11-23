<script>
	export let options;
	export let selected = null;
</script>

<div class="container">
	{#each options as { name, value }}
		<button class={ selected == value ? 'selected' : '' } on:click={() => selected = value}>
			{ name }
		</button>
	{/each}
</div>

<style>
	.container {
		display: flex;
		gap: 1ch;
	}

	button {
		background-color: transparent;
		border: 1px solid var(--background-color-4);
		color: var(--text-color-2);
		transition: background-color 0.5s, color 0.5s;
	}

	button.selected {
		background-color: var(--highlight-color);
		color: black;
	}
</style>
