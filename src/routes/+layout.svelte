<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { locale, isLoading } from 'svelte-i18n';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	let isReady = $state(false);

	const handleLanguageChange = (code: string) => {
		locale.set(code);
		localStorage.setItem('locale', code);
	};

	onMount(() => {
		const storageLocale = localStorage.getItem('locale');
		if (storageLocale) locale.set(storageLocale);
		const unsubscribe = isLoading.subscribe((loading) => {
			if (!loading) isReady = true;
		});
		return unsubscribe;
	});
</script>

{#if isReady}
	<div class="flex min-h-screen flex-col print:min-h-auto">
		<Navbar locale={$locale ?? 'en'} {handleLanguageChange}></Navbar>
		{@render children()}
	</div>
{/if}
