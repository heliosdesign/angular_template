# Helios Angular Template

**[READ THE WIKI](https://github.com/heliosdesign/angular_template/wiki/File-Structure)** and refer to the [Angular Style Guide](https://github.com/johnpapa/angular-styleguide).

## Getting Started

Clone the project and start a new git repo.

```
git clone git@github.com:heliosdesign/angular_template.git <project_name>
cd <project name>
rm -rf .git
git init
bower install
npm install
```

### Gulp

`gulp` to watch, livereload and auto-inject `sass`, `js`, and `svg` files.

`gulp build` to compile a minified production build to `dist`.

`gulp module` to create a new module.

### Bower

Bower is set up with Angular, standard Angular modules, Underscore, and Helios Frame Runner. Packages are installed to `src/components`.

NOTE: when you add a new bower dependency, or any JS file outside of `src/modules`, you’ll need to add its JS files to `config.json` so they can be injected into `index.html` by Gulp.
