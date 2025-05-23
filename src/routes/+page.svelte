<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Greeting from '$lib/components/Greeting.svelte';
	import Questions from '$lib/components/Questions.svelte';
</script>

<Container>
	<Greeting></Greeting>
	<Questions></Questions>
</Container>

<svelte:head><title>Flight Planner</title></svelte:head>
