<script lang="ts">
	import Table from '$lib/components/Table.svelte';
	import { info } from '$lib/stores/info';
	import { t } from '$lib/stores/localization';
	import { onMount } from 'svelte';

	onMount(() => {
		document.documentElement.setAttribute('data-theme', 'light');
	});
</script>

<div class="p-5 print:p-0" dir="auto">
	<Table></Table>
	<div class="mx-2 my-10 flex flex-col gap-1 print:hidden">
		<button class="btn btn-primary me-auto" onclick={() => print()}>{$t('print')}</button>
		<span class="text-sm font-light italic">{$t('print_tip')}</span>
	</div>
</div>

<svelte:head>
	<title>{`${$info.startingPoint} ${$t('entry_to')} ${$info.endingPoint}`}</title>
</svelte:head>
