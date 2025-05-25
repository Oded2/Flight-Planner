<script lang="ts">
	import DownloadJson from '$lib/components/DownloadJSON.svelte';
	import Table from '$lib/components/Table.svelte';
	import { info } from '$lib/stores/info';
	import { t } from '$lib/stores/localization';
	import { onMount } from 'svelte';

	onMount(() => {
		document.documentElement.setAttribute('data-theme', 'light');
		const localStorageInfo = localStorage.getItem('info');
		if (localStorageInfo) info.set(JSON.parse(localStorageInfo));
	});
</script>

<div class="p-5 print:p-0" dir="auto">
	<Table></Table>
	<div class="mx-2 mt-10">
		<div class="flex flex-col gap-1">
			<span class="text-sm font-light italic">
				{$t('table_disclaimer')
					.replace('%SPEED%', $info.speed.toLocaleString())
					.replace('%FUEL%', $info.fuelPerHour.toLocaleString())}
			</span>
			{#if $info.owner}
				<span class="text-sm">{$t('created_by').replace('%OWNER%', $info.owner)}</span>
			{/if}
		</div>
		<div class="mt-5 flex flex-col gap-1 print:hidden">
			<div class="flex flex-col gap-1">
				<button class="btn btn-primary me-auto" onclick={() => print()}>{$t('print')}</button>
				<span class="text-sm font-light italic">{$t('print_tip')}</span>
			</div>
			<DownloadJson className="btn btn-neutral btn-outline me-auto mt-2" data={$info}>
				{$t('save_as_json')}
			</DownloadJson>
		</div>
	</div>
</div>

<svelte:head>
	<title>
		{$info.title || $t('untitled')}
	</title>
</svelte:head>
