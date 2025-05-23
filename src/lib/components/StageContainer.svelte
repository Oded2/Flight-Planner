<script lang="ts">
	import { stage } from '$lib/stores/stages';
	import type { Snippet } from 'svelte';

	const { stageNumber, children }: { stageNumber: number; children: Snippet } = $props();
</script>

<div class="container mx-auto my-10 flex flex-1 flex-col" class:hidden={$stage != stageNumber}>
	{@render children()}
</div>
