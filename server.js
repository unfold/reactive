'use strict';

require('node-jsx').install({extension: '.jsx'})

var express = require('express'),
    watchify = require('watchify'),
    ReactAsync = require('react-async')

var app = module.exports = express()

// Mock API
app.get('/api', function(req, res) {
  res.send({message: 'Hello from API'})
})

// Client bundler
app.use('/client.js', function() {
  var watcher = watchify({
    extensions: ['.jsx', '.js', '.json'],
    entries: './client'
  })

  return function(req, res, next) {
    watcher.bundle({debug: true}).pipe(res)
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
