<script lang="ts">
	import LabelInput from './LabelInput.svelte';
	import { next } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';
	import { info } from '$lib/stores/info';
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
			<LabelInput label={$t('title_question')} placeholder={$t('title_placeholder')} param="title"
			></LabelInput>
			<LabelInput label={$t('owner_question')} placeholder={$t('owner_placeholder')} param="owner"
			></LabelInput>
			<LabelInput
				label={$t('fuel_question')}
				placeholder={$t('fuel_placeholder')}
				param="fuelPerHour"
				inputType="number"
				required
				min={0}
				value={$info.fuelPerHour}
			></LabelInput>
			<LabelInput
				label={$t('speed_question')}
				placeholder={$t('speed_placeholder')}
				param="speed"
				inputType="number"
				required
				min={1}
				value={$info.speed}
			></LabelInput>
		</div>
		<div class="card-actions mt-2 justify-end">
			<button type="submit" class="btn btn-primary">{$t('next')}</button>
		</div>
	</div>
</form>
