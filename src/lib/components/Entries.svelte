<script>
	import { t } from '$lib/stores/localization';
	import EntryForm from './EntryForm.svelte';
	import Table from './Table.svelte';
</script>

<div class="flex grid-cols-6 flex-col gap-4 xl:grid" dir="auto">
	<!-- Placeholder text in order for dir="auto" to work properly -->
	<h1 class="hidden">{$t('welcome')}</h1>
	<div class="col-span-2 w-full overflow-auto print:hidden">
		<EntryForm></EntryForm>
	</div>
	<div class="mx-auto flex w-full flex-col gap-4 xl:col-span-4 print:col-span-full">
		<Table></Table>
	</div>
</div>
