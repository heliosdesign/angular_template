var data         = require('./package.json');

var gulp         = require('gulp'),
    gulputil     = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    clean        = require('gulp-clean'),
    concat       = require('gulp-concat'),
    imagemin     = require('gulp-imagemin'),
    jshint       = require('gulp-jshint'),
    livereload   = require('gulp-livereload'),
    minifyCss    = require('gulp-minify-css'),
    minifyHtml   = require('gulp-minify-html'),
    rename       = require('gulp-rename'),
    replace      = require('gulp-replace'),
    sass         = require('gulp-ruby-sass'),
    svgmin       = require('gulp-svgmin'),
    uglify       = require('gulp-uglify'),
    usemin       = require('gulp-usemin'),
    watch        = require('gulp-watch'),
    plumber      = require('gulp-plumber');

var path = {
  src: {
    base: './src',
    sass: './src/sass',
    styles: './src/css',
    scripts: './src/js',
    assets: './src/assets'
  },
  dist: {
    base: './dist',
    scripts: './dist/js',
    assets: './dist/assets'
  }
}

/**
 * Functions
 */
var swallowError = function(error) {
  console.log(error.toString());
  this.emit('end');
}

/**
 * Tasks
 */
gulp.task('clean', function(){
  gulp.src(path.dist.base + '/', {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src(path.src.sass + '/*.sass')
    .pipe(plumber())
    .pipe(sass({ style: 'expanded', compass: true }))
    .on('error', swallowError)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(path.src.styles))
    .pipe(livereload({auto: false}));
});

gulp.task('assets', ['clean'], function() {
  return gulp.src([path.src.assets + '/**/*.{jpg,png,svg}'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(path.dist.assets))
});

gulp.task('usemin', ['clean', 'styles'], function() {
  return gulp.src(path.src.base + '/**/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rename({suffix: '.' + data.version})],
      html: [minifyHtml({empty:true, comments:true, conditionals:true, quotes:true})],
      js: [uglify({mangle:false}), rename({suffix: '.' + data.version})]
    }))
    .pipe(gulp.dest(path.dist.base))
});

/** 
 * Functions 
 */
// var styles = function(env) {
//   var source = path.src.styles + '/style.sass';
//   var output = env === 'src' ? 'expanded' : 'compressed';
//   var template = env === 'src' ? 'twentyfourteen' : 'twentyfourteen';
//   var cssImport = env === 'src' ? '../../twentyfourteen/style.css' : '../twentyfourteen/style.css';
//   var slg = data.config.slug || data.name;

//   gulp.src([
//       path.src.styles + '/*.sass',
//       '!' + path.src.styles + '/style.sass'
//     ])
//     .pipe(sass({ style: output, compass: true }))
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(gulp.dest(path[env].base + '/css'));

//   return gulp.src(source)
//     .pipe(sass({ style: output, compass: true }))
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(replace('{{themeURI}}', data.homepage))
//     .pipe(replace('{{author}}', data.author.name))
//     .pipe(replace('{{authorURI}}', data.author.url))
//     .pipe(replace('{{description}}', data.description))
//     .pipe(replace('{{version}}', data.version))
//     .pipe(replace('{{template}}', template))
//     .pipe(replace('{{cssImport}}', cssImport))
//     .pipe(replace('{{textDomain}}', slg))
//     .pipe(replace('{{themeName}}', function() {
//       var string = data.config.title;
//       if (env === 'src') {
//         string += ' (Development)';
//       }
//       return string;
//     }))
//     .pipe(gulp.dest(path[env].base))
//     .pipe(livereload({auto: false}));
// }

// var scripts = function(env) {
//   var enqPath = '/inc/functions';

//   if (env === 'dist') {
//     gulp.src(path.src.base + enqPath + '/enqueue-functions.php')
//       .pipe(replace('/js/main.dev.js', '/js/main.min.js'))
//       .pipe(gulp.dest(path.dist.base + enqPath))
//   }

//   return gulp.src([
//       path.src.scripts + '/*.js',
//       '!' + path.src.scripts + '/*.dev.js',
//       '!' + path.src.scripts + '/lib/*'
//     ])
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('main.js'))
//     .pipe(rename({suffix: '.dev'}))
//     .pipe(gulp.dest(path.src.scripts))
//     .pipe(uglify())
//     .pipe(rename({basename:'main.min'}))
//     .pipe(gulp.dest(path.dist.scripts))
//     .pipe(livereload({auto: false}));
// }

// var assets = function(type) {
//   var source = path.src.assets + '/' + type + '/**/*';
//   var compress;
//   if (type === 'img') {
//     var compress = imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
//   } else {
//     var compress = svgmin();
//   }
//   return gulp.src(source)
//     .pipe(compress)
//     .pipe(gulp.dest(path.dist.assets + '/' + type))
// }

// var move = function() {
//   return gulp.src([
//     path.src.base + '/**/*.php',
//     path.src.base + '/*.png',
//     path.src.scripts + '/lib/*.js',
//     '!' + path.src.base + '/inc/functions/enqueue-functions.php'
//   ], {base: path.src.base})
//     .pipe(gulp.dest(path.dist.base))
// }

/**
 * Tasks
 */
// gulp.task('styles', function() {
//   styles('src');
// });

// gulp.task('scripts', function() {
//   scripts('src');
// });

// gulp.task('clean', function(){
//   return gulp.src([path.dist.base + '/*'], {read: false})
//     .pipe(clean())
// });

// gulp.task('build', ['clean'], function(){
//   styles('dist');
//   move();
// });

// gulp.task('watch', function(){
//   livereload.listen();
//   gulp.watch(path.src.styles + '/**/*.sass', ['styles']);
//   // gulp.watch(path.src.scripts + '/*.js', ['scripts']);
// });

gulp.task('build', ['clean', 'usemin', 'assets']);

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(path.src.sass + '/**/*.sass', ['styles']);
  gulp.watch([path.src.base + '/**/*.{html,php}']).on('change', livereload.changed);
  gulp.watch([path.src.scripts + '/**/*.js']).on('change', livereload.changed);
  gulp.watch([path.src.assets + '/**/*']).on('change', livereload.changed);
});