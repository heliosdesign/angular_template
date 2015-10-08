var gulp            = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins         = gulpLoadPlugins();
var runSequence     = require('run-sequence');
var config          = require('./config.json');

var src = {
  base: 'src',
  modules: 'src/modules'
};

/**
 * Functions
 */
var swallowError = function(error) {
  console.log(error.toString());
  this.emit('end');
};


/**
 * Tasks
 */

// SASS compiling task.
gulp.task('sass', function() {
  return gulp.src([src.modules + '/**/*.sass'])
    .pipe(plugins.sass({indentedSyntax: true}))
    .on('error', swallowError)
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(plugins.rename(function(path){
      path.dirname = path.basename + '/css'
    }))
    .pipe(gulp.dest(src.modules));
});


// JS linting task.
gulp.task('jshint', function () {
  return gulp.src([src.modules + '/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

// Inject CSS and JS into index.html (for development);
gulp.task('inject:dev', function() {
  var csslibs = gulp.src(config.css.lib, {read: false});
  var csssources = gulp.src([src.modules + '/**/*.css'], {read: false});
  var jslibs = gulp.src(config.js.lib, {read: false});
  var jssources = gulp.src([src.modules + '/core/app.js', src.modules + '/**/*.js'], {read: false});

  return gulp.src(src.base + '/index.html')
    .pipe(plugins.inject(csslibs, {addRootSlash: false, relative: true, name: 'cssvendors'}))
    .pipe(plugins.inject(csssources, {addRootSlash: false, relative: true}))
    .pipe(plugins.inject(jslibs, {addRootSlash: false, relative: true, name: 'jsvendors'}))
    .pipe(plugins.inject(jssources, {addRootSlash: false, relative: true}))
    .pipe(gulp.dest(src.base));
});

gulp.task('watch', function() {
  plugins.livereload.listen();

  // watch just the CSS so livereload doesn’t reload the entire page
  gulp.watch([src.modules + '/**/*.sass'], ['sass']);
  gulp.watch([src.modules + '/**/*.css'], plugins.livereload.changed);

  gulp.watch([src.modules + '/**/*.html'], plugins.livereload.changed);

  gulp.watch(src.modules + '/**/*.js', ['jshint']).on('change', plugins.livereload.changed);
});

gulp.task('default', function(done) {
  runSequence('sass', 'jshint', ['inject:dev'], 'watch', done);
});