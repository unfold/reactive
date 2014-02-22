/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Layout = require('./layout/Layout')

function fetchData(params, query) {
  return {
    motd: '/api'
  }
}

module.exports = React.createClass({
  displayName: 'Dashboard',

  getInitialState: function() {
    return {
      data: this.props.store.get(fetchData())
    }
  },

  loadMissingData: function() {
    if (!this.state.data) {
      this.props.store.fetch(fetchData(), function(err, data) {
        this.setState({ data: data })
      }.bind(this))
    }
  },

  componentWillMount: function() {
    this.loadMissingData()
  },

  render: function() {
    var motd

    if (this.state.data) {
      motd = <span className="motd">Message of the day: {this.state.data.motd.message}</span>
    }

    return (
      <Layout>
        <h1>Dashboard</h1>

        {motd}
      </Layout>
    )
  },

  statics: {
    fetchData: fetchData,

    getMetadata: function() {
      return {
        title: 'Dashboard'
      }
    }
  }
})
