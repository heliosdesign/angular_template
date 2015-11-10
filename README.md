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

Run `npm install`, or install npm packages and bower modules from `packages.tar.gz` using `npm run packageinstall`.

### Gulp

`gulp` to watch, livereload and auto-inject sass and js files.

`gulp build` to compile to `dist`.

`gulp module` creates a new module.

### Bower

Bower is set up with Angular, standard Angular modules, Underscore, and Helios Frame Runner. Packages are installed to `src/components`.

NOTE: when you add a new dependency, you’ll need to add its JS files to `config.json` so they can be injected into `index.html` by Gulp.


## Images and Icons

### SVG Sprites

To use editable `.svg`s through the `<use>` syntax, do the following:

1) Save an SVG with the prefix `icon-` to the `assets` folder in any module. (eg. `/core/assets/icon-helios-logo.svg`).

2) Reference the symbol definition by ID in the HTML. The ID will be the name of the file minus the filetype.

```    
<svg class="icon"><use xlink:href="#icon-helios-logo"></svg>
```

3) The icon can now be styled with SASS/CSS:

```
.icon
  width: 100%
  height: 100%
  fill: black
  
  &:hover
    fill: orange
```

One thing to note: if you want to style the icon via CSS, make sure that there aren't any conflicting inline properties, ie `fill="#fff"`. Those properties can't be overridden.

