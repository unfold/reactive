/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Router = require('./Router')

module.exports = React.createClass({
  displayName: 'Application',

  getInitialState: function() {
    return {
      match: Router.recognizePath(this.props.path || window.location.pathname)
    }
  },

  navigate: function(path, callback) {
    window.history.pushState(null, null, path)

    this.setState({ match: Router.recognizePath(path) }, callback)
  },

  handleClick: function(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault()

      this.navigate(e.target.pathname)
    }
  },

  handlePopstate: function() {
    var path = window.location.pathname

    if (this.state.match.path !== path) {
      this.setState({ match: Router.recognizePath(path) })
    }
  },

  componentDidMount: function() {
    window.addEventListener('popstate', this.handlePopstate)
  },

  render: function() {
    var Page = this.state.match.handler,
        metadata = Page.getMetadata ? Page.getMetadata() : {},
        title = metadata.title || 'Reactive',
        description = metadata.description || 'Example react applicaiton'

    return (
      <html>
        <head>
          <title>{title}</title>

          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta property="og:title" content={title} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="/images/facebook-thumbnail.png" />
        </head>
        <body onClick={this.handleClick}>
          <Page params={this.state.match.params} store={this.props.store} />

          <script src="/client.js"></script>
        </body>
      </html>
    )
  }
})
