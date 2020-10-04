import Page from '../components/page';
import Range from '../components/range';
import Search from '../components/search';

new Search(document.querySelector(`.search`));
new Range(document.querySelector(`.range`));
new Page(document.body);
