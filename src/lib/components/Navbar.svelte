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

<div class="navbar bg-primary text-primary-content shadow-sm print:hidden">
	<div class="navbar-start gap-1">
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
			<NavMenu iconClass="fa-solid fa-globe" label="Language">
				{#each languages as language}
					<li><button onclick={() => updateLocale(language.code)}>{language.label}</button></li>
				{/each}
			</NavMenu>
			{#if isHome}
				<NavMenu iconClass="fa-solid fa-circle-half-stroke" label="Theme">
					<li><button data-set-theme="winter">Light</button></li>
					<li><button data-set-theme="nav">Dark</button></li>
				</NavMenu>
			{/if}
		</ul>
	</div>
</div>
