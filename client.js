var React = require('react'),
    Application = require('./src/Application')

if (typeof window !== 'undefined') {
  // Enable Recat DevTools
  window.React = React

  React.renderComponent(Application(), document)
}

module.exports = Application
