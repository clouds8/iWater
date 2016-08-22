var gulp = require('gulp');
var browserSync = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();


gulp.task('default', ['browser-sync'], function () {
  console.log('iWater start!');
});

gulp.task('browser-sync', ['nodemon'], function () {
  console.log('~~~~~in the browserSync ~~~~~');
  browserSync.init(null, {
		proxy: "http://localhost:3000",
    files: ["public/javascripts/**/*.*", "public/stylesheets/**/*.*", "public/html/**/*.*", "views/**/*.jade"],
    // reloadDelay: 200,
    browser: ['google-chrome'],
    port: 7000,
    notify: true
    // server: {
    //   baseDir: "./bin/www",
    //   browser: "google chrome",
    // }
	});
  console.log('--------OUT the browserSync-------');
});

gulp.task('nodemon', function (cb) {
  var started = false;
  return plugins.nodemon({
		script: './bin/www',
    // ext: 'js',
    ignore: ['node_modules']
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	})

  .on('restart', function () {
    setTimeout(function () {
      browserSync.reload({ stream: false });
    }, 1000);
  });
});
