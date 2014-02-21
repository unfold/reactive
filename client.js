/** @jsx React.DOM */

var React = require('react'),
    Application = require('./src/Application'),
    Store = require('./src/Store')

// Mount the client unless we're running on the server
if (typeof window !== 'undefined') {
  // Enable Recat DevTools
  window.React = React

  // Prefill store
  Store.loadCache(window._shared)

  React.renderComponent(Application(), document)
} else {
  // Expose the entry point to the server
  module.exports = Application
}
