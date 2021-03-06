var gulp = require('gulp');

var plumber = require('gulp-plumber');
var sass = require('gulp-ruby-sass');
var es = require('event-stream');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var swig = require('gulp-swig');
var marked = require('swig-marked');
var uglify = require('gulp-uglify');

var swigoptions  = {
  setup: function(swig) {
    marked.useTag(swig, 'markdown');
  },
  defaults: { cache: false }
};

var sassConfig = {
    loadPath: [
        'node_modules/node-bourbon/assets/stylesheets',
        'node_modules/node-neat/assets/stylesheets',
        'user_modules/bitters',
        'app/styles/'
    ],
    quiet: true /* Needed till Bourbon and Neat are updated for Sass 3.3 */
};

var paths = {
    sass: 'app/**/*.scss',
    images: 'app/images/**/*',
    javascript: 'app/javascript/**/*.js',
    bowerfiles: 'bower_modules/jquery/dist/jquery.min.js',
    fonts: 'app/fonts/**/*',
    files: 'app/files/**/*',
    html: 'app/**/*.html',
    content: ['app/**/*.html','!./app/layouts/*']
};

gulp.task('styles', function() {

	var cssNormalize = gulp.src('./bower_modules/normalize.css/normalize.css');
	var cssStackicons = gulp.src('./user_modules/Stackicons/stackicons-social-minimal.min.css');

	var cssSite = gulp.src(paths.sass)
    	.pipe(plumber())
    	.pipe(sass(sassConfig));

	return es.concat(cssNormalize, cssStackicons, cssSite)
        .pipe(plumber())
        .pipe(concat('full.min.css'))
        .pipe(gulp.dest('./public/styles'));

});

gulp.task('static', function() {
	gulp.src(paths.images)
		.pipe(gulp.dest('./public/images'));

    gulp.src(paths.fonts)
        .pipe(gulp.dest('./public/fonts'));

    gulp.src(paths.files)
        .pipe(gulp.dest('./public/files'));
});

gulp.task('bowerfiles', function() {
  return gulp.src(paths.bowerfiles)
    .pipe(gulp.dest('./public/javascript'));
});

gulp.task('javascript', function() {

  return gulp.src(paths.javascript).pipe(uglify())
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
  gulp.watch(paths.javascript, ['javascript']);
});

gulp.task('connect', connect.server({
  root: ['public'],
  livereload: false
}));

gulp.task('default', ['init','watch','connect']);
gulp.task('init', ['bowerfiles','javascript','static','styles','templates']);
