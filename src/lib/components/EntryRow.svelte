<script lang="ts">
	import type { Entry } from '$lib';
	import { editIndex, info, removeEntry } from '$lib/stores/info';
	import { t } from '$lib/stores/localization';
	import { get } from 'svelte/store';

	const { entry, index, editable }: { entry: Entry; index: number; editable?: boolean } = $props();

	const time = $derived(entry.distance / $info.speed);
	const fuel = $derived(time * $info.fuelPerHour);

	function formatHour(hoursDecimal: number): string {
		const totalSec = Math.round(hoursDecimal * 3600);
		const h = Math.floor(totalSec / 3600);
		const m = Math.floor((totalSec % 3600) / 60);
		const s = totalSec % 60;
		const pad2 = (n: number) => (n < 10 ? '0' : '') + n;
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
				<div class="flex flex-col gap-0.5">
					<button
						type="button"
						class="cursor-pointer underline"
						onclick={() => editIndex.set(index)}>{$t('edit')}</button
					>
					<button
						type="button"
						class="cursor-pointer underline"
						onclick={() => {
							if (get(editIndex) == index) editIndex.set(-1);
							removeEntry(index);
						}}
					>
						{$t('remove')}
					</button>
				</div>
			{:else}
				-
			{/if}
		</td>
	{/if}
</tr>
