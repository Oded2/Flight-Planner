<script lang="ts">
	import type { Entry } from '$lib';

	const { entry, index }: { entry: Entry; index: string } = $props();

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
	const timeFormatted = $derived(formatHour(entry.time));
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
	<td dir="auto" class:text-start={entry.identifierPoints}>{entry.identifierPoints || '-'}</td>
	<td dir="auto" class:text-start={entry.story}>{entry.story || '-'}</td>
</tr>
