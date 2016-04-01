'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var b = watchify(browserify('./index.js', {standalone: 'Dropdown'}));
gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', console.log);

function bundle() {
  return b.bundle()
    .on('error', console.log.bind(console, 'Browserify Error'))
    .pipe(source('sb-dropdown.js'))
    // optional, remove if you don't need to buffer file contents
    //.pipe(buffer())
    .pipe(gulp.dest('./dist'));
}

gulp.task('build', function() {

	return b
		.bundle()
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['js']);
