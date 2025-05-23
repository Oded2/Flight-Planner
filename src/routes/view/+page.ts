import { info } from '$lib/stores/info.js';

export function load({ url }) {
	const infoParam = url.searchParams.get('info');
	if (infoParam) info.set(JSON.parse(infoParam));
}
