var gulp            = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var del             = require('del');
var pathExists      = require('path-exists');
var plugins         = gulpLoadPlugins();
var runSequence     = require('run-sequence');
var inquirer        = require('inquirer');
var config          = require('./config.json');

var src = {
  base:    './src',
  modules: './src/modules',
  min:     './src/min',
};

var dist = {
  base:    './dist',
  modules: './dist/modules',
  min:     './dist/min',
}

var filesnames = {
  css: 'application.min.css',
  js: 'application.min.js'
}

/**
 * Functions and Utilities
 */
function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
};

function fileContents(filePath, file) {
  return file.contents.toString();
};

// pass in an array of arrays, get a single concatenated array back
function concatArrays(arrays){
  var concatenated = [];
  arrays.forEach(function(a){
    concatenated = concatenated.concat(a);
  })
  return concatenated;
}

var svgIcons = gulp.src([
  src.modules + '/**/icon-*.svg',
  '!' + src.modules + '/fonts/**.*'
])
.pipe(plugins.svgmin())
.pipe(plugins.svgstore({ inlineSvg: true }));

// libs from bower + modules
var jsSources = config.js.lib.concat([
  src.modules + '/core/app.js',
  src.modules + '/**/init.js',
  src.modules + '/**/*.js'
]);

/**
 * Tasks
 */

// Cleaning
gulp.task('clean', function(){
  return del([ dist.base + '/*', '!'+dist.base+'/.git*' ]);
});

/*

  Styles

*/

// SASS compiling task: all sass files to a single CSS file,
// except base.sass which gets inlined
gulp.task('sass', function() {
  return gulp.src([ src.modules + '/**/*.sass', '!'+src.modules+'/core/sass/base.sass' ])
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        style: 'compressed',
        indentedSyntax: true
      }))
      .on('error', swallowError)
      .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(plugins.cssmin())
      .pipe(plugins.concat(filesnames.css))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(src.min))
});

// base.sass gets inlined
gulp.task('basesass', function(){
  return gulp.src([ src.modules + '/core/sass/base.sass' ])
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        style: 'compressed',
        indentedSyntax: true
      }))
      .on('error', swallowError)
      .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(plugins.cssmin())
      .pipe(plugins.rename('base.min.css'))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(src.min))
})

// // CSS minifying task
// gulp.task('cssmin', function () {
//   var files = config.css.lib;
//   files.push(src.modules + '/*/css/*.css');
//   return gulp.src(files)
//     .pipe(plugins.cssmin())
//     .pipe(plugins.concat(filesnames.css))
//     .pipe(gulp.dest(dist.min + '/css'));
// });

/*

  Scripts

*/

// JS linting task.
gulp.task('jshint', function () {
  return gulp.src([src.modules + '/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

// JS minifying task
// gulp.task('uglify', function () {
//   var files = config.js.lib;

//   files = files.concat([
//     src.modules + '/core/app.js',
//     src.modules + '/*/init.js',
//     src.modules + '/**/*.js'
//   ]);

//   return gulp.src(files)
//     .pipe(plugins.ngAnnotate())
//     .pipe(plugins.uglify({mangle: false}))
//     .pipe(plugins.concat(dist.files.js))
//     .pipe(gulp.dest(dist.base + '/js'));
// });

// // Inject CSS and JS into index.html (for development);
// gulp.task('inject:dev', function() {
//   var csslibs = gulp.src(config.css.lib, {read: false});
//   var csssources = gulp.src([src.modules + '/**/*.css'], {read: false});
//   var jslibs = gulp.src(config.js.lib, {read: false});
//   var jssources = gulp.src([
//     src.modules + '/core/app.js',
//     src.modules + '/*/init.js',
//     src.modules + '/**/*.js'
//   ], {read: false});

//   return gulp.src(src.base + '/index.html')
//     .pipe(plugins.inject(csslibs, {addRootSlash: false, relative: true, name: 'cssvendors'}))
//     .pipe(plugins.inject(csssources, {addRootSlash: false, relative: true}))
//     .pipe(plugins.inject(jslibs, {addRootSlash: false, relative: true, name: 'jsvendors'}))
//     .pipe(plugins.inject(jssources, {addRootSlash: false, relative: true}))

//     .pipe(gulp.dest(src.base));
// });

gulp.task('scripts:dev', function(){
  return gulp.src(jsSources)
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat(filesnames.js))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(src.min));
})

gulp.task('scripts:dist', function(){
  return gulp.src(jsSources)
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat(filesnames.js))
      .pipe(plugins.uglify({ mangle: false }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(dist.min));
})
>>>>>>> mustard cutting working

// // JS minifying task
// gulp.task('uglify', function () {
//   var files = config.js.lib;
//   filesnames.push(src.modules + '/**/*.js');
//   return gulp.src(files)
//     .pipe(plugins.ngAnnotate())
//     .pipe(plugins.uglify({mangle: false}))
//     .pipe(plugins.concat(filesnames.js))
//     .pipe(gulp.dest(dist.base + '/js'));
// });

// // Inject CSS and JS into index.html (for development);
// gulp.task('inject:dev', function() {
//   var csslibs = gulp.src(config.css.lib, {read: false});
//   var csssources = gulp.src([src.modules + '/**/*.css'], {read: false});
//   var jslibs = gulp.src(config.js.lib, {read: false});
//   var jssources = gulp.src([src.modules + '/core/app.js', src.modules + '/**/*.js'], {read: false});

//   return gulp.src(src.base + '/index.html')
//     .pipe(plugins.inject(csslibs, {addRootSlash: false, relative: true, name: 'cssvendors'}))
//     .pipe(plugins.inject(csssources, {addRootSlash: false, relative: true}))
//     .pipe(plugins.inject(jslibs, {addRootSlash: false, relative: true, name: 'jsvendors'}))
//     .pipe(plugins.inject(jssources, {addRootSlash: false, relative: true}))

//     .pipe(gulp.dest(src.base));
// });

// // Inject CSS and JS into index.html and then minify it and move it to /dist (for production).
// gulp.task('inject:prod', function() {
//   var css = gulp.src(dist.base + '/css/' + filesnames.css);
//   var js = gulp.src(dist.base + '/js/' + filesnames.js);

//   return gulp.src(src.base + '/index.html')
//     .pipe(gulp.dest(dist.base))
//     .pipe(plugins.inject(gulp.src(['']), {addRootSlash: false, relative: true, name: 'cssvendors', empty: true, removeTags: true}))
//     .pipe(plugins.inject(css, {addRootSlash: false, relative: true, removeTags: true}))
//     .pipe(plugins.inject(gulp.src(['']), {addRootSlash: false, relative: true, name: 'jsvendors', empty: true, removeTags: true}))
//     .pipe(plugins.inject(js, {addRootSlash: false, relative: true, removeTags: true}))
//     .pipe(plugins.inject(svgIcons, {
//       transform: fileContents
//     }))
//     .pipe(plugins.minifyHtml({conditionals: true, quotes: true}))
//     .pipe(gulp.dest(dist.base));
// });

/*

  Other

*/

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

// inline everything with 'inline' attribute
gulp.task('inline', function(){
  return gulp.src('src/index.html')
    .pipe(plugins.minifyHtml({conditionals: true, quotes: true}))
    .pipe(plugins.inlineSource())
    .pipe(gulp.dest(dist.base))
})

// Move things that don't need to be minified.
gulp.task('move', function() {
  return gulp.src([
    src.modules + '/**/*.json',
    src.min + '/*.css',
  ], { base: 'src/'})
    .pipe(gulp.dest(dist.base));
});


<<<<<<< HEAD
// Create a new modoule.
gulp.task('module', function(done) {

  inquirer.prompt([{
    type: 'input',
    message: 'What do you want to call your new module?',
    name: 'module'
  }], function(answers) {
    if (answers.module) {

      var dirname = answers.module.split('.').pop();

      var string = [
        "(function(AppConfig) {\n",
        "  'use strict';\n\n",
        "  AppConfig.registerModule('" + answers.module + "');\n\n",
        "})(window.AppConfig);"
      ].join('');

      pathExists(src.modules + '/' + dirname).then(function(exists) {
        if (!exists) {
          return plugins.file('init.js', string, {src: true})
            .pipe(gulp.dest(src.modules + '/' + dirname))
            .pipe(plugins.util.log(plugins.util.colors.green(answers.module), 'Module Created'))
        } else {
          return plugins.util.log(plugins.util.colors.red(answers.module + ' already exists!'));
        }
      });

    }
    done();
  });

});

// The watch task.
gulp.task('watch', function() {
=======

/*

  ###### #####   ####  ##  ##  ####
    ##  ##   ## ##     ## ##  ##
    ##  #######  ####  ####    ####
    ##  ##   ##     ## ## ##      ##
    ##  ##   ## #####  ##  ## #####

*/

// The default (watch) task.
gulp.task('default', [ 'sass', 'basesass', 'scripts:dev', 'jshint' ], function() {
>>>>>>> mustard cutting working
  plugins.livereload.listen();

  gulp.watch([src.modules + '/**/*.sass'], ['sass']);
  gulp.watch([src.modules + '/core/sass/base.sass'], ['basesass']);
  gulp.watch([src.min + '/*.css'], plugins.livereload.changed);

  gulp.watch([src.base + '/**/*.html'], plugins.livereload.changed);

  gulp.watch(src.modules + '/**/*.js', ['jshint', 'scripts:dev']);
  gulp.watch([src.base + '/*.js', src.min + '*.js'], plugins.livereload.changed);
});

// The build task.
gulp.task('build', function(done) {
  runSequence(
    'clean',
    ['sass', 'jshint', 'scripts:dist', 'svgmin', 'imagemin', 'templates', 'move', 'inline'],
    done
  );
});

