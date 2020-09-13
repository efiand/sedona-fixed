// Применение функции ко всем элементам DOM-коллекции
export const applyAll = (payload, cb) => {
	// Можно передать или готовую DOM-коллекцию, или селектор
	const nodeList = typeof payload === `string` ? document.querySelectorAll(payload) : payload;

	for (let i = 0; i < nodeList.length; i++) {
		cb(nodeList[i], i, nodeList);
	}
};

// Создание экземпляров класса на основе DOM-коллекции
export const applyClass = (Class, payload, addition = null) => {
	applyAll(payload, (item) => new Class(item, addition));
};
