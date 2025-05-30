<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		label,
		active,
		handleSubmit,
		children
	}: { label: string; active?: boolean; handleSubmit: () => void; children: Snippet } = $props();
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		handleSubmit();
	}}
	class="card bg-base-200/80 outline-accent/50 shadow-lg transition-none"
	class:outline={active}
>
	<div class="card-body">
		<h2 class="card-title">{label}</h2>
		{@render children()}
	</div>
</form>
