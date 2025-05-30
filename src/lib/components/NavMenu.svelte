<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import IconLabel from './IconLabel.svelte';

	const { label, iconClass, children }: { label: string; iconClass: string; children: Snippet } =
		$props();

	let detailsElement: HTMLDetailsElement;

	function handleClick() {
		detailsElement.removeAttribute('open');
	}

	onMount(() => {
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	});
</script>

<li>
	<details bind:this={detailsElement}>
		<summary><IconLabel {iconClass} {label}></IconLabel></summary>
		<ul class="bg-base-100 text-base-content z-10 rounded-t-none p-2">
			{@render children()}
		</ul>
	</details>
</li>
