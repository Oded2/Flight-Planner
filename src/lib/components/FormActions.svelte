<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="card-actions mt-2 justify-end">
	{@render children()}
</div>
