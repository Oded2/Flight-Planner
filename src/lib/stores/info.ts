import type { Info } from '$lib';
import { writable, type Writable } from 'svelte/store';

export const info: Writable<Info> = writable({
	name: 'Flight Plan',
	author: undefined,
	startingPoint: '',
	endingPoint: '',
	entries: [],
	fuelPerHour: 8,
	speed: 90
});
