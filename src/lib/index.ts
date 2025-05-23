export type SelectOption = {
	code: string;
	label: string;
};

export type Entry = {
	from: string;
	to: string;
	heading: number;
	altitude: number;
	distance: number;
	time: number;
	fuel: number;
	identifierPoints: string;
	story: string;
};

export type Info = {
	name: string;
	author?: string;
	startingPoint: string;
	endingPoint: string;
	entries: Entry[];
	fuelPerHour: number;
	speed: number;
	totalDistance: number;
	totalTime: number;
	totalFuel: number;
};
