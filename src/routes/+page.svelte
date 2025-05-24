<script lang="ts">
	import Entries from '$lib/components/Entries.svelte';
	import Greeting from '$lib/components/Greeting.svelte';
	import Questions from '$lib/components/Questions.svelte';
	import StageContainer from '$lib/components/StageContainer.svelte';
</script>

<div class="from-base-100 to-base-200 flex flex-1 bg-linear-to-r">
	<StageContainer stageNumber={0}>
		<Greeting></Greeting>
	</StageContainer>
	<StageContainer stageNumber={1}>
		<Questions></Questions>
	</StageContainer>
	<StageContainer stageNumber={2}>
		<Entries></Entries>
	</StageContainer>
</div>
<svelte:head><title>Flight Planner</title></svelte:head>
