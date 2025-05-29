<script lang="ts">
	import { localeMap, updateLocale } from '$lib/stores/localization';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { page } from '$app/state';
	import { setStage } from '$lib/stores/stages';
	import { PUBLIC_REPO_LINK } from '$env/static/public';
	import NavMenu from './NavMenu.svelte';

	const isHome = $derived(!page.url.pathname.includes('view'));
	const languages = Object.entries(localeMap).map(([key, val]) => ({
		code: key,
		label: val.label
	}));

	onMount(() => themeChange(false));
</script>

<div class="navbar bg-primary text-primary-content justify-between shadow-sm print:hidden">
	<div class="flex gap-1">
		{#if isHome}
			<button onclick={() => setStage(0)} class="btn btn-ghost text-xl">Flight Planner</button>
		{:else}
			<a href="/" class="btn btn-ghost text-xl">Flight Planner</a>
		{/if}
		<a href={PUBLIC_REPO_LINK} class="btn btn-neutral" aria-label="Github Link">
			<i class="fa-brands fa-github text-2xl"></i>
		</a>
	</div>
	<div class="navbar-end">
		<ul class="menu menu-horizontal px-1 print:hidden">
			<NavMenu label="Language">
				{#each languages as language}
					<li><button onclick={() => updateLocale(language.code)}>{language.label}</button></li>
				{/each}
			</NavMenu>
			<NavMenu label="Theme">
				<li><button data-set-theme="light">Light</button></li>
				<li><button data-set-theme="dark">Dark</button></li>
			</NavMenu>
		</ul>
	</div>
</div>
