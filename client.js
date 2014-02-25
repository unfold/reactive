var React = require('react'),
    ReactAsync = require('react-async'),
    Application = require('./src/Application')

if (typeof window !== 'undefined') {
  // Enable Recat DevTools
  window.React = React

  ReactAsync.renderComponent(Application(), document)
}

module.exports = Application
