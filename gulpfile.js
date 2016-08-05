var gulp = require('gulp');
var browserSync = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();


gulp.task('default', ['browser-sync'], function () {
  console.log('iWater start!');
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
		proxy: "http://localhost:3000",
    files: ["public/**/*.*", "views/**/*.jade"],
    browser: "google chrome",
    port: 7000,
	});
});

gulp.task('nodemon', function (cb) {
  var started = false;
  return plugins.nodemon({
		script: 'bin/www',
    ignore: ['node_modules']
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});
