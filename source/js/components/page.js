export default class Page {
	constructor(container) {
		this._footer = container.querySelector(`.page__footer`);
		document.documentElement.style.setProperty(`--footer-height-amendment`, `${this._footer.clientHeight}px`);

		if (container.classList.contains(`page--index`)) {
			container.classList.add(`page--index-ready`);
		}
	}
}
