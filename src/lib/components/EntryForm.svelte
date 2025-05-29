<script lang="ts">
	import FormInput from './FormInput.svelte';
	import { addEntry, editEntry, editIndex, info, resetEditIndex } from '$lib/stores/info';
	import { t } from '$lib/stores/localization';
	import { back } from '$lib/stores/stages';
	import { get } from 'svelte/store';
	import { inputToNum, type Entry } from '$lib';

	const lastIndex = $info.entries.length - 1;

	let from: string = $state($info.entries[lastIndex < 0 ? 0 : lastIndex]?.to ?? '');
	let to: string = $state('');
	let rawHeading: string = $state('');
	const heading: number | undefined = $derived(inputToNum(rawHeading));
	let rawAltitude: string = $state('');
	const altitude: number | undefined = $derived(inputToNum(rawAltitude));
	let rawDistance: string = $state('');
	const distance: number | undefined = $derived(inputToNum(rawDistance));
	let identifierPoints: string = $state('');
	let story: string = $state('');

	$effect(() => {
		const index = $editIndex;
		if (index != -1) {
			const entry = get(info).entries[index];
			from = entry.from;
			to = entry.to;
			rawHeading = entry.heading?.toString() ?? '';
			rawAltitude = entry.altitude?.toString() ?? '';
			rawDistance = entry.distance.toString() ?? '';
			identifierPoints = entry.identifierPoints;
			story = entry.story;
		} else {
			resetValues();
		}
	});

	function resetValues(): void {
		const lastEntry = get(info).entries.at(-1);
		from = lastEntry?.to ?? '';
		to = '';
		rawHeading = '';
		rawAltitude = lastEntry?.altitude?.toString() ?? '';
		rawDistance = '';
		identifierPoints = '';
		story = '';
	}

	function handleEntry(): void {
		if (!distance) return;
		const entry: Entry = {
			from: from.trim(),
			to: to.trim(),
			heading,
			altitude,
			distance,
			identifierPoints: identifierPoints.trim(),
			story: story.trim()
		};
		if (get(editIndex) == -1) {
			addEntry(entry);
		} else {
			editEntry(entry);
			resetEditIndex();
		}
		resetValues();
	}
</script>

<form
	class="card bg-base-300 outline-info/50 m-1 min-w-100 transition-none"
	class:outline={$editIndex != -1}
	dir="auto"
	onsubmit={(e) => {
		e.preventDefault();
		handleEntry();
	}}
>
	<div class="card-body">
		<div class="mb-2">
			<h2 class="card-title">
				{`${$t('entries_label')} ${(($editIndex == -1 ? $info.entries.length : $editIndex) + 1).toLocaleString()}`}
			</h2>
			<button
				type="button"
				onclick={() => {
					if ($editIndex == -1) back();
					else {
						resetEditIndex();
						resetValues();
					}
				}}
				class="me-auto cursor-pointer font-light underline"
			>
				{$editIndex == -1 ? $t('back') : $t('cancel')}
			</button>
		</div>
		<div class="flex flex-col gap-3">
			<FormInput bind:value={from} label={$t('entry_from')} required></FormInput>
			<FormInput bind:value={to} label={$t('entry_to')} required></FormInput>
			<FormInput
				bind:value={rawHeading}
				inputType="number"
				min={1}
				max={360}
				step={1}
				label={$t('entry_heading')}
			></FormInput>
			<FormInput
				bind:value={rawAltitude}
				inputType="number"
				min={0}
				label={$t('entry_altitude')}
				required
			></FormInput>
			<FormInput
				bind:value={rawDistance}
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
			<button type="submit" class="btn btn-primary w-full"
				>{$editIndex == -1 ? $t('add_entry') : $t('edit_entry')}</button
			>
			<a
				href="/view"
				target="_blank"
				class="btn btn-neutral w-full"
				class:btn-disabled={$info.entries.length == 0}
			>
				<i class="fa-solid fa-arrow-up-right-from-square"></i>
				{$t('view')}
			</a>
		</div>
	</div>
</form>
