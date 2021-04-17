import { setAnimation } from '../utils';

const TIMEOUT = 100;

export default class Form {
	constructor(container) {
		if (!container) {
			return;
		}

		this._container = container;
		this._pickers = {};

		for (const trigger of container.querySelectorAll(`.form__trigger`)) {
			const isDatepicker = trigger.classList.contains(`form__trigger--datepick`);
			const input = trigger.closest(`.form__group`).querySelector(`input`);
			trigger.removeAttribute(`hidden`);

			trigger.addEventListener(`click`, () => {
				if (trigger.classList.contains(`form__trigger--decrease`)) {
					input.stepDown();
				} else if (trigger.classList.contains(`form__trigger--increase`)) {
					input.stepUp();
				} else if (isDatepicker) {
					if (!this._pickers[input.id]) {
						this._pickers[input.id] = flatpickr(input);
					}
					setTimeout(() => input.focus(), TIMEOUT);
				}
			});
		}

		setAnimation(this._container, `form--animated`);
	}
}
