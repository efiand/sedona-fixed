const { series, watch } = require(`gulp`);
const tasks = require(`require-dir`)(`.`);
const { twighint, stylelint, eslint, copy, html, css, js, img } = tasks;
const browserSync = require(`browser-sync`).create();
const { COPY_SOURCE, DIST } = require(`../const`);

const reload = (done) => {
	browserSync.reload();
	done();
};

const server = () => {
	browserSync.init({
		cors: true,
		notify: false,
		server: DIST,
		ui: false
	});

	watch(`source/**/*.twig`, series(twighint, html, reload));
	watch(`source/less/**/*.less`, series(stylelint, css, reload));
	watch(`source/js/**/*.js`, series(eslint, js, reload));
	watch(`gulpfile.js/**/*.js`, series(eslint));
	watch(`source/img/**/*.{svg,png,jpg}`, series(img, reload));
	watch(COPY_SOURCE, series(copy, reload));
};

module.exports = server;
