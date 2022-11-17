import getCookie from './cookies';

const api = getApi();

let session: Promise<Response> = fetch(`${api}/session`, {
	credentials: 'include',
	mode: 'cors',
	method: 'GET',
});

export function post(path: string, args: any): Promise<any> {
	return doRequest('POST', path, args);
}

export function get(path: string, args: object): Promise<any> {
	return doRequest('GET', createUrlArgs(path, args), null);
}

export function patch(path: string, args: any): Promise<any> {
	return doRequest('PATCH', path, args);
}

export function put(path: string, args: any): Promise<any> {
	return doRequest('PUT', path, args);
}

export function del(path: string, args: any): Promise<any> {
	return doRequest('DELETE', createUrlArgs(path, args), null);
}

async function doRequest(method: string, path: string, body: any): Promise<any> {
	try {
		await session; // Make sure we have a session before doing any requests
		const jsonBody = body === null ? null : JSON.stringify(body);
		const res = await fetch(api + path, {
			body: jsonBody,
			credentials: 'include',
			mode: 'cors',
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

function getApi(): string {
	return getCookie('api') ?? 'http://localhost:8000';
}
