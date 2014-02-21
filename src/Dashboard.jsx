/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Layout = require('./layout/Layout'),
    Store = require('./Store')

function getManifest(params, query) {
  return {
    motd: 'http://localhost:3000/api'
  }
}

module.exports = React.createClass({
  displayName: 'Dashboard',

  getInitialState: function() {
    return {
      data: Store.get(getManifest())
    }
  },

  loadMissingData: function() {
    if (!this.state.data) {
      Store.fetch(getManifest(), function(err, data) {
        this.setState({ data: data })
      }.bind(this))
    }
  },

  componentWillMount: function() {
    this.loadMissingData()
  },

  render: function() {
    var motd

    if (this.state.message) {
      motd = <span className="motd">Message of the day: {this.state.data.message}</span>
    }

    return (
      <Layout>
        <h1>Dashboard</h1>

        {motd}
      </Layout>
    )
  },

  statics: {
    getManifest: getManifest
  }
})
