# Helios Angular Template

Please read: [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)

## Getting Started

Grunt is set up to `watch` and `build`.

### Bower

Bower is set up with Angular, standard Angular modules, Underscore, and Helios Frame Runner. Run `bower install` to install packages to to `src/components`.

## Folder Structure

Files should be grouped by feature/module, not by type: `/src/js/<module>/file.role.ext`.

```
/
  [.bowerrc, bower.json, Gruntfile.js, package.json, etc]
  README.md

/src
  /assets

  /components

  /css

  /app
    app.js

    /core
      router.js
      app.controller.js

    /example-module
      _example-module.sass
      example-module.controller.js
      example-module-service.service.js
      example-module.template.html
  
  style.sass
  index.html

```

An alternative.

```
/
  [.bowerrc, bower.json, Gruntfile.js, package.json, etc]
  README.md

/src

  /components
  
  /modules
    /core
      app.js [or init.js]
    /assets
    /config
      core.routes.js
    /controllers
    /css
    /directives
    /sass
    /views
  
  /example-module
    /assets
    /config
      example.routes.js
    /controllers
      example.controller.js
    /css
    /directives
      example.directive.js
    /sass
    /services
      example.services.js
    /views
      example.view.js
  
  style.sass
  index.html

```