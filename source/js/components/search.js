export default class Search {
	constructor(container) {
		if (!container) {
			return;
		}

		// Переключение показа формы
		this._form = container.querySelector(`.search__form`);
		this._formToggler = container.querySelector(`.search__button`);
		this._formToggler.removeAttribute(`disabled`);
		this._formToggler.addEventListener(`click`, () => {
			this._form.classList.toggle(`search__form--opened`);
		});

		// Показ неактуальных без загрузки скрипта элементов форм
		for (const hiddenElement of container.querySelectorAll(`[hidden]`)) {
			hiddenElement.removeAttribute(`hidden`);
		}
	}
}
