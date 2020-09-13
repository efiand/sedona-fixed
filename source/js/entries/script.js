// Получение ширины скроллбара для нужд CSS
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty(`--scrollbar-width`, `${scrollbarWidth}px`);

// Показ неактуальных без загрузки скрипта элементов форм
for (const hiddenElement of document.querySelectorAll(`.search [hidden]`)) {
	hiddenElement.removeAttribute(`hidden`);
}
