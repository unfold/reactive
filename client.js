/** @jsx React.DOM */

var React = require('react'),
    Application = require('./src/Application')

// Mount the client unless we're running on the server
if (typeof window !== 'undefined') {
  // Enable Recat DevTools
  window.React = React

  React.renderComponent(Application(), document)
} else {
  // Expose the entry point to the server
  module.exports = Application
}
