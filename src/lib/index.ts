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
	time: number;
	fuel: number;
	identifierPoints: string;
	story: string;
};

export type Info = {
	startingPoint: string;
	endingPoint: string;
	entries: Entry[];
	fuelPerHour: number;
	speed: number;
	totalDistance: number;
	totalTime: number;
	totalFuel: number;
};

export function addParams(link: string, params: Record<string, string>): string {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		searchParams.append(key, value);
	});
	return `${link}?${searchParams.toString()}`;
}
