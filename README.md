# Helios Angular Template

Please read: [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)

## Getting Started

`npm install`

Grunt is set up to `watch` and `build`.

**Note!** You’ll need to use Node v0.10.33 otherwise `grunt-sass` won’t compile on your system.

### Bower

Bower is set up with Angular, standard Angular modules, Underscore, and Helios Frame Runner. Run `bower install` to install packages to to `src/components`.

## Folder Structure

```
/
  [.bowerrc, bower.json, Gruntfile.js, package.json, etc]
  README.md

/src
  /assets

  /components

  /css

  /js
    app.js

    /core
      router.js
      app.ctrl.js

    /module-name
      module.ctrl.js
      example-service.s.js
      partial.html

  /partials
    /module-name
      partial.html

  /sass

  index.html

```

Files should be grouped by feature, not by type: `/src/js/<module>/file.role.js`.