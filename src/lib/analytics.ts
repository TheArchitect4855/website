import * as requests from '../lib/requests';

export async function conversion(path: string, amount: number): Promise<void> {
	track('conversion', path, { amount });
}

export async function interaction(path: string, elementId: string): Promise<void> {
	track('interaction', path, { element_id: elementId });
}

export async function leavePage(path: string): Promise<void> {
	track('leave_page', path, {});
}

export async function viewPage(path: string, referrer: string): Promise<void> {
	track('view_page', path, { referrer });
}

async function track(action: string, path: string, data: object): Promise<void> {
	const uid = await getUid();
	await requests.post('/analytics/action', {
		kind: action,
		uid,
		path,
		data,
	});
}

async function getUid(): Promise<string> {
	let uid: string | null = localStorage.getItem('ana-uid');
	if(uid == null) {
		uid = await requests.get('/analytics/uid', {}) as string;
		localStorage.setItem('ana-uid', uid);
	}

	return uid;
}
