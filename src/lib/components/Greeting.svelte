<script lang="ts">
	import { next, stage } from '$lib/stores/stages';
	import { t } from 'svelte-i18n';
</script>

<div
	dir="auto"
	class:hidden={$stage != 0}
	class="card card-lg bg-primary text-primary-content mx-auto my-auto max-w-110 pb-2"
>
	<div class="card-body">
		<h2 class="card-title">{$t('welcome')}</h2>
		<p>{$t('description')}</p>
		<div class="card-actions justify-end">
			<button onclick={next} class="btn">{$t('get_started')}</button>
		</div>
	</div>
</div>
