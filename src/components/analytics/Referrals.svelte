<script>
	import * as requests from '../../lib/requests';
    import Dots from './Dots.svelte';

	export let start;
	export let end;

	let data = null;
	$: load(start, end);

	async function load(start, end) {
		const pages = await requests.get('/analytics/view', { view: 'referrers/%', start, end });

		// Group data
		const groups = {};
		for(const { value } of pages) {
			if(!value) continue;

			const referrers = value.split(',').filter((v) => v);
			for(const ref of referrers) {
				if(!groups[ref]) groups[ref] = 0;
				groups[ref] += 1;
			}
		}

		// Order by view count
		data = [];
		for(const page in groups) {
			data.push({
				page,
				referrals: groups[page],
			});
		}

		data.sort((a, b) => b.referrals - a.referrals);
	}
</script>

<h3>Referrals</h3>
{#if data}
	<table class="analytics">
		<thead>
			<tr>
				<th>Site</th>
				<th class="num">Count</th>
			</tr>
		</thead>
		<tbody>
			{#each data as row}
				<tr>
					<td>{ row.page }</td>
					<td class="num">{ row.referrals }</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<Dots />
{/if}
