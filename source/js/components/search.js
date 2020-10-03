export default class Search {
	constructor(container) {
		if (!container) {
			return;
		}

		// Показ неактуальных без загрузки скрипта элементов форм
		for (const hiddenElement of container.querySelectorAll(`[hidden]`)) {
			hiddenElement.removeAttribute(`hidden`);
		}
	}
}
