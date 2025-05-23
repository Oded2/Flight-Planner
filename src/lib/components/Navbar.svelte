<script lang="ts">
	import type { SelectOption } from '$lib';
	import { reset } from '$lib/stores/info';
	import { get } from 'svelte/store';
	import LabelSelect from './LabelSelect.svelte';
	import { locale } from '$lib/stores/localization';

	const { handleLanguageChange }: { handleLanguageChange: (code: string) => void } = $props();

	const languages: SelectOption[] = [
		{ code: 'en', label: 'English' },
		{ code: 'he', label: 'עברית' }
	];

	const originalLocale = get(locale);
</script>

<div class="navbar bg-primary text-primary-content shadow-sm print:hidden">
	<div class="flex-1">
		<button onclick={reset} class="btn btn-ghost text-xl">Flight Planner</button>
	</div>
	<div class="flex-none">
		<LabelSelect
			onchange={(e) => handleLanguageChange(e.currentTarget.value)}
			title="Language"
			options={languages}
			selectedOption={originalLocale}
		></LabelSelect>
	</div>
</div>
