/** @jsx React.DOM */

var React = require('react'),
    Layout = require('./layout/Layout')

function fetchData(callback) {
  setTimeout(function() {
    callback(null, null, {
      title: 'Foo'
    })
  }, 75)
}

module.exports = React.createClass({
  displayName: 'Products',

  getInitialState: function() {
    return {
      count: 0
    }
  },

  handleClick: function() {
    this.setState({
      count: this.state.count + 1
    })
  },

  render: function() {
    return (
      <Layout>
        <h1>Products</h1>

        <button onClick={this.handleClick}>Click me to increment: {this.state.count}!</button>

        <ul>
          <li><a href="/products/foo">foo</a></li>
          <li><a href="/products/bar">bar</a></li>
          <li><a href="/products/complex-name-of-product-123">complex url</a></li>
          <li><a href="/products/complex-name-of-product-123/variant-expanded-456">complex variant url</a></li>
        </ul>
      </Layout>
    )
  },

  statics: {
    fetchData: fetchData
  }
})
