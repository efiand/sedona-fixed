import Page from '../cpmponents/page';
import { applyClass } from '../utils';

const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty(`--scrollbar-width`, `${scrollbarWidth}px`);

applyClass(Page, document.querySelectorAll(`.page`));
