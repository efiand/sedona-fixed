export default class Page {
	constructor(container) {
		if (!container.classList.contains(`page`)) {
			return;
		}

		container.classList.remove(`page--no-js`);
		container.classList.add(`page--js`);
	}
}
