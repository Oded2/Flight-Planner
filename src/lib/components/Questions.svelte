<script lang="ts">
	import { next } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';
	import { info } from '$lib/stores/info';
	import FormInput from './FormInput.svelte';
</script>

<form
	dir="auto"
	class="card card-lg bg-base-300 mx-auto my-auto w-200"
	onsubmit={(e) => {
		e.preventDefault();
		next();
	}}
>
	<div class="card-body">
		<h2 class="card-title mb-2">{$t('first_questions_label')}</h2>
		<div class="flex flex-col gap-3">
			<FormInput
				label={$t('title_question')}
				placeholder={$t('title_placeholder')}
				bind:value={$info.title}
			></FormInput>
			<FormInput
				label={$t('owner_question')}
				placeholder={$t('owner_placeholder')}
				bind:value={$info.owner}
			></FormInput>
			<FormInput
				label={$t('fuel_question')}
				placeholder={$t('fuel_placeholder')}
				inputType="number"
				required
				min={0}
				bind:value={$info.fuelPerHour}
			></FormInput>
			<FormInput
				label={$t('speed_question')}
				placeholder={$t('speed_placeholder')}
				inputType="number"
				required
				min={1}
				bind:value={$info.speed}
			></FormInput>
		</div>
		<div class="card-actions mt-2 justify-end">
			<button type="submit" class="btn btn-primary">{$t('next')}</button>
		</div>
	</div>
</form>
