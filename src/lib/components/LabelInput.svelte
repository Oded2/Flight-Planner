<script lang="ts">
	import type { Info } from '$lib';
	import { info } from '$lib/stores/info';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import FormInput from './FormInput.svelte';

	const {
		label,
		placeholder,
		required,
		inputType,
		param,
		min,
		max,
		value
	}: {
		label: string;
		placeholder?: string;
		required?: boolean;
		inputType?: HTMLInputTypeAttribute;
		param: keyof Info;
		min?: number;
		max?: number;
		value?: string | number;
	} = $props();

	function update(value: string) {
		info.update((i) => ({ ...i, [param]: inputType === 'number' ? +value : value.trim() }));
	}
</script>

<FormInput
	{label}
	{placeholder}
	{required}
	{min}
	{max}
	{value}
	onchange={(e) => update(e.currentTarget.value)}
></FormInput>
