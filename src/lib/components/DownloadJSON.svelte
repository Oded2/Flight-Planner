<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		data,
		title,
		className,
		children
	}: { data: { [key: string]: any }; title: string; className?: string; children: Snippet } =
		$props();
	const jsonHref = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
</script>

<a href={jsonHref} download={`${title}.json`} class={className}>{@render children()}</a>
