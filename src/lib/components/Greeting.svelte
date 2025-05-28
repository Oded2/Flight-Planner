<script lang="ts">
	import { next } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';
	import FileInput from './FileInput.svelte';
	import { infoTypeGuard } from '$lib';
	import { defaultInfo, info, reset, setInfo } from '$lib/stores/info';

	const infoExist: boolean = $derived(JSON.stringify($info) !== JSON.stringify(defaultInfo));

	let reloadKey = $state(0);

	function handleUpload(result: string) {
		try {
			const json = JSON.parse(result);
			if (infoTypeGuard(json)) {
				setInfo(json);
			} else alert($t('invalid_json'));
		} catch {
			alert($t('invalid_json'));
		}
	}
</script>

<div class="hero flex-1">
	<div class="hero-content flex-col lg:flex-row" dir="auto">
		<div class="rounded-lg bg-gray-800 shadow-2xl transition-transform hover:-translate-y-1">
			<img src="/images/logo.png" alt="Hero" class="max-w-sm" />
		</div>
		<div>
			<h1 class="text-5xl font-bold">{$t('welcome')}</h1>
			<p class="py-6">
				{$t('description')}
			</p>
			<div class="flex flex-wrap gap-4">
				<button onclick={next} class="btn btn-primary">
					{infoExist ? $t('modify_plan') : $t('get_started')}
				</button>
				{#key reloadKey}
					<FileInput label={$t('upload_json')} onChange={handleUpload}></FileInput>
				{/key}
				{#if infoExist}
					<a href="/view" class="btn btn-neutral">{$t('view_current')}</a>
					<button
						onclick={() => {
							reloadKey++;
							reset();
						}}
						class="btn btn-error btn-outline">{$t('reset_plan')}</button
					>
				{/if}
			</div>
		</div>
	</div>
</div>
