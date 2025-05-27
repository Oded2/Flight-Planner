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
		max
	}: {
		label: string;
		placeholder?: string;
		required?: boolean;
		inputType?: HTMLInputTypeAttribute;
		value?: string | number;
		step?: number;
		min?: number;
		max?: number;
	} = $props();
</script>

<label class="input input-ghost w-full" dir="auto">
	{label}
	<input type={inputType} {step} class="grow" bind:value {placeholder} {required} {min} {max} />
	{#if !required}
		<span class="badge badge-neutral badge-xs">{$t('optional')}</span>
	{/if}
</label>
