var gulp = require('gulp');

var plumber 		= require('gulp-plumber');
var sass        = require('gulp-sass');
var es 				  = require('event-stream');
var concat 			= require('gulp-concat');
var connect 		= require('gulp-connect');
var swig 			  = require('gulp-swig');
var marked      = require('swig-marked');
var uglify      = require('gulp-uglify');

var swigoptions  = {
  setup: function(swig) {
    marked.useTag(swig, 'markdown');
  },
  defaults: { cache: false }
};

var sassConfig = {
    includePaths: [
        './node_modules/node-bourbon/assets/stylesheets',
        './node_modules/node-neat/assets/stylesheets',
        './user_modules/bitters'
    ]
};

var paths = {
  sass:       'app/**/*.scss',
  images:     'app/images/**/*',
  javascript: 'app/javascript/**/*',
  bowerfiles: 'bower_modules/jquery/dist/jquery.min.js',
  fonts:      'app/fonts/**/*',
  html:       'app/html/**/*.html',
  content:    ['app/html/**/*.html','!./app/html/_*','!./app/html/_partials/*']
};

gulp.task('styles', function() {

	var cssNormalize = gulp.src('./bower_modules/normalize.css/normalize.css');
	var cssStackicons = gulp.src('./user_modules/Stackicons/stackicons-social-minimal.min.css');

	var cssSite = gulp.src(paths.sass)
    	.pipe(plumber())
    	.pipe(sass(sassConfig));

	return es.concat(cssNormalize, cssStackicons, cssSite)
        .pipe(concat('full.min.css'))
        .pipe(gulp.dest('./public/styles'));

});

gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(gulp.dest('./public/images'));
});

gulp.task('fonts', function() {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest('./public/fonts'));
});

gulp.task('javascript', function() {

  var getBowerFiles = gulp.src(paths.bowerfiles);
  var getUserJs = gulp.src(paths.javascript).pipe(uglify());

  return es.concat(getBowerFiles, getUserJs)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./public/javascript'));
});

gulp.task('templates', function() {
  gulp.src(paths.content)
    .pipe(swig(swigoptions))
    .pipe(gulp.dest('./public/'))
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['styles']);
  gulp.watch(paths.html, ['templates']);
	gulp.watch('./app/html/**/*.swig', ['templates']);
});

gulp.task('connect', connect.server({
  root: ['public']
}));

gulp.task('default', ['init','watch','connect']);
gulp.task('init', ['javascript','images','fonts','styles','templates']);