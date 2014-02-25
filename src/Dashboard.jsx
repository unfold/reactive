/** @jsx React.DOM */

'use strict';

var React = require('react'),
    ReactAsync = require('react-async'),
    Layout = require('./layout/Layout')

module.exports = ReactAsync.createClass({
  displayName: 'Dashboard',

  getInitialStateAsync: function(callback) {
    return this.props.store.fetch({
      motd: 'http://localhost:3000/api'
    }, callback)
  },

  render: function() {
    var motd

    if (this.state.motd) {
      motd = <span className="motd">Message of the day: {this.state.motd.message}</span>
    }

    return (
      <Layout>
        <h1>Dashboard</h1>

        {motd}
      </Layout>
    )
  }
})
