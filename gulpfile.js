const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const replace = require('gulp-replace-task');
const environments = require('gulp-environments');
const tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile:ts', ['clean'], function () {
  return gulp
    .src('app/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/build'));
});

gulp.task('watch', function() {
  gulp.watch(['index.html', '*.css', 'app/**/*.ts'],['compile:ts', 'copy:static', 'replace:config']);
});

gulp.task('replace:config', ['compile:ts'], function() {
  const configFile = environments.production() ? './config/config-prd.js' : './config/config.js';
  const config = require(configFile);

  gulp.src('dist/build/constants.js*')
    .pipe(replace(config))
    .pipe(gulp.dest('dist/build'));

});

gulp.task('copy:static', ['clean'], function() {
  gulp.src(['index.html', '*.css', '!app/**/*.ts'], { base : './' })
    .pipe(gulp.dest('dist'));

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
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
    ],  {base: './node_modules/'})
    .pipe(gulp.dest('dist/node_modules/'))
});

gulp.task('serve', ['copy:static','compile:ts', 'replace:config', 'watch'], function() {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3000,
    files: ['index.html', 'build/**/*.js', 'node_modules/**/*.js'],
    injectChanges: true,
    logFileChanges: false,
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './dist',
//      middleware: superstatic({ debug: false})
    }
  });
});

gulp.task('build.prd', ['build', 'compile.constants']);
gulp.task('build', ['compile:ts', 'copy:static', 'replace:config']);
gulp.task('default', ['serve']);
