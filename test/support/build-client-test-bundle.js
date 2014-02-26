var browserify = require('browserify')

var bundler = browserify({
  basedir: __dirname + '/../../src',
  extensions: ['.js', '.jsx', '.json']
})

bundler
  .require('react', {expose: 'React'})
  .require('./Router')
  .require('./Store')
  .require('./Application')
  .require('./Dashboard')
  .require('./Products')
  .bundle()
  .pipe(process.stdout)
