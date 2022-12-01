import getCookie from './cookies';

const json = 'application/json';
const api = getApi();

let session: Promise<Response> = fetch(`${api}/session`, {
	credentials: 'include',
	mode: 'cors',
	method: 'GET',
});

export function post(path: string, args: any): Promise<any> {
	return doRequest('POST', path, JSON.stringify(args), json);
}

export function get(path: string, args: object): Promise<any> {
	return doRequest('GET', createUrlArgs(path, args), null, json);
}

export function patch(path: string, args: any): Promise<any> {
	return doRequest('PATCH', path, JSON.stringify(args), json);
}

export function put(path: string, args: any): Promise<any> {
	return doRequest('PUT', path, JSON.stringify(args), json);
}

export function del(path: string, args: any): Promise<any> {
	return doRequest('DELETE', createUrlArgs(path, args), null, json);
}

export function upload(path: string, file: File): Promise<any> {
	return doRequest('POST', path, file, file.type);
}

async function doRequest(method: string, path: string, body: any, contentType: string): Promise<any> {
	try {
		await session; // Make sure we have a session before doing any requests
		const adminSession = localStorage.getItem('admin-session-id');
		const headers = {
			'Content-Type': contentType,
		};

		if(adminSession) {
			headers['Authorization'] = `Bearer ${adminSession}`;
		}

		const res = await fetch(api + path, {
			credentials: 'include',
			mode: 'cors',
			body,
			headers,
			method,
		});

		const content = await res.text();
		if(content) {
			return JSON.parse(content);
		} else {
			return null;
		}
	} catch(e) {
		console.error(e);
		return null;
	}
}

function createUrlArgs(path: string, args: object): string {
	const params = new URLSearchParams();
	for(const k in args) {
		params.set(k, args[k]);
	}

	return `${path}?${params}`;
}

export function getApi(): string {
	return getCookie('api') ?? 'https://api.kurtisknodel.com';
}
