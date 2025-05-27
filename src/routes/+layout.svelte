<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { locale } from '$lib/stores/localization';
	import { infoTypeGuard } from '$lib';
	import { info } from '$lib/stores/info';
	import { page } from '$app/state';

	const { children } = $props();

	let isReady = $state(false);
	let originalTheme: string | null = null;

	const handleLanguageChange = (code: string) => {
		locale.set(code);
		localStorage.setItem('locale', code);
	};

	$effect(() => {
		if (isReady && page.url.pathname === '/view') {
			originalTheme = document.documentElement.getAttribute('data-theme');
			document.documentElement.setAttribute('data-theme', 'light');
		} else if (isReady && originalTheme)
			document.documentElement.setAttribute('data-theme', originalTheme);
	});

	onMount(() => {
		// Locale
		const storageLocale = localStorage.getItem('locale');
		if (storageLocale) locale.set(storageLocale);
		// Info
		const localStorageInfo = localStorage.getItem('info');
		if (localStorageInfo) {
			const infoJson = JSON.parse(localStorageInfo);
			if (infoTypeGuard(infoJson)) info.set(infoJson);
		}
		isReady = true;
	});
</script>

{#if isReady}
	<div class="flex min-h-screen flex-col print:min-h-auto">
		<Navbar {handleLanguageChange}></Navbar>
		{@render children()}
	</div>
{/if}
