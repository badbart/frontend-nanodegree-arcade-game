var gulp = require('gulp');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var html5Lint = require('gulp-html5-lint');

gulp.task('default',['linting']);


gulp.task('linting', function() {
	console.log('Liniting Task started');
	
	gulp.src('gulpfile.js')
	.pipe(jshint())	
	.pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'));
	
	gulp.src('js/resumeBuilder.js')
	.pipe(jshint())	
	.pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'));

	console.log('JS Hint done');
	
	gulp.src('index.html')
	.pipe(html5Lint());

});
