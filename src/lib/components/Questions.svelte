<script lang="ts">
	import { next } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';
	import { info, updateInfo } from '$lib/stores/info';
	import FormInput from './FormInput.svelte';
	import { get } from 'svelte/store';
	import { inputToNum } from '$lib';

	const currentInfo = get(info);

	let title: string = $state(currentInfo.title);
	let owner: string = $state(currentInfo.owner);
	let rawFuelPerHour: string = $state(currentInfo.fuelPerHour.toString());
	const fuelPerHour: number | undefined = $derived(inputToNum(rawFuelPerHour));
	let rawSpeed: string = $state(currentInfo.speed.toString());
	const speed: number | undefined = $derived(inputToNum(rawSpeed));

	function handleSubmit() {
		if (!fuelPerHour || !speed) return;
		updateInfo('title', title.trim());
		updateInfo('owner', owner.trim());
		updateInfo('fuelPerHour', fuelPerHour);
		updateInfo('speed', speed);
		next();
	}
</script>

<form
	dir="auto"
	class="card card-lg bg-base-300 mx-auto my-auto w-200"
	onsubmit={(e) => {
		e.preventDefault();
		handleSubmit();
	}}
>
	<div class="card-body">
		<h2 class="card-title mb-2">{$t('first_questions_label')}</h2>
		<div class="flex flex-col gap-3">
			<FormInput
				label={$t('title_question')}
				placeholder={$t('title_placeholder')}
				bind:value={title}
			></FormInput>
			<FormInput
				label={$t('owner_question')}
				placeholder={$t('owner_placeholder')}
				bind:value={owner}
			></FormInput>
			<FormInput
				label={$t('fuel_question')}
				placeholder={$t('fuel_placeholder')}
				inputType="number"
				required
				min={0}
				bind:value={rawFuelPerHour}
			></FormInput>
			<FormInput
				label={$t('speed_question')}
				placeholder={$t('speed_placeholder')}
				inputType="number"
				required
				min={1}
				bind:value={rawSpeed}
			></FormInput>
		</div>
		<div class="card-actions mt-2 justify-end">
			<button type="submit" class="btn btn-primary">{$t('next')}</button>
		</div>
	</div>
</form>
