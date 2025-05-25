<script lang="ts">
	import { info } from '$lib/stores/info';
	import EntryRow from './EntryRow.svelte';
	import type { Entry } from '$lib';
	import { t } from '$lib/stores/localization';

	const totalEntry: Entry = $derived({
		from: '-',
		to: '-',
		distance: $info.entries.reduce((acc, item) => (acc += item.distance), 0),
		identifierPoints: '-',
		story: '-'
	});
</script>

<div class="rounded-box border-base-content/5 bg-base-100 w-full overflow-auto border">
	<table class="table-zebra table text-center" dir="auto">
		{#if $info.title}
			<caption class="mt-3 text-xl font-semibold" dir="auto">
				{$info.title}
			</caption>
		{/if}
		<thead>
			<tr>
				<th>#</th>
				<th>{$t('entry_from')}</th>
				<th>{$t('entry_to')}</th>
				<th>{$t('entry_heading')}</th>
				<th>{$t('entry_altitude')}</th>
				<th>{$t('entry_distance')}</th>
				<th>{$t('entry_time')}</th>
				<th>{$t('entry_fuel')}</th>
				<th>{$t('entry_identifier')}</th>
				<th>{$t('entry_story')}</th>
			</tr>
		</thead>
		<tbody>
			{#each $info.entries as entry, index}
				<EntryRow {entry} index={(index + 1).toLocaleString()}></EntryRow>
			{/each}
			{#if $info.entries.length > 1}
				<EntryRow entry={totalEntry} index={$t('total')}></EntryRow>
			{/if}
		</tbody>
	</table>
</div>
