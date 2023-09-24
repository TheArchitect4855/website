const epoch = 1695451740;
const secondsPerRotation = 86_164;
const secondsPerPent = secondsPerRotation * 5;
const secondsPerRevolution = 31_557_556;
const secondsPerQuarter = secondsPerRevolution / 4;

const tickInterval = 8;
const binaryClock = document.querySelector('.binary-clock');
const neodate = document.querySelector('.neodate');

let selectedMenuItem = null;
updateSelectedMenuItem();

animateText();

const sections = document.querySelectorAll('section');
for (let i = 0; i < sections.length; i += 1) {
	const hash = '#' + sections[i].id;
	if (window.location.hash == hash || (!window.location.hash && i == 0)) continue;
	sections[i].style.display = 'none';
}

let lastHash = window.location.hash || '#' + sections[0].id;
window.addEventListener('hashchange', onHashChanged);
window.addEventListener('keydown', onKeyDown);

fetch('/blog.json').then((e) => e.json()).then(initBlogList).catch(console.error);

function animateText() {
	const animatedTextElems = document.querySelectorAll('.text-reveal');
	const fullText = [];
	for (const txt of animatedTextElems) {
		fullText.push(txt.innerText);
		txt.innerHTML = '&nbsp;';
	}

	let interval;
	let index = 1;
	let max = 1;
	const animate = () => {
		let any = false;
		for (let i = 0; i < Math.min(max, animatedTextElems.length); i += 1) {
			const t = fullText[i];
			const l = index - i;
			if (l <= 0 || l > t.length) continue;
			animatedTextElems[i].innerText = t.substring(0, l);
			max += 1;
			any = true;
		}

		if (!any && max >= animatedTextElems.length) {
			for (const t of animatedTextElems) t.className = t.className.replace('text-reveal', '');
			clearInterval(interval);
			setTimeout(initUi, 500);
		}

		index += 1;
	};

	interval = setInterval(animate, 80);
}

async function initBlogList(json) {
	const content = document.querySelector('#blog>.content');
	json.map((e) => fetch(`/blog/${e.id}.html`)
		.then((req) => req.text())
		.then((post) => {
			const preview = document.createElement('div');
			preview.innerHTML = post;

			const previewText = preview.innerText;
			if (previewText.length > 200) preview.innerText = previewText.substring(0, 197) + '...';

			const article = document.createElement('article');
			article.innerHTML = `
				<h3>${e.title}</h3>
				<div>${preview.innerText}</div>
				<a href="${window.origin}/blog.html?post=${encodeURIComponent(e.id)}">Read More</a>
			`;

			content.appendChild(article);
		})
		.catch(console.error)
	);
}

async function initMotd() {
	const list = await fetch('/motd.json').then((e) => e.json());
	const index = Math.floor(Date.now() / 1000 / secondsPerRotation) % list.length;
	document.querySelector('#motd').innerText = list[index];
}

function initUi() {
	const frac = Date.now() % 1000;
	setTimeout(() => setInterval(tick, tickInterval), frac);
	initMotd();
}

function onHashChanged() {
	if (lastHash) {
		const elem = document.querySelector(lastHash);
		if (elem) elem.style.display = 'none';
	}

	lastHash = window.location.hash;
	const elem = document.querySelector(lastHash);
	if (elem) elem.style.display = 'block';
	updateSelectedMenuItem();
}

function onKeyDown(e) {
	let next;
	if (e.keyCode == 38) {
		// Up
		if (selectedMenuItem?.previousElementSibling) next = selectedMenuItem.previousElementSibling;
		else next = document.querySelector('nav li:last-child');
	} else if (e.keyCode == 40) {
		// Down
		if (selectedMenuItem?.nextElementSibling) next = selectedMenuItem.nextElementSibling;
		else next = document.querySelector('nav li:first-child');
	} else return;

	window.location.hash = next.firstElementChild.hash;
}

function tick() {
	const now = Date.now() / 1000 - epoch;

	const binaryClockText = Math.floor(now).toString(2);
	if (binaryClockText != binaryClock.innerText) binaryClock.innerText = binaryClockText;

	tickNeodate(now);
}

function tickNeodate(now) {
	if (now < 0) {
		const rotation = Math.floor(now / secondsPerRotation);
		const timeOfDay = ((now / secondsPerRotation - rotation) * 100).toFixed(2).padStart(5, '0');
		const neodateText = `${timeOfDay} ${Math.abs(rotation)}R <O`;
		if (neodateText != neodate.innerText) neodate.innerText = neodateText;
		return;
	}

	const timeOfDay = (now % secondsPerRotation / secondsPerRotation * 100).toFixed(2).padStart(5, '0');
	const revolution = Math.floor(now / secondsPerRevolution);
	const quarter = Math.floor(now / secondsPerQuarter);
	const rotationOfQuarter = Math.ceil((now - quarter * secondsPerQuarter) / secondsPerRotation);
	const quarterOfRevolution = Math.ceil((now - revolution * secondsPerRevolution) / secondsPerQuarter);

	const neodateText = `${timeOfDay} ${rotationOfQuarter}R/${quarterOfRevolution}Q/R${revolution + 1}`;
	if (neodateText != neodate.innerText) neodate.innerText = neodateText;
}

function updateSelectedMenuItem() {
	if (selectedMenuItem) selectedMenuItem.className = '';
	if (window.location.hash) selectedMenuItem = document.querySelector(`nav a[href="${window.location.hash}"]`)?.parentElement;
	if (selectedMenuItem == null) selectedMenuItem = document.querySelector('nav li:first-child');
	selectedMenuItem.className = 'selected';
}
