export type Entry = {
	from: string;
	to: string;
	heading?: number;
	altitude?: number;
	distance: number;
	identifierPoints: string;
	story: string;
};

export type Info = {
	title: string;
	owner: string;
	entries: Entry[];
	fuelPerHour: number;
	speed: number;
};

function entryTypeGuard(obj: any): obj is Entry {
	return (
		obj &&
		typeof obj === 'object' &&
		typeof obj.from === 'string' &&
		typeof obj.to === 'string' &&
		(obj.heading === undefined || typeof obj.heading === 'number') &&
		(obj.altitude === undefined || typeof obj.altitude === 'number') &&
		typeof obj.distance === 'number' &&
		typeof obj.identifierPoints === 'string' &&
		typeof obj.story === 'string'
	);
}

export function infoTypeGuard(obj: any): obj is Info {
	return (
		obj &&
		typeof obj === 'object' &&
		typeof obj.title === 'string' &&
		typeof obj.owner === 'string' &&
		Array.isArray(obj.entries) &&
		obj.entries.every(entryTypeGuard) &&
		typeof obj.fuelPerHour === 'number' &&
		typeof obj.speed === 'number'
	);
}
