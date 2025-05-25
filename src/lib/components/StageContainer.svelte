<script lang="ts">
	import { stage } from '$lib/stores/stages';
	import type { Snippet } from 'svelte';

	const { stageNumber, children }: { stageNumber: number; children: Snippet } = $props();
</script>

{#if $stage == stageNumber}
	<div class="container mx-auto my-10 flex flex-1 flex-col print:my-0 print:max-w-full">
		{@render children()}
	</div>
{/if}
