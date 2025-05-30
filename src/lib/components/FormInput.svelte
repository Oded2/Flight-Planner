<script lang="ts">
	import { t } from '$lib/stores/localization';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	let {
		label,
		placeholder,
		required,
		inputType,
		value = $bindable(),
		step,
		min,
		max,
		tooltip
	}: {
		label: string;
		placeholder?: string;
		required?: boolean;
		inputType?: HTMLInputTypeAttribute;
		value?: string | number | null;
		step?: number;
		min?: number;
		max?: number;
		tooltip?: string;
	} = $props();
</script>

<label class="input input-ghost w-full" dir="auto">
	{label}
	<input type={inputType} {step} class="grow" bind:value {placeholder} {required} {min} {max} />
	{#if tooltip}
		<div class="tooltip cursor-default" data-tip={tooltip}>
			<i class="fa-solid fa-circle-info text-base-content/50"></i>
		</div>
	{/if}
	{#if !required}
		<span class="badge badge-neutral badge-xs">{$t('optional')}</span>
	{/if}
</label>
