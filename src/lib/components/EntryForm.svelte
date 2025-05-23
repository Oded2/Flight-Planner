<script lang="ts">
	import FormInput from './FormInput.svelte';
	import { addEntry, info } from '$lib/stores/info';
	import { next } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';

	const lastIndex = $info.entries.length - 1;

	let from: string = $state($info.entries[lastIndex < 0 ? 0 : lastIndex]?.to);
	let to: string = $state('');
	let heading: number = $state(NaN);
	let altitude: number = $state(NaN);
	let distance: number = $state(NaN);
	let identifierPoints: string = $state('');
	let story: string = $state('');

	function handleEntry(): void {
		const time = distance / $info.speed;
		const fuel = time * $info.fuelPerHour;
		addEntry({ from, to, heading, altitude, distance, identifierPoints, story, time, fuel });
		from = to;
		to = '';
		heading = NaN;
		altitude = NaN;
		distance = NaN;
		identifierPoints = '';
		story = '';
	}

	function handleFinish(): void {
		let incomplete = to.length > 0;
		incomplete = incomplete || !isNaN(heading);
		incomplete = incomplete || !isNaN(altitude);
		incomplete = incomplete || !isNaN(distance);
		incomplete = incomplete || identifierPoints.length > 0;
		incomplete = incomplete || story.length > 0;
		if (!incomplete) next();
		else if (confirm($t('incomplete_message'))) next();
	}
</script>

<form
	class="card bg-base-300 min-w-100"
	dir="auto"
	onsubmit={(e) => {
		e.preventDefault();
		handleEntry();
	}}
>
	<div class="card-body">
		<h2 class="card-title mb-2">
			{`${$t('entries_label')} ${($info.entries.length + 1).toLocaleString()}`}
		</h2>
		<div class="flex flex-col gap-3">
			<FormInput bind:value={from} label={$t('entry_from')} required></FormInput>
			<FormInput bind:value={to} label={$t('entry_to')} required></FormInput>
			<FormInput
				bind:value={heading}
				inputType="number"
				min={1}
				max={360}
				label={$t('entry_heading')}
			></FormInput>
			<FormInput
				bind:value={altitude}
				inputType="number"
				min={0}
				label={$t('entry_altitude')}
				required
			></FormInput>
			<FormInput
				bind:value={distance}
				inputType="number"
				min={0.001}
				step={0.001}
				label={$t('entry_distance')}
				required
			></FormInput>
			<FormInput bind:value={identifierPoints} label={$t('entry_identifier')}></FormInput>
			<FormInput bind:value={story} label={$t('entry_story')}></FormInput>
		</div>
		<div class="card-actions mt-2">
			<button type="submit" class="btn btn-primary w-full">{$t('add_entry')}</button>
			<button
				type="button"
				disabled={$info.entries.length == 0}
				onclick={handleFinish}
				class="btn btn-neutral w-full">{$t('finish_entries')}</button
			>
		</div>
	</div>
</form>
