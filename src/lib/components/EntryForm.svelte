<script lang="ts">
	import { t } from 'svelte-i18n';
	import FormInput from './FormInput.svelte';
	import { addEntry } from '$lib/stores/info';

	let entryNum: number = $state(1);

	let from: string = $state('');
	let to: string = $state('');
	let heading: number = $state(NaN);
	let altitude: number = $state(NaN);
	let distance: number = $state(NaN);
	let identifierPoints: string[] = $state([]);
	let story: string | undefined = $state();

	function handleEntry(): void {
		const time = distance / 90;
		const fuel = time * 8;
		addEntry({ from, to, heading, altitude, distance, identifierPoints, story, time, fuel });
		entryNum++;
		from = to;
		to = '';
		heading = NaN;
		altitude = NaN;
		distance = NaN;
		identifierPoints = [];
		story = '';
	}
</script>

<form
	class="card bg-base-300 max-w-200"
	onsubmit={(e) => {
		e.preventDefault();
		handleEntry();
	}}
>
	<div class="card-body">
		<h2 class="card-title mb-2">{`${$t('entries_label')} ${entryNum}`}</h2>
		<div class="flex flex-col gap-3">
			<FormInput bind:value={from} label={$t('entry_from')} required></FormInput>
			<FormInput bind:value={to} label={$t('entry_to')} required></FormInput>
			<FormInput
				bind:value={heading}
				inputType="number"
				min={1}
				max={360}
				label={$t('entry_heading')}
				required
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
				label={$t('entry_distance')}
				required
			></FormInput>
			<FormInput bind:value={story} label={$t('entry_story')}></FormInput>
		</div>
		<div class="card-actions mt-2">
			<button type="submit" class="btn btn-primary w-full">Add Entry</button>
		</div>
	</div>
</form>
