import type { Entry, Info } from '$lib';
import { writable, type Writable } from 'svelte/store';
import { setStage } from './stages';

const defaultInfo: Info = {
	title: '',
	owner: '',
	entries: [],
	fuelPerHour: 8,
	speed: 90,
	totalDistance: 0,
	totalTime: 0,
	totalFuel: 0
};

export const info: Writable<Info> = writable(structuredClone(defaultInfo));

export function updateInfo<K extends keyof Info>(key: K, value: Info[K]) {
	info.update((i) => ({ ...i, [key]: value }));
}

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
	info.set(structuredClone(defaultInfo));
}
