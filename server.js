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
// TODO: Router doesn't have to be global
var React = require('react'),
    Router = require('./src/Router'),
    Application = require('./src/Application'),
    Store = require('./src/Store')

app.use(function(req, res, next) {
  var path = req.path,
      match = Router.recognizePath(path)

  if (!match) return next()

  // Initialize store
  var store = new Store()

  function send() {
    var markup = React.renderComponentToString(Application({
      path: path,
      store: store
    }))

    // Inject store data into markup
    markup = markup.replace('</head>', '<script>window._store = ' + store.toJSON() + '</script></head>')

    res.send(markup)
  }

  // Load initial data
  if (match.handler.fetchData) {
    store.fetch(match.handler.fetchData(), function(err) {
      if (err) return next(err)

      send()
    })
  } else {
    send()
  }
})

if (!module.parent) {
  var port = process.env.PORT || 3000

  app.listen(port, function() {
    console.log('Listening on port %s', port)
  })
}
