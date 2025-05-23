<script>
	import { info } from '$lib/stores/info';
	import Entry from './Entry.svelte';
	import EntryForm from './EntryForm.svelte';
</script>

<div class="flex gap-4">
	<EntryForm></EntryForm>
	<div class="mx-auto flex flex-col gap-4">
		{#each $info.entries as entry}
			<Entry {entry}></Entry>
		{/each}
	</div>
</div>
