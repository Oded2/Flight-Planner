export type SelectOption = {
	code: string;
	label: string;
	disabled?: boolean;
};

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
	totalDistance: number;
	totalTime: number;
	totalFuel: number;
};
