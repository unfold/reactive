/** @jsx React.DOM */

var React = require('react'),
    Application = require('./src/Application'),
    Store = require('./src/Store')

// Enable Recat DevTools
window.React = React

React.renderComponent(Application({
  store: new Store(window._store)
}), document)
