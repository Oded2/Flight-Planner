<script lang="ts">
	import type { SelectOption } from '$lib';
	import { reset } from '$lib/stores/info';
	import { get } from 'svelte/store';
	import LabelSelect from './LabelSelect.svelte';
	import { locale } from '$lib/stores/localization';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { page } from '$app/state';

	const isHome = !page.url.pathname.includes('view');

	onMount(() => themeChange(false));

	const { handleLanguageChange }: { handleLanguageChange: (code: string) => void } = $props();

	const languages: SelectOption[] = [
		{ code: 'en', label: 'English' },
		{ code: 'he', label: 'עברית' }
	];

	const themes: SelectOption[] = [
		{
			code: 'light',
			label: 'Light'
		},
		{
			code: 'dark',
			label: 'Dark'
		}
	];

	const originalLocale = get(locale);
</script>

<div class="navbar bg-primary text-primary-content shadow-sm print:hidden">
	<div class="flex-1">
		{#if isHome}
			<button onclick={reset} class="btn btn-ghost text-xl">Flight Planner</button>
		{:else}
			<a href="/" class="btn btn-ghost text-xl">Flight Planner</a>
		{/if}
	</div>
	<div class="flex gap-4">
		<LabelSelect
			onchange={(e) => handleLanguageChange(e.currentTarget.value)}
			label="Language"
			options={languages}
			selectedOption={originalLocale}
		></LabelSelect>
		{#if isHome}
			<LabelSelect themes label="Theme" options={themes}></LabelSelect>
		{/if}
	</div>
</div>
