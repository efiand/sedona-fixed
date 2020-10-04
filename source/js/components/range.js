const MAX_LENGTH = 4;

const getStyle = (node, property, pseudo = null) => {
	return parseInt(getComputedStyle(node, pseudo)[property], 10);
};

export default class Range {
	constructor(container) {
		if (!container || !container.classList.contains(`range`)) {
			return;
		}

		this._controls = container.querySelector(`.range__controls`);
		this._progress = this._controls.querySelector(`.range__progress`);
		this._buttonMin = this._controls.querySelector(`.range__button--min`);
		this._buttonMax = this._controls.querySelector(`.range__button--max`);
		this._inputMin = container.querySelector(`.range__input--min`);
		this._inputMax = container.querySelector(`.range__input--max`);
		this._maxValue = this._inputMax.max;
		this._inputWidth = this._inputMin.clientWidth;
		this._step = Number(this._inputMin.step);

		this._controls.removeAttribute(`hidden`);
		this._refresh();

		this._changeHandler = this._changeHandler.bind(this);
		this._controlKeyHandler = this._controlKeyHandler.bind(this);
		this._moveHandler = this._moveHandler.bind(this);
		this._inputMin.addEventListener(`change`, this._changeHandler);
		this._inputMax.addEventListener(`change`, this._changeHandler);
		this._buttonMin.addEventListener(`keydown`, this._controlKeyHandler);
		this._buttonMin.addEventListener(`mousedown`, this._moveHandler);
		this._buttonMin.addEventListener(`touchstart`, this._moveHandler);
		this._buttonMax.addEventListener(`keydown`, this._controlKeyHandler);
		this._buttonMax.addEventListener(`mousedown`, this._moveHandler);
		this._buttonMax.addEventListener(`touchstart`, this._moveHandler);
	}

	_controlKeyHandler(evt) {
		const field = evt.target === this._buttonMin ? this._inputMin : this._inputMax;

		switch (evt.key) {
		case `Down`:
		case `Left`:
		case `ArrowDown`:
		case `ArrowLeft`:
			evt.preventDefault();

			if (field.value > Number(field.min)) {
				field.value = Number(field.value - this._step);
			}
			break;
		case `Right`:
		case `Up`:
		case `ArrowUp`:
		case `ArrowRight`:
			evt.preventDefault();

			if (field.value < Number(field.max)) {
				field.value = Number(field.value + this._step);
			}
			break;
		default:
			return;
		}

		this._refresh(evt.target);
	}

	_moveHandler(startEvent) {
		startEvent.preventDefault();
		const target = startEvent.currentTarget || startEvent.changedTouches[0];
		const targetField = target === this._buttonMin ? this._inputMin : this._inputMax;
		let startX = startEvent.clientX;

		const processHandler = (moveEvent) => {
			const xCoord = moveEvent.changedTouches ? moveEvent.changedTouches[0].clientX : moveEvent.clientX;
			const difference = startX - xCoord;
			let left = target.offsetLeft - difference;
			startX = xCoord;

			const isMax = target === this._buttonMax;
			const minLeft = isMax ? getStyle(this._buttonMin, `left`) : 0;
			const maxLeft = isMax ? Number(this._inputMax.max / this._step) : getStyle(this._buttonMax, `left`);

			if (left < minLeft) {
				left = minLeft;
			} else if (left > maxLeft) {
				left = maxLeft;
			}

			targetField.value = left * this._step;
			this._refresh(targetField);
		};

		const endHandler = (endEvent) => {
			endEvent.preventDefault();
			document.removeEventListener(`touchmove`, processHandler);
			document.removeEventListener(`touchend`, endHandler);
			document.removeEventListener(`mousemove`, processHandler);
			document.removeEventListener(`mouseup`, endHandler);
		};

		if (startEvent.changedTouches) {
			document.addEventListener(`touchmove`, processHandler, { passive: false });
			document.addEventListener(`touchend`, endHandler, { passive: false });
		} else {
			document.addEventListener(`mousemove`, processHandler);
			document.addEventListener(`mouseup`, endHandler);
		}
	}

	_changeHandler({ target }) {
		let value = Number(target.value);
		let min = Number(target.min);
		let max = Number(target.max);
		const isMin = target === this._inputMin;

		if (isMin) {
			max = Number(this._inputMax.value);
		} else {
			min = Number(this._inputMin.value);
		}

		if (value > max) {
			value = max;
		} else if (value < min) {
			value = min;
		} else {
			value = Math.floor(value / this._step) * this._step || this._step;
		}

		target.value = value;
		this._refresh(target);
	}

	_setInputWidth(input) {
		input.style.width = `${this._inputWidth * input.value.toString().length / MAX_LENGTH}px`;
	}

	_refresh(target = null) {
		const minValue = this._inputMin.value;
		const maxValue = this._inputMax.value;

		const left = minValue / this._step;
		const width = (maxValue - minValue) / this._step;

		this._progress.style.width = `${width}px`;
		this._progress.style.left = `${left}px`;

		this._buttonMin.style.left = `${left}px`;
		this._buttonMax.style.left = `${left + width}px`;

		if (target) {
			this._setLimits(target);
			this._setInputWidth(target);
		} else {
			this._setInputWidth(this._inputMin);
			this._setInputWidth(this._inputMax);
		}
		this._buttonMin.style.zIndex = Number(this._inputMin.value === this._maxValue);
	}

	_setLimits(target) {
		// Изменяем крайние значения инпутов, чтобы они не соприкасались
		if (target === this._inputMin || target === this._buttonMin) {
			this._inputMin.max = Number(this._inputMax.value);
		} else {
			this._inputMax.min = Number(this._inputMin.value);
		}
	}
}
