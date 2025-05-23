<script lang="ts">
	import { number, t } from 'svelte-i18n';
	import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'svelte/elements';

	let {
		label,
		placeholder,
		required,
		inputType,
		value = $bindable(),
		step,
		min,
		max,
		onchange
	}: {
		label: string;
		placeholder?: string;
		required?: boolean;
		inputType?: HTMLInputTypeAttribute;
		value?: string | number;
		step?: number;
		min?: number;
		max?: number;
		onchange?: ChangeEventHandler<HTMLInputElement>;
	} = $props();
</script>

<label class="input input-ghost w-full" dir="auto">
	{label}
	<input
		type={inputType}
		{step}
		class="grow"
		bind:value
		{placeholder}
		{required}
		{min}
		{max}
		{onchange}
	/>
	{#if !required}
		<span class="badge badge-neutral badge-xs">{$t('optional')}</span>
	{/if}
</label>
