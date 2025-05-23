<script lang="ts">
	import type { Entry } from '$lib';

	const { entry, index }: { entry: Entry; index: string } = $props();

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
	const timeFormatted = $derived(formatHoursToMmSs(entry.time));
</script>

<tr>
	<td>{index}</td>
	<td>{entry.from}</td>
	<td>{entry.to}</td>
	<td>{isNaN(entry.heading) ? '-' : entry.heading.toLocaleString().padStart(3, '0')}</td>
	<td>{isNaN(entry.altitude) ? '-' : entry.altitude.toLocaleString()}</td>
	<td>{entry.distance.toLocaleString()}</td>
	<td>{timeFormatted}</td>
	<td>{entry.fuel.toFixed(1)}</td>
	<td dir="auto" class="text-start">{entry.identifierPoints || '-'}</td>
	<td dir="auto" class="text-start">{entry.story || '-'}</td>
</tr>
