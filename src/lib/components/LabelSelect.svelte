<script lang="ts">
	import type { SelectOption } from '$lib';
	import type { ChangeEventHandler } from 'svelte/elements';

	const {
		title,
		options,
		onchange
	}: { title: string; options: SelectOption[]; onchange?: ChangeEventHandler<HTMLSelectElement> } =
		$props();

	const uniqueId = `select${title}`;
</script>

<div class="flex items-baseline gap-2">
	<label for={uniqueId}>{title}</label>
	<select id={uniqueId} {onchange} class="select select-ghost">
		{#each options as option}
			<option value={option.code}>{option.label}</option>
		{/each}
	</select>
</div>
