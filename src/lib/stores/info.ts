import type { Entry, Info } from '$lib';
import { get, writable, type Writable } from 'svelte/store';

const defaultInfo: Info = {
	title: '',
	owner: '',
	entries: [],
	fuelPerHour: 8,
	speed: 90
};

export const info: Writable<Info> = writable(structuredClone(defaultInfo));
export const editIndex: Writable<number> = writable(-1);

export function updateInfo<K extends keyof Info>(key: K, value: Info[K]) {
	info.update((i) => ({ ...i, [key]: value }));
}

export function editEntry(entry: Entry) {
	info.update((i) => ({
		...i,
		entries: i.entries.map((e, idx) => (idx === get(editIndex) ? entry : e))
	}));
}

export function addEntry(entry: Entry): void {
	info.update((i) => ({
		...i,
		entries: [...i.entries, entry]
	}));
}

export function reset(): void {
	localStorage.removeItem('info');
	info.set(structuredClone(defaultInfo));
}

export function resetEditIndex() {
	editIndex.set(-1);
}
