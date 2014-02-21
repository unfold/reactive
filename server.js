'use strict';

var express = require('express'),
    path = require('path'),
    browserify = require('connect-browserify'),
    jsx = require('node-jsx')

jsx.install({extension: '.jsx'})

var app = module.exports = express(),
    debug = app.get('env') == 'development'

// Mock API
app.get('/api', function(req, res) {
  res.send({message: 'Hello from API'})
})

// Client bundler
app.get('/client.js', browserify({
  entry: path.resolve('./client'),
  extensions: ['.jsx', '.js', '.json'],
  debug: debug,
  watch: debug
}))

// Server rendering
var Router = require('./src/Router'),
    Store = require('./src/Store'),
    Application = require('./src/Application'),
    React = require('react')

function renderMarkup(path) {
  var markup = React.renderComponentToString(Application({
    path: path
  }))

  // Inject store data into markup
  markup = markup.replace('</head>', '<script>window._store = ' + Store.toJSON() + '</script></head>')

  return markup
}

app.use(function(req, res, next) {
  var path = req.path,
      match = Router.recognizePath(path)

  if (!match) return next()

  // Load initial data into store
  if (match.handler.fetchData) {
    Store.clearCache()
    Store.fetch(match.handler.fetchData(), function(err) {
      if (err) return next(err)

      res.send(renderMarkup(path))
    })
  } else {
    res.send(renderMarkup(path))
  }
})

if (!module.parent) {
  var port = process.env.PORT || 3000

  app.listen(port, function() {
    console.log('Listening on port %s', port)
  })
}
