<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { setLocale } from '$lib/stores/localization';

	let { children } = $props();

	let isReady = $state(true);

	const handleLanguageChange = (code: string) => {
		setLocale(code);
		localStorage.setItem('locale', code);
	};

	// onMount(() => {
	// 	const storageLocale = localStorage.getItem('locale');
	// 	if (storageLocale) locale.set(storageLocale);
	// 	const unsubscribe = isLoading.subscribe((loading) => {
	// 		if (!loading) isReady = true;
	// 	});
	// 	return unsubscribe;
	// });
</script>

{#if isReady}
	<div class="flex min-h-screen flex-col print:min-h-auto">
		<Navbar locale={'en'} {handleLanguageChange}></Navbar>
		{@render children()}
	</div>
{/if}
