<script lang="ts">
	import type { Entry } from '$lib';
	import { editIndex, info } from '$lib/stores/info';
	import { t } from '$lib/stores/localization';

	const { entry, index, editable }: { entry: Entry; index: number; editable?: boolean } = $props();

	const time = $derived(entry.distance / $info.speed);
	const fuel = $derived(time * $info.fuelPerHour);

	function formatHour(hoursDecimal: number): string {
		// total seconds, rounded to nearest integer
		const totalSec = Math.round(hoursDecimal * 3600);

		// derive h, m, s
		const h = Math.floor(totalSec / 3600);
		const m = Math.floor((totalSec % 3600) / 60);
		const s = totalSec % 60;

		// helper for two-digit padding
		const pad2 = (n: number) => (n < 10 ? '0' : '') + n;

		// omit "hh:" when h is zero
		return h > 0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${m}:${pad2(s)}`;
	}
</script>

<tr>
	<td>{index == -1 ? $t('total') : (index + 1).toLocaleString()}</td>
	<td>{entry.from}</td>
	<td>{entry.to}</td>
	<td>{entry.heading?.toLocaleString().padStart(3, '0') ?? '-'}</td>
	<td>{entry.altitude?.toLocaleString() ?? '-'}</td>
	<td>{entry.distance.toLocaleString()}</td>
	<td>{formatHour(time)}</td>
	<td
		>{fuel.toLocaleString(undefined, {
			minimumFractionDigits: 0,
			maximumFractionDigits: 1
		})}
	</td>
	<td>{entry.identifierPoints || '-'}</td>
	<td>{entry.story || '-'}</td>
	{#if editable}
		<td>
			{#if index != -1}
				<button type="button" class="cursor-pointer underline" onclick={() => editIndex.set(index)}
					>{$t('edit')}</button
				>
			{:else}
				-
			{/if}
		</td>
	{/if}
</tr>
