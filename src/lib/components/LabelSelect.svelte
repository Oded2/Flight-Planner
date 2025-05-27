<script lang="ts">
	import type { SelectOption } from '$lib';
	import type { Snippet } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	const {
		options,
		selectedOption = options[0].code,
		onchange,
		themes,
		children
	}: {
		options: SelectOption[];
		selectedOption?: string;
		onchange?: ChangeEventHandler<HTMLSelectElement>;
		themes?: boolean;
		children: Snippet;
	} = $props();

	const uniqueId = `select${options[0].code}`;
</script>

<div class="flex items-center gap-2">
	<label class="flex-shrink-0" for={uniqueId}>{@render children()}</label>
	<select id={uniqueId} {onchange} class="select select-ghost" data-choose-theme={themes}>
		{#each options as option}
			<option
				selected={option.code == selectedOption}
				value={option.code}
				disabled={option.disabled}>{option.label}</option
			>
		{/each}
	</select>
</div>
