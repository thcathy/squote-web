var gulp = require('gulp'),
   del = require('del'),
   typescript = require('gulp-typescript'),
   sourcemaps = require('gulp-sourcemaps'),
   browserSync = require('browser-sync'),
   replace = require('gulp-replace-task'),
   env = require('gulp-environments'),
   fs = require("fs"),
   tscConfig = require('./tsconfig.json'),
   gulpConfig = require('./gulpconfig.json');

var jsDict = gulpConfig.dist + '/build';

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del(gulpConfig.dist);
});

// TypeScript compile
gulp.task('compile-ts', ['clean'], function () {
  return gulp
    .src(gulpConfig.tsSrc)
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(jsDict));
});

gulp.task('watch', function() {
  gulp.watch(gulpConfig.staticFiles.concat([gulpConfig.tsSrc, 'config/**']),['compile-ts', 'copy-static', 'replace-config']);
});

gulp.task('replace-config', ['compile-ts'], function() {
  var configFile = env.production() ? gulpConfig.configFileProd : gulpConfig.configFile;
  var config = JSON.parse(fs.readFileSync(configFile));
  console.log(config.patterns);

  gulp.src(jsDict + '/constants.js*')
    .pipe(replace(config))
    .pipe(gulp.dest(jsDict));
});

gulp.task('copy-static', ['clean'], function() {
  gulp.src(gulpConfig.staticFiles, { base : './' })
    .pipe(gulp.dest(gulpConfig.dist));

  return gulp.src(gulpConfig.libs,  {base: './node_modules/'})
    .pipe(gulp.dest(gulpConfig.dist + '/node_modules'))
});

gulp.task('serve', ['copy-static','compile-ts', 'replace-config', 'watch'], function() {
  process.stdout.write('Starting browserSync');
  browserSync({
    port: 3000,
    files: ['**/*'],
    injectChanges: true,
    logFileChanges: false,
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: gulpConfig.dist,
    }
  });
});

gulp.task('build-prod', function(callback) {
  runSequence('set-prod-env', 'build', callback);
});

gulp.task('set-prod-env', function() {
    env.current(env.production);
})

gulp.task('build', ['compile-ts', 'copy-static', 'replace-config']);
gulp.task('default', ['serve']);
