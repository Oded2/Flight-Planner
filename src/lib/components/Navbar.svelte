<script lang="ts">
	import type { SelectOption } from '$lib';
	import { get } from 'svelte/store';
	import LabelSelect from './LabelSelect.svelte';
	import { locale, localeMap, updateLocale } from '$lib/stores/localization';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { page } from '$app/state';
	import { setStage } from '$lib/stores/stages';
	import { PUBLIC_REPO_LINK } from '$env/static/public';

	const isHome = $derived(!page.url.pathname.includes('view'));
	const languages: SelectOption[] = Object.entries(localeMap).map(([key, val]) => ({
		code: key,
		label: val.label
	}));
	const themes: SelectOption[] = [
		{
			code: 'default',
			label: 'Choose Theme',
			disabled: true
		},
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

	onMount(() => themeChange(false));
</script>

<div class="navbar bg-primary text-primary-content shadow-sm print:hidden">
	<div class="flex flex-1 gap-1">
		{#if isHome}
			<button onclick={() => setStage(0)} class="btn btn-ghost text-xl">Flight Planner</button>
		{:else}
			<a href="/" class="btn btn-ghost text-xl">Flight Planner</a>
		{/if}
		<a href={PUBLIC_REPO_LINK} class="btn btn-neutral" aria-label="Github Link">
			<i class="fa-brands fa-github text-2xl"></i>
		</a>
	</div>
	<div class="flex gap-4">
		<LabelSelect
			onchange={(e) => updateLocale(e.currentTarget.value)}
			options={languages}
			selectedOption={originalLocale}
		>
			Language
		</LabelSelect>
		<div class:hidden={!isHome}>
			<LabelSelect themes options={themes}>Theme</LabelSelect>
		</div>
	</div>
</div>
