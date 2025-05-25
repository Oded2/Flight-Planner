<script lang="ts">
	import FormInput from './FormInput.svelte';
	import { addEntry, info } from '$lib/stores/info';
	import { t } from '$lib/stores/localization';

	const lastIndex = $info.entries.length - 1;

	let from: string = $state($info.entries[lastIndex < 0 ? 0 : lastIndex]?.to);
	let to: string = $state('');
	let heading: number | undefined = $state();
	let altitude: number | undefined = $state();
	let distance: number | undefined = $state();
	let identifierPoints: string = $state('');
	let story: string = $state('');

	function handleEntry(): void {
		if (!distance || !altitude) return;
		const time = distance / $info.speed;
		const fuel = time * $info.fuelPerHour;
		addEntry({
			from: from.trim(),
			to: to.trim(),
			heading,
			altitude,
			distance,
			identifierPoints: identifierPoints.trim(),
			story: story.trim(),
			time,
			fuel
		});
		localStorage.setItem('info', JSON.stringify($info));
		from = to;
		to = '';
		heading = undefined;
		distance = undefined;
		identifierPoints = '';
		story = '';
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
				step={1}
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
			<a href="/view" target="_blank" class="btn btn-neutral w-full">{$t('view')}</a>
		</div>
	</div>
</form>
