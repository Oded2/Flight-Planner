<script lang="ts">
	import { next } from '$lib/stores/stages';
	import { t } from '$lib/stores/localization';
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
			<button onclick={next} class="btn btn-primary">{$t('get_started')}</button>
		</div>
	</div>
</div>
