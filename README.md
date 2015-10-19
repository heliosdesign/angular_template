# Helios Angular Template

**[Helios Angular Template Wiki](https://github.com/heliosdesign/angular_template/wiki/File-Structure)**, [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)


## Getting Started

Clone the project and start a new git repo.

```
git clone git@github.com:heliosdesign/angular_template.git <project_name>
cd <project name>
rm -rf .git
git init
```

Install npm packages and bower modules from `packages.tar.gz`.

```
npm run packageinstall
```

### Gulp

`gulp` compile sass, auto-inject js files.

`gulp build` compile to `dist`.

### Bower

Bower is set up with Angular, standard Angular modules, Underscore, and Helios Frame Runner. Packages are installed to `src/components`.

NOTE: when you add a new dependency, you’ll need to add its JS files to `config.json` so they can be injected into `index.html` by Gulp.