<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { locale } from '$lib/stores/localization';

	let { children } = $props();

	let isReady = $state(false);

	const handleLanguageChange = (code: string) => {
		locale.set(code);
		localStorage.setItem('locale', code);
	};

	onMount(() => {
		const storageLocale = localStorage.getItem('locale');
		if (storageLocale) locale.set(storageLocale);
		isReady = true;
	});
</script>

{#if isReady}
	<div class="flex min-h-screen flex-col print:min-h-auto">
		<Navbar {handleLanguageChange}></Navbar>
		{@render children()}
	</div>
{/if}
