<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		data,
		className,
		children
	}: { data: { [key: string]: any }; className?: string; children: Snippet } = $props();
	const jsonHref = `data:application/json;charset=utf-8,${JSON.stringify(data, null, 2)}`;
</script>

<a href={jsonHref} download="plan.json" class={className}>{@render children()}</a>
