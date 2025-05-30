<script lang="ts">
	import FormInput from './FormInput.svelte';
	import { addEntry, editEntry, editIndex, info, resetEditIndex } from '$lib/stores/info';
	import { t } from '$lib/stores/localization';
	import { back } from '$lib/stores/stages';
	import { get } from 'svelte/store';
	import { type Entry } from '$lib';
	import FormContainer from './FormContainer.svelte';
	import FormActions from './FormActions.svelte';
	import FormCard from './FormCard.svelte';
	import IconLabel from './IconLabel.svelte';

	const lastIndex = get(info).entries.length - 1;

	let from: string = $state($info.entries[lastIndex < 0 ? 0 : lastIndex]?.to ?? '');
	let to: string = $state('');
	let heading: number | null = $state(null);
	let altitude: number | null = $state(null);
	let distance: number | null = $state(null);
	let pointsText: string = $state('');
	let story: string = $state('');

	let originalEntriesLength = get(info).entries.length;

	function resetValues(): void {
		const lastEntry = get(info).entries.at(-1);
		from = lastEntry?.to ?? '';
		to = '';
		heading = null;
		altitude = null;
		distance = null;
		pointsText = '';
		story = '';
	}

	function handleEntry(): void {
		if (!distance) return;
		const entry: Entry = {
			from: from.trim(),
			to: to.trim(),
			heading: heading ?? undefined,
			altitude: altitude ?? undefined,
			distance,
			identifierPoints: pointsText
				.split(',')
				.map((val) => val.trim())
				.filter((val) => val),
			story: story.trim()
		};
		if (get(editIndex) == -1) {
			addEntry(entry);
			originalEntriesLength++;
		} else {
			editEntry(entry);
			resetEditIndex();
		}
		resetValues();
	}

	$effect(() => {
		const index = $editIndex;
		if (index != -1) {
			const entry = get(info).entries[index];
			from = entry.from;
			to = entry.to;
			heading = entry.heading ?? null;
			altitude = entry.altitude ?? null;
			distance = entry.distance ?? null;
			pointsText = entry.identifierPoints.join(', ');
			story = entry.story;
		} else {
			resetValues();
		}
	});

	$effect(() => {
		if ($info.entries.length == originalEntriesLength - 1) {
			resetValues();
			originalEntriesLength--;
		}
	});
</script>

<FormCard
	label={`${$t('entries_label')} ${(($editIndex == -1 ? $info.entries.length : $editIndex) + 1).toLocaleString()}`}
	active={$editIndex != -1}
	handleSubmit={handleEntry}
>
	<button
		type="button"
		onclick={() => {
			if ($editIndex == -1) back();
			else {
				resetEditIndex();
				resetValues();
			}
		}}
		class="btn btn-neutral btn-xs me-auto"
	>
		{$editIndex == -1 ? $t('back') : $t('cancel')}
	</button>
	<FormContainer>
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
		<FormInput
			bind:value={pointsText}
			label={$t('entry_identifier')}
			placeholder={$t('seperate_commas')}
			tooltip={$t('placeholder_comma')}
		></FormInput>
		<FormInput bind:value={story} label={$t('entry_story')}></FormInput>
	</FormContainer>
	<FormActions>
		<a
			href="/view"
			target="_blank"
			class="btn btn-secondary"
			class:btn-disabled={$info.entries.length == 0}
		>
			<IconLabel iconClass="fa-solid fa-up-right-from-square" label="View"></IconLabel>
		</a>
		<button type="submit" class="btn btn-primary">
			<IconLabel
				iconClass="fa-solid fa-circle-plus"
				label={$editIndex == -1 ? $t('add_entry') : $t('edit_entry')}
			></IconLabel>
		</button>
	</FormActions>
</FormCard>
