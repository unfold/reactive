'use strict';

require('node-jsx').install({extension: '.jsx'})

var express = require('express'),
    // browserify = require('connect-browserify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    // path = require('path'),
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

  if (!debug) {
    var watcher = watchify(bundler)

    return function(req, res, next) {
      watcher.bundle({debug: true}).pipe(res)
    }
  } else {
    var bundle = bundler.bundle()

    return function(req, res, next) {
      return bundle.pipe(res)
    }
  }
}())

// Server rendering
var client = require('./client')

app.use(function(req, res, next) {
  ReactAsync.renderComponentToString(client({path: req.path}), function(err, markup, data) {
    if (err) return next(err)

    markup = ReactAsync.injectIntoMarkup(markup, data, ['./client.js'])

    res.send(markup)
  })
})

if (!module.parent) {
  var port = process.env.PORT || 3000

  app.listen(port, function() {
    console.log('Listening on port %s', port)
  })
}
