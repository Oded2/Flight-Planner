<script>
	import Table from './Table.svelte';
	import { back } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';
</script>

<Table></Table>

<div class="mt-5 flex flex-col gap-3" dir="auto">
	<button onclick={back} class="btn btn-neutral w-full max-w-xs print:hidden">{$t('back')}</button>
	<button
		onclick={() => {
			print();
		}}
		class="btn btn-info w-full max-w-xs print:hidden">{$t('print')}</button
	>
</div>
