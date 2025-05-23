<script lang="ts">
	import Entries from '$lib/components/Entries.svelte';
	import Table from '$lib/components/Table.svelte';
	import Greeting from '$lib/components/Greeting.svelte';
	import Questions from '$lib/components/Questions.svelte';
	import StageContainer from '$lib/components/StageContainer.svelte';
</script>

<StageContainer stageNumber={0}>
	<Greeting></Greeting>
</StageContainer>
<StageContainer stageNumber={1}>
	<Questions></Questions>
</StageContainer>
<StageContainer stageNumber={2}>
	<Entries></Entries>
</StageContainer>
<StageContainer stageNumber={3}>
	<Table></Table>
</StageContainer>

<svelte:head><title>Flight Planner</title></svelte:head>
