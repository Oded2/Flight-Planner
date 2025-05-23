<script lang="ts">
	import type { SelectOption } from '$lib';
	import { reset } from '$lib/stores/stages';
	import LabelSelect from './LabelSelect.svelte';

	const {
		locale,
		handleLanguageChange
	}: { locale: string; handleLanguageChange: (code: string) => void } = $props();

	const languages: SelectOption[] = [
		{ code: 'en', label: 'English' },
		{ code: 'he', label: 'עברית' },
		{ code: 'es', label: 'Español' }
	];
</script>

<div class="navbar bg-primary text-primary-content shadow-sm">
	<div class="flex-1">
		<button onclick={reset} class="btn btn-ghost text-xl">Flight Planner</button>
	</div>
	<div class="flex-none">
		<LabelSelect
			onchange={(e) => handleLanguageChange(e.currentTarget.value)}
			title="Language"
			options={languages}
			selectedOption={locale}
		></LabelSelect>
	</div>
</div>
