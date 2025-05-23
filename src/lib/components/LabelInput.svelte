<script lang="ts">
	import type { Info } from '$lib';
	import { info } from '$lib/stores/info';
	import { t } from 'svelte-i18n';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	const {
		label,
		placeholder,
		required,
		inputType,
		param,
		min,
		max
	}: {
		label: string;
		placeholder?: string;
		required?: boolean;
		inputType?: HTMLInputTypeAttribute;
		param: keyof Info;
		min?: number;
		max?: number;
	} = $props();

	function update(value: string) {
		info.update((i) => ({ ...i, [param]: inputType === 'number' ? +value : value }));
	}
</script>

<label class="input input-ghost w-full" dir="auto">
	{label}
	<input
		type={inputType}
		class="grow"
		{placeholder}
		{required}
		{min}
		{max}
		onchange={(e) => update(e.currentTarget.value)}
	/>
	{#if !required}
		<span class="badge badge-neutral badge-xs">{$t('optional')}</span>
	{/if}
</label>
