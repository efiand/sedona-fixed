const { src, dest } = require(`gulp`);
const { plumber, imagemin } = require(`gulp-load-plugins`)();
const { SVGO_CONFIG } = require(`../const`);
const SRC = `source/icons`;

const icons = () => src(`${SRC}/*.{svg,png}`)
	.pipe(plumber())
	.pipe(imagemin([imagemin.svgo(SVGO_CONFIG)]))
	.pipe(dest(SRC));

module.exports = icons;
