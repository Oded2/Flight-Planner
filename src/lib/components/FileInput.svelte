<script lang="ts">
	import { t } from '$lib/stores/localization';
	import type { ChangeEventHandler } from 'svelte/elements';

	let {
		label,
		onChange
	}: {
		label: string;
		onChange: (result: string) => void;
	} = $props();

	let file: File | undefined = $state();

	const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
		const currentFile = e.currentTarget.files?.[0];
		file = currentFile;
		if (!currentFile) return;
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			onChange(result);
		};
		reader.readAsText(currentFile);
	};
</script>

<div class="border-base-content/20 flex items-center gap-2 overflow-auto border-e pe-2">
	<label class="btn btn-primary btn-outline cursor-pointer">
		{label}
		<input type="file" accept=".json" class="hidden" onchange={handleFileUpload} />
	</label>
	<span class="text-sm whitespace-nowrap">
		{file ? file.name : $t('no_file')}
	</span>
</div>
