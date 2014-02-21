var browserify = require('browserify'),
    path = require('path')

var bundler = browserify({
  basedir: path.resolve('../src'),
  extensions: ['.js', '.jsx', '.json']
})

bundler
  .require('react', {expose: 'React'})
  .require('./Router')
  .require('./Application')
  .require('./Dashboard')
  .bundle()
  .pipe(process.stdout)
