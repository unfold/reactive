'use strict';

var express = require('express'),
    browserify = require('connect-browserify'),
    React = require('react'),
    JSX = require('node-jsx')

module.exports = function(clientPath, options) {
  options = options || {}

  // Allow requiring of JSX files
  JSX.install({extension: '.jsx'})

  var app = express()

  // Client bundling
  app.get('/client.js', browserify({
    entry: clientPath,
    extensions: ['.jsx', '.js', '.json'],
    debug: options.debug,
    watch: options.debug
  }))

  // Server rendering
  var Application = require(clientPath)

  app.use(function(req, res, next) {
    var path = req.path,
        match = Application.matchPath(path)

    if (match) {
      Application.preloadPath(path, function(err, data) {
        if (err) return next(err)

        var application = Application({
          path: path,
          data: data
        })

        // Inject data into markup
        var markup = React.renderComponentToString(application)
        markup = markup.replace('</head>', '<script>window._shared = ' + JSON.stringify(application.props.data) + '</script></head>')

        res.send(markup)
      })
    }
  })

  return app
}
