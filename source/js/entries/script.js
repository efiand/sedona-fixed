import Form from '../components/form';
import Page from '../components/page';
import Range from '../components/range';
import Search from '../components/search';

const scriptLoad = new Promise((resolve, reject) => {
	const script = document.createElement(`script`);
	document.body.appendChild(script);
	script.onload = resolve;
	script.onerror = reject;
	script.async = true;
	script.src = `https://cdn.jsdelivr.net/npm/flatpickr`;
});

scriptLoad.then(() => {
	const flatpickrCSS = document.createElement(`link`);
	document.head.appendChild(flatpickrCSS);
	flatpickrCSS.rel = `stylesheet`;
	flatpickrCSS.href = `https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css`;

	new Form(document.querySelector(`.form`));
});

new Search(document.querySelector(`.search`));
new Range(document.querySelector(`.range`));
new Page(document.body);
