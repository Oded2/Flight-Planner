<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { t } from 'svelte-i18n';
</script>

<Container>
	<div
		dir="auto"
		class="card card-lg bg-primary text-primary-content mx-auto my-auto max-w-110 pb-2"
	>
		<div class="card-body">
			<h2 class="card-title">{$t('welcome')}</h2>
			<p>{$t('description')}</p>
			<div class="card-actions justify-end">
				<button class="btn">{$t('get_started')}</button>
			</div>
		</div>
	</div>
</Container>
