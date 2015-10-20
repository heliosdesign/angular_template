var gulp            = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var del             = require('del');
var plugins         = gulpLoadPlugins();
var runSequence     = require('run-sequence');
var config          = require('./config.json');

var src = {
  base: 'src',
  modules: 'src/modules'
};

var dist = {
  base: './dist',
  modules: './dist/modules',
  files: {
    css: 'application.min.css',
    js: 'application.min.js'
  }
}

/**
 * Functions and Utilities
 */
var swallowError = function(error) {
  console.log(error.toString());
  this.emit('end');
};

var fileContents = function(filePath, file) {
  return file.contents.toString();
};

var svgIcons = gulp.src([
  src.modules + '/**/icon-*.svg',
  '!' + src.modules + '/fonts/**.*'
])
.pipe(plugins.svgmin())
.pipe(plugins.svgstore({ inlineSvg: true }));

/**
 * Tasks
 */

// Cleaning
gulp.task('clean', function(){
  return del([ dist.base + '/*', '!'+dist.base+'/.git*' ]);
});

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

// CSS minifying task
gulp.task('cssmin', function () {
  var files = config.css.lib;
  files.push(src.modules + '/*/css/*.css');
  return gulp.src(files)
    .pipe(plugins.cssmin())
    .pipe(plugins.concat(dist.files.css))
    .pipe(gulp.dest(dist.base + '/css'));
});

// JS linting task.
gulp.task('jshint', function () {
  return gulp.src([src.modules + '/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

// JS minifying task
gulp.task('uglify', function () {
  var files = config.js.lib;
  files.push(src.modules + '/**/*.js');
  return gulp.src(files)
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify({mangle: false}))
    .pipe(plugins.concat(dist.files.js))
    .pipe(gulp.dest(dist.base + '/js'));
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

// Inject CSS and JS into index.html and then minify it and move it to /dist (for production).
gulp.task('inject:prod', function() {
  var css = gulp.src(dist.base + '/css/' + dist.files.css);
  var js = gulp.src(dist.base + '/js/' + dist.files.js);

  return gulp.src(src.base + '/index.html')
    .pipe(gulp.dest(dist.base))
    .pipe(plugins.inject(gulp.src(['']), {addRootSlash: false, relative: true, name: 'cssvendors', empty: true, removeTags: true}))
    .pipe(plugins.inject(css, {addRootSlash: false, relative: true, removeTags: true}))
    .pipe(plugins.inject(gulp.src(['']), {addRootSlash: false, relative: true, name: 'jsvendors', empty: true, removeTags: true}))
    .pipe(plugins.inject(js, {addRootSlash: false, relative: true, removeTags: true}))
    .pipe(plugins.inject(svgIcons, {
      transform: fileContents
    }))
    .pipe(plugins.minifyHtml({conditionals: true, quotes: true}))
    .pipe(gulp.dest(dist.base));
});

// Minify all the module templates and move them to /dist.
gulp.task('templates', function() {
  return gulp.src(src.modules + '/**/*.html')
    .pipe(plugins.minifyHtml({conditionals: true, quotes: true}))
    .pipe(gulp.dest(dist.modules));
});

// Minify all the svg files and move them.
gulp.task('svgmin', function() {
  return gulp.src([
      src.modules + '/**/*.svg',
      '!' + src.modules + '/**/icon-*.svg', // This line can be commented to include the icon file in dist.
      '!' + src.modules + '/fonts/**.*'
    ])
    .pipe(plugins.svgmin())
    .pipe(plugins.rename(function(path) {
      // Remove the module directory to maintain relative paths.
      if (path.dirname.indexOf('/') != -1) {
        path.dirname = path.dirname.substring(path.dirname.indexOf('/') + 1);
      }
    }))
    .pipe(gulp.dest(dist.base));
});

// Minify all the image files and move them.
gulp.task('imagemin', function() {
  return gulp.src([src.modules + '/**/*.{png,gif,jpg}'])
    .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(plugins.rename(function(path){
      // Remove the module directory to maintain relative paths.
      if (path.dirname.indexOf('/') != -1) {
        path.dirname = path.dirname.substring(path.dirname.indexOf('/') + 1);
      }
    }))
    .pipe(gulp.dest(dist.base));
});

// Move things that don't need to be minified.
gulp.task('move', function() {
  return gulp.src(src.modules + '/**/*.json')
    .pipe(gulp.dest(dist.modules));
});

// The watch task.
gulp.task('watch', function() {
  plugins.livereload.listen();

  // watch just the CSS so livereload doesn’t reload the entire page
  gulp.watch([src.modules + '/**/*.sass'], ['sass']);
  gulp.watch([src.modules + '/**/*.css'], plugins.livereload.changed);

  gulp.watch([src.modules + '/**/*.html'], plugins.livereload.changed);

  gulp.watch(src.modules + '/**/*.js', ['jshint']).on('change', plugins.livereload.changed);
});

// The default task.
gulp.task('default', function(done) {
  runSequence('sass', 'jshint', ['inject:dev'], 'watch', done);
});

// The main build task.
gulp.task('build', function(done) {
  runSequence('clean', ['sass', 'jshint'], ['cssmin', 'uglify', 'svgmin', 'imagemin'], ['templates', 'move'], 'inject:prod', done);
});