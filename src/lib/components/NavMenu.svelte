<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	const { label, iconClass, children }: { label: string; iconClass: string; children: Snippet } =
		$props();

	let detailsElement: HTMLDetailsElement;

	function handleClickOutside(event: MouseEvent) {
		if (event.target instanceof Node && !detailsElement.contains(event.target))
			detailsElement.removeAttribute('open');
	}

	onMount(() => {
		window.addEventListener('click', handleClickOutside);
		return () => window.removeEventListener('click', handleClickOutside);
	});
</script>

<li>
	<details bind:this={detailsElement}>
		<summary><i class={iconClass}></i> <span class="hidden sm:inline">{label}</span></summary>
		<ul class="bg-base-100 text-base-content z-10 rounded-t-none p-2">
			{@render children()}
		</ul>
	</details>
</li>
