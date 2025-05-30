<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		tooltip,
		isError,
		handleClick,
		children
	}: { tooltip: string; isError?: boolean; handleClick: () => void; children: Snippet } = $props();
</script>

<div class="tooltip ltr:tooltip-left rtl:tooltip-right" data-tip={tooltip}>
	<button
		type="button"
		class="btn btn-xs btn-square shadow-none"
		class:btn-neutral={!isError}
		class:btn-error={isError}
		aria-label={tooltip}
		onclick={handleClick}
	>
		{@render children()}
	</button>
</div>
