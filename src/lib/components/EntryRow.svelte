<script lang="ts">
	import type { Entry } from '$lib';
	import { editIndex, info, removeEntry } from '$lib/stores/info';
	import { t } from '$lib/stores/localization';
	import OptionButton from './OptionButton.svelte';

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
	<td>{index == -1 ? $t('total') : (index + 1).toLocaleString()} </td>
	<td class="whitespace-nowrap">{entry.from}</td>
	<td class="whitespace-nowrap">{entry.to}</td>
	<td>{entry.heading?.toLocaleString().padStart(3, '0') ?? '-'}</td>
	<td>{entry.altitude?.toLocaleString() ?? '-'}</td>
	<td>{entry.distance.toLocaleString()}</td>
	<td>{formatHour(time)}</td>
	<td>
		{fuel.toLocaleString(undefined, {
			minimumFractionDigits: 0,
			maximumFractionDigits: 1
		})}
	</td>
	<td class="overflow-hidden overflow-ellipsis" class:max-w-100={editable}>
		{#if entry.identifierPoints.length > 1}
			<div class="inline-flex">
				<ul class="list-outside list-disc px-1">
					{#each entry.identifierPoints as point}
						<li>{point.replaceAll('_', ',')}</li>
					{/each}
				</ul>
			</div>
		{:else}
			{entry.identifierPoints[0]?.replaceAll('_', ',') ?? '-'}
		{/if}
	</td>
	<td class="overflow-hidden overflow-ellipsis" class:max-w-100={editable}>{entry.story || '-'}</td>
	{#if editable}
		<td
			class="sticky end-0"
			class:bg-base-100={index == -1 || index % 2 == 0}
			class:bg-base-200={index != -1 && index % 2 != 0}
		>
			{#if index != -1}
				<div class="flex gap-1.5 overflow-visible">
					<OptionButton tooltip={$t('edit')} handleClick={() => editIndex.set(index)}>
						<i class="fa-solid fa-pen-to-square"></i>
					</OptionButton>
					<OptionButton tooltip={$t('remove')} isError handleClick={() => removeEntry(index)}>
						<i class="fa-solid fa-eraser"></i>
					</OptionButton>
				</div>
			{:else}
				-
			{/if}
		</td>
	{/if}
</tr>
