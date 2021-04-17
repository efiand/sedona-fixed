export const setAnimation = (block, animatedClasses = `animated`) => {
	const scrollHandler = () => {
		if (block.getBoundingClientRect().top < window.innerHeight) {
			// Можно вешать несколько классов через пробел (не в IE)
			block.classList.add(animatedClasses);

			window.removeEventListener(`scroll`, scrollHandler);
		}
	};

	window.addEventListener(`scroll`, scrollHandler);

	// Однократный вызов: а вдруг блок уже во вьюпорте на момент загрузки
	scrollHandler();
};
