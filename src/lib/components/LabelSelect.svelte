<script lang="ts">
	import type { SelectOption } from '$lib';
	import type { ChangeEventHandler } from 'svelte/elements';

	const {
		label,
		options,
		selectedOption = options[0].code,
		onchange,
		themes
	}: {
		label: string;
		options: SelectOption[];
		selectedOption?: string;
		onchange?: ChangeEventHandler<HTMLSelectElement>;
		themes?: boolean;
	} = $props();

	const uniqueId = `select${label}`;
</script>

<div class="flex items-baseline gap-2">
	<label for={uniqueId}>{label}</label>
	<select id={uniqueId} {onchange} class="select select-ghost" data-choose-theme={themes}>
		{#each options as option}
			<option selected={option.code == selectedOption} value={option.code}>{option.label}</option>
		{/each}
	</select>
</div>
