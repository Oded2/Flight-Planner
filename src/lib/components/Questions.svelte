<script lang="ts">
	import { next } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';
	import { info, updateInitialInfo } from '$lib/stores/info';
	import FormInput from './FormInput.svelte';
	import { get } from 'svelte/store';
	import FormContainer from './FormContainer.svelte';
	import FormActions from './FormActions.svelte';

	const currentInfo = get(info);

	let title: string = $state(currentInfo.title);
	let owner: string = $state(currentInfo.owner);
	let fuelPerHour: number | null = $state(currentInfo.fuelPerHour);
	let speed: number | null = $state(currentInfo.speed);

	function handleSubmit() {
		if (!fuelPerHour || !speed) return;
		updateInitialInfo(title.trim(), owner.trim(), fuelPerHour, speed);
		next();
	}
</script>

<form
	dir="auto"
	class="card bg-base-300 my-auto md:mx-auto md:w-2xl"
	onsubmit={(e) => {
		e.preventDefault();
		handleSubmit();
	}}
>
	<div class="card-body">
		<h2 class="card-title mb-2">{$t('first_questions_label')}</h2>
		<FormContainer>
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
				bind:value={fuelPerHour}
			></FormInput>
			<FormInput
				label={$t('speed_question')}
				placeholder={$t('speed_placeholder')}
				inputType="number"
				required
				min={1}
				bind:value={speed}
			></FormInput>
		</FormContainer>
		<FormActions>
			<button type="submit" class="btn btn-primary">{$t('next')}</button>
		</FormActions>
	</div>
</form>
