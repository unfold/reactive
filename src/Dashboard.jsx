/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Layout = require('./layout/Layout'),
    Store = require('./Store')

function fetchData(callback) {
  Store.fetch('http://localhost:3000/api', callback)
}

module.exports = React.createClass({
  displayName: 'Dashboard',

  getInitialState: function() {
    return {
      data: this.props.data
    }
  },

  loadMissingData: function(callback) {
    if (!this.state.data) {
      fetchData(function(err, data) {
        this.setState({
          data: data
        }, callback)
      }.bind(this))
    }
  },

  componentWillMount: function() {
    this.loadMissingData()
  },

  render: function() {
    var motd

    if (this.state.data) {
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
    fetchData: fetchData
  }
})
