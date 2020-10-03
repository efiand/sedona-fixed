export default class Page {
	constructor(container) {
		this._footer = container.querySelector(`.page__footer`);
		document.documentElement.style.setProperty(`--height-footer`, `${this._footer.clientHeight}px`);

		if (container.classList.contains(`page--index`)) {
			container.classList.add(`page--index-ready`);
		}
	}
}
