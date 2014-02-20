var browserify = require('browserify'),
    routes = require('../src/routes')

var bundler = browserify({
  basedir: __dirname + '/../src/components',
  extensions: ['.js', '.jsx', '.json']
}).transform('reactify')

Object.keys(routes).map(function(key) {
  return routes[key]
}).filter(function(component, index, components) {
  return components.indexOf(component) === index
}).map(function(component) {
  bundler.require('./' + component)
})

bundler
  .require('./Application')
  .require('react', {expose: 'React'})
  .bundle()
  .pipe(process.stdout)
