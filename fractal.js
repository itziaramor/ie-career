'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = (module.exports = require('@frctl/fractal').create());

/* Set the title of the project */
fractal.set('project.title', 'Fractal IE Career - Pattern Library');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/components');

/* Tell Fractal default preview layout */
fractal.components.set('default.preview', '@preview');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

// Tell Fractal where static files will live
fractal.web.set('static.path', __dirname + '/assets');

// Prefix the URL path of the assets
// fractal.web.set('static.mount', 'assets');

// Tell Fractal where build destination will live
fractal.web.set('builder.dest', __dirname + '/build');

const hbs = require('@frctl/handlebars')({
  /* other configuration options here */
});

fractal.components.engine(
  hbs
); /* set as the default template engine for components */
fractal.docs.engine(
  hbs
); /* you can also use the same instance for documentation, if you like! */

const instance = fractal.components.engine(hbs);

instance.handlebars.registerHelper('switch', function(value, options) {
  this.switch_value = value;
  return options.fn(this);
});

instance.handlebars.registerHelper('case', function(value, options) {
  if (value == this.switch_value) {
    return options.fn(this);
  }
});

instance.handlebars.registerHelper('ifZero', function(index, options) {
  if (index === 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

instance.handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});