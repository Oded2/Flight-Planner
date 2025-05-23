<script>
	import { t } from 'svelte-i18n';
	import EntryForm from './EntryForm.svelte';
	import Table from './Table.svelte';
</script>

<div class="flex grid-cols-6 flex-col gap-4 xl:grid" dir="auto">
	<!-- Placeholder text in order for dir="auto" to work properly -->
	<h1 class="hidden">{$t('welcome')}</h1>
	<div class="col-span-2 w-full overflow-auto">
		<EntryForm></EntryForm>
	</div>
	<div class="col-span-4 mx-auto flex w-full flex-col gap-4 overflow-scroll">
		<Table></Table>
	</div>
</div>
