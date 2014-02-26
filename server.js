'use strict';

require('node-jsx').install({extension: '.jsx'})

var express = require('express'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    zlib = require('zlib'),
    ReactAsync = require('react-async')

var app = module.exports = express(),
    debug = app.get('env') == 'development'

// Mock API
app.get('/api', function(req, res) {
  res.send({message: 'Hello from API'})
})

// Client bundler
app.use('/client.js', function() {
  var bundler = browserify({
    extensions: ['.jsx', '.js', '.json'],
    entries: './client'
  })

  if (debug) {
    var watcher = watchify(bundler)

    return function(req, res, next) {
      watcher.bundle({debug: true}).pipe(res)
    }
  } else {
    var cache

    return function(req, res, next) {
      if (cache) return res.send(cache)

      bundler.bundle(function(err, src) {
        if (err) return next(err)

        zlib.gzip(src, function(err, src) {
          if (err) return next(err)

          cache = new Buffer(src)

          res.send(src)
        })
      })
    }
  }
}())

// Server rendering
var Client = require('./client')

app.use(function(req, res, next) {
  ReactAsync.renderComponentToStringWithAsyncState(
    Client({ path: req.path }),
    function(err, markup, data) {
      if (err) return next(err)

      res.send(ReactAsync.injectIntoMarkup(markup, data, ['./client.js']))
    })
})

if (!module.parent) {
  var port = process.env.PORT || 3000

  app.listen(port, function() {
    console.log('Listening on port %s', port)
  })
}
