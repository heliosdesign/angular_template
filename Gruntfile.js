module.exports = function(grunt){

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({

    // ********************************************************

    sass: {

      dev: {
        options: { outputStyle: 'compressed', sourceMap: true },
        files: {'src/css/style.css': 'src/style.sass'},
      },

      dist: {
        options: { outputStyle: 'compressed', sourceMap: true },
        files: {'dist/css/style.css': 'src/style.sass'},
      }
    },

    autoprefixer: {
      options: {
        map: true, // Use and update the sourcemap
        browsers: ["last 3 versions", "> 1%", "Explorer 9"]
      },
      dev: { src: 'src/css/style.css', dest: 'src/css/style.css' },
      dist: { src: 'dist/css/style.css', dest: 'dist/css/style.css' }
    },

    watch: {
      options: { livereload: true, },

      css: { files: ['src/css/style.css'] },
      js:  { files: ['js/**/*.js'] },
      html: { files: ['src/**/*.html'] },

      sass: {
        options: { livereload: false }, // don't reload for sass files; pass them on to the processors
        files: ['src/**/*.sass'],
        tasks: ['sass', 'autoprefixer']
      }
    },

    // ********************************************************

    clean: {
      dist: { src: [ '.tmp', 'dist/*', '!dist/.git' ] }
    },

    useminPrepare: {
      html: 'src/index.html',
      options: { dest: 'dist' }
    },

    usemin: {
      options: { assetsDirs: ['dist'] },
      html: ['dist/{,*/}*.html'],
      css: ['dist/{,*/}*.css']
    },

    uglify: {
      options: {
        mangle: false, // don’t minify variable names
        report: true,
        compress: { drop_console: true } // remove all window.console calls
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'dist',
          src: [
            '{,*/}*.html',
            'js/cdn.js',
          ]
        }]
      }
    },

    inline: {
      dist: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    }


  });

  grunt.registerTask('default', ['sass:dev', 'autoprefixer:dev', 'watch']);

  grunt.registerTask('build', [
    'clean',
    'sass:dist',
    'autoprefixer:dist',
    'useminPrepare', // Looks for <!-- special blocks -->
    'concat',
    'uglify',
    'copy',
    'inline',
    'usemin',
  ])

}
