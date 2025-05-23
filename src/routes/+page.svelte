<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Greeting from '$lib/components/Greeting.svelte';
	import Questions from '$lib/components/Questions.svelte';

	let stage = $state(0);

	function next(): void {
		stage++;
	}
	function back(): void {
		stage--;
	}
</script>

<Container>
	{#if stage == 0}
		<Greeting onGetStarted={next}></Greeting>
	{:else if stage == 1}
		<Questions></Questions>
	{/if}
</Container>

<svelte:head><title>Flight Planner</title></svelte:head>
