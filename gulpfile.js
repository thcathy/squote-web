const gulp = require('gulp');
const del = require('del');
// const typescript = require('gulp-typescript');
const replace = require('gulp-replace');
// const sourcemaps = require('gulp-sourcemaps');
// const tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('copy:build', ['clean'], function () {
  return gulp.src('build/**')
    .pipe(gulp.dest('dist/build'));
});

gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',

      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/angular2/bundles/http.dev.js',
    ],  {base: './node_modules/'})
    .pipe(gulp.dest('dist/lib/'))
});

gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['index.html', '*.css', 'nginx.conf', '!app/**/*.ts'], { base : './' })
    .pipe(gulp.dest('dist'))
});

gulp.task('replace', ['copy:assets', 'copy:build'], function () {
  gulp.src('dist/index.html')
    .pipe(replace('node_modules/', 'lib/'))
    .pipe(gulp.dest('dist'));

  gulp.src('dist/build/*.js',{base: './dist/build/'})
    .pipe(replace('localhost:8190', 'squote.funfunspell.com'))
    .pipe(gulp.dest('dist/build/'));
});

gulp.task('build', ['copy:build', 'copy:libs', 'copy:assets', 'replace']);
gulp.task('default', ['build']);
