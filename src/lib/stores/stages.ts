import { writable, type Writable } from 'svelte/store';

export const stage: Writable<number> = writable(0);

export function next() {
	stage.update((s) => s + 1);
}

export function back() {
	stage.update((s) => s - 1);
}
