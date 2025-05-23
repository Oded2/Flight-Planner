<script lang="ts">
	import type { Entry } from '$lib';
	import { t } from 'svelte-i18n';

	const { entry }: { entry: Entry } = $props();

	function formatHoursToMmSs(hours: number): string {
		// Convert hours to total seconds and round appropriately
		const totalSeconds = Math.round(hours * 3600);

		// Calculate total minutes and remaining seconds
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		// Format as "MM:SS"
		const mm = minutes;
		const ss = seconds.toString().padStart(2, '0');

		return `${mm}:${ss}`;
	}
	const timeFormatted = formatHoursToMmSs(entry.time);
</script>

<div class="bg-base-300 flex w-full gap-8 rounded px-10 py-3">
	{@render Box($t('entry_from'), entry.from)}
	{@render Box($t('entry_to'), entry.to)}
	{@render Box($t('entry_heading'), entry.heading.toLocaleString().padStart(3, '0'))}
	{@render Box($t('entry_altitude'), entry.altitude.toLocaleString())}
	{@render Box($t('entry_distance'), entry.distance.toLocaleString())}
	{@render Box($t('entry_time'), timeFormatted)}
	{@render Box($t('entry_fuel'), entry.fuel.toFixed(1))}
	{@render Box($t('entry_story'), entry.story)}
</div>

{#snippet Box(label: string, value?: string)}
	<div class="text-center">
		<h4 class="mb-1 font-medium underline">{label}</h4>
		{#if value}
			<h5>{value}</h5>
		{:else}
			<h5 class="italic">N/A</h5>
		{/if}
	</div>
{/snippet}
