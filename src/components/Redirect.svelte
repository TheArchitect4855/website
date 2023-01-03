<script>
	import { onMount } from "svelte";
	import { push } from "svelte-spa-history-router";

	export let to;
	onMount(() => push(to));
</script>
