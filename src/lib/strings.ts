const thousand = 1e3;
const million = 1e6;
const billion = 1e9;

export function toHumanReadable(n: number): string {
	if(n < thousand) return Math.round(n).toLocaleString();
	else if(n < million) return Math.round(n / thousand).toLocaleString() + 'k';
	else if(n < billion) return Math.round(n / million).toLocaleString() + 'm';
	else return Math.round(n / billion).toLocaleString() + 'b';
}
