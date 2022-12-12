<script>
	import * as requests from '../../lib/requests';
    import Dots from './Dots.svelte';

	export let start;
	export let end;

	let data = null;
	$: load(start, end);

	async function load(start, end) {
		const views = await requests.get('/analytics/view', { view: 'views/%', start, end });
		const unique = await requests.get('/analytics/view', { view: 'unique_views/%', start, end });

		// Create & group per-page data
		const grouped = {};
		for(const { view, value } of views) {
			const page = view.substring('views'.length);
			if(grouped[page] == undefined) {
				grouped[page] = {
					views: 0,
					unique: 0,
				};
			}

			grouped[page].views += parseInt(value);
		}

		for(const { view, value } of unique) {
			const page = view.substring('unique_views'.length);
			if(grouped[page] == undefined) {
				grouped[page] = {
					views: 0,
					unique: 0,
				};
			}

			grouped[page].unique += parseInt(value);
		}

		// Order by views
		const rows = [];
		for(const page in grouped) {
			const { views, unique } = grouped[page];
			rows.push({
				page,
				views,
				unique,
			});
		}

		rows.sort((a, b) => b.views - a.views);
		data = rows.slice(0, 10);
	}
</script>

<h3>Site Content</h3>
{#if data}
	<table class="analytics">
		<thead>
			<tr>
				<th>Page</th>
				<th class="num">Views</th>
				<th class="num">Unique Views</th>
			</tr>
		</thead>
		<tbody>
			{#each data as row}
				<tr>
					<td>
						<a href={ row.page } target="_blank" rel="noreferrer">{ row.page }</a>
					</td>
					<td class="num">{ row.views }</td>
					<td class="num">{ row.unique }</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<Dots />
{/if}
