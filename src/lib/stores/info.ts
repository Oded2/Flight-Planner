import type { Entry, Info } from '$lib';
import { writable, type Writable } from 'svelte/store';
import { setStage } from './stages';

const defaultInfo: Info = {
	author: undefined,
	startingPoint: '',
	endingPoint: '',
	entries: [],
	fuelPerHour: 8,
	speed: 90,
	totalDistance: 0,
	totalTime: 0,
	totalFuel: 0
};

export const info: Writable<Info> = writable(defaultInfo);

export function addEntry(entry: Entry): void {
	info.update((i) => ({
		...i,
		entries: [...i.entries, entry],
		totalDistance: i.totalDistance + entry.distance,
		totalTime: i.totalTime + entry.time,
		totalFuel: i.totalFuel + entry.fuel
	}));
}

export function reset(): void {
	setStage(0);
	info.set(defaultInfo);
}
