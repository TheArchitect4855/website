const params = new URLSearchParams(window.location.search);
const postId = params.get('post');
if (!postId) window.location = '/index.html';

const content = document.querySelector('#content');
fetch(`/blog/${postId}.html`).then(async (e) => {
	if (e.status == 200) content.innerHTML = await e.text();
	else if (e.status == 404) content.innerHTML = `<h4>404 Invalid Post ID</h4>`;
	else content.innerText = `${e.status} ${e.statusText}`;
});

Promise.all([fetch('/blog.json'), fetch(`/blog/${postId}.html`)]).then(async ([meta, post]) => {
	if (post.status != 200) {
		if (post.status == 404) content.innerHTML = '<h4>404 Invalid Post ID</h4>';
		else content.innerText = `${e.status} ${e.statusText}`;
		return;
	}

	const { title } = (await meta.json()).find((e) => e.id == postId);
	document.title = `Kurtis Knodel // ${title}`;
	const text = await post.text();
	content.innerHTML = `
		<h1>${title}</h1>
		${text}
	`;
});
