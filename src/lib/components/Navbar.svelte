<script lang="ts">
	import type { SelectOption } from '$lib';
	import LabelSelect from './LabelSelect.svelte';

	const { handleLanguageChange }: { handleLanguageChange: (code: string) => void } = $props();

	const languages: SelectOption[] = [
		{ code: 'en', label: 'English' },
		{ code: 'he', label: 'עברית' }
	];
</script>

<div class="navbar bg-primary text-primary-content shadow-sm">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Flight Planner</a>
	</div>
	<div class="flex-none">
		<LabelSelect
			onchange={(e) => handleLanguageChange(e.currentTarget.value)}
			title="Language"
			options={languages}
		></LabelSelect>
	</div>
</div>
