export default function getCookie(name: string): string|null {
	const cookies = document.cookie.split(';');
	const n = encodeURIComponent(name) + '=';
	for(const c of cookies) {
		if(c.startsWith(n)) {
			const value = c.split('=')[1];
			return value;
		}
	}

	return null;
}
