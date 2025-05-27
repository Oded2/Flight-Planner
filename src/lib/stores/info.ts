import { type Entry, type Info } from '$lib';
import { get, writable, type Writable } from 'svelte/store';

export const defaultInfo: Info = {
	title: '',
	owner: '',
	entries: [],
	fuelPerHour: 8,
	speed: 90
};

export const info: Writable<Info> = writable(defaultInfo);
export const editIndex: Writable<number> = writable(-1);

export function setInfo(newInfo: Info) {
	info.set(newInfo);
	setStorage();
}

export function updateInitialInfo(
	title: string,
	owner: string,
	fuelPerHour: number,
	speed: number
) {
	info.update((i) => ({
		...i,
		title,
		owner,
		fuelPerHour,
		speed
	}));
	setStorage();
}

export function editEntry(entry: Entry) {
	info.update((i) => ({
		...i,
		entries: i.entries.map((e, idx) => (idx === get(editIndex) ? entry : e))
	}));
	setStorage();
}

export function addEntry(entry: Entry): void {
	info.update((i) => ({
		...i,
		entries: [...i.entries, entry]
	}));
	setStorage();
}

export function removeEntry(index: number) {
	const currentEditIndex = get(editIndex);
	// If the entry being removed is currently being edited, cancel editing
	if (index === currentEditIndex) {
		resetEditIndex();
	}
	// If an entry before the one being edited is removed, decrement the edit index
	// to keep it pointing to the correct entry (which has now shifted up)
	else if (currentEditIndex > index) {
		editIndex.update((i) => i - 1);
	}
	// Remove the entry at the specified index
	info.update((i) => ({
		...i,
		entries: i.entries.filter((_, arrIndex) => arrIndex !== index)
	}));
	setStorage();
}

export function reset(): void {
	localStorage.removeItem('info');
	info.set(structuredClone(defaultInfo));
}

export function resetEditIndex() {
	editIndex.set(-1);
}

function setStorage(): void {
	localStorage.setItem('info', JSON.stringify(get(info)));
}
