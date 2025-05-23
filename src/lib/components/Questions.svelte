<script lang="ts">
	import LabelInput from './LabelInput.svelte';
	import { next } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';
</script>

<form
	dir="auto"
	class="card card-lg bg-base-300 mx-auto my-auto max-w-200"
	onsubmit={(e) => {
		e.preventDefault();
		next();
	}}
>
	<div class="card-body">
		<h2 class="card-title mb-2">{$t('first_questions_label')}</h2>
		<div class="flex flex-col gap-3">
			<LabelInput
				label={$t('starting_point_question')}
				placeholder={$t('starting_point_placeholder')}
				param="startingPoint"
				required
			></LabelInput>
			<LabelInput
				label={$t('ending_point_question')}
				placeholder={$t('ending_point_placeholder')}
				param="endingPoint"
				required
			></LabelInput>
			<LabelInput
				label={$t('fuel_question')}
				placeholder={$t('fuel_placeholder')}
				param="fuelPerHour"
				inputType="number"
				required
				min={0}
				value={8}
			></LabelInput>
			<LabelInput
				label={$t('speed_question')}
				placeholder={$t('speed_placeholder')}
				param="speed"
				inputType="number"
				required
				min={1}
				value={90}
			></LabelInput>
		</div>
		<div class="card-actions mt-2 justify-end">
			<button type="submit" class="btn btn-primary">{$t('next')}</button>
		</div>
	</div>
</form>
