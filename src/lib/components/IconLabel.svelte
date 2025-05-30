<script lang="ts">
	const { iconClass, label }: { iconClass: string; label: string } = $props();
</script>

<i class={iconClass}></i> <span>{label}</span>
