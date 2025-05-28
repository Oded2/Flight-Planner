<script lang="ts">
	import { t } from '$lib/stores/localization';
	import { onMount } from 'svelte';
	import EntryForm from './EntryForm.svelte';
	import Table from './Table.svelte';

	const XLBREAKPOINT = 1280;

	let refDiv: HTMLDivElement;
	let xlContainer: HTMLDivElement;

	let ready = $state(false);

	function updateTable() {
		requestAnimationFrame(() => {
			ready = false;
			const height = refDiv.getBoundingClientRect().height;
			if (window.innerWidth > XLBREAKPOINT) xlContainer.style.maxHeight = `${height}px`;
			else xlContainer.style.maxHeight = `99999px`;
			ready = true;
		});
	}

	onMount(() => {
		updateTable();
		window.addEventListener('resize', updateTable);
		return () => window.removeEventListener('resize', updateTable);
	});
</script>

<div bind:this={refDiv} class="flex grow grid-cols-6 flex-col gap-4 xl:grid" dir="auto">
	<!-- Placeholder text in order for dir="auto" to work properly -->
	<h1 class="hidden">{$t('welcome')}</h1>
	<div class="w-full overflow-auto xl:col-span-2">
		<EntryForm></EntryForm>
	</div>
	<div bind:this={xlContainer} class="mx-auto flex w-full xl:col-span-4">
		{#if ready}
			<Table editable></Table>
		{/if}
	</div>
</div>
