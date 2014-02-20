/** @jsx React.DOM */

var React = require('react'),
    Layout = require('./layout/Layout')

var Variant = React.createClass({
  displayName: 'Variant',

  render: function() {
    return (
      <div>Variant #{this.props.id}</div>
    )
  }
})

module.exports = React.createClass({
  displayName: 'Product',

  render: function() {
    var variant = this.props.params.variantId && <Variant id={this.props.params.variantId} />

    return (
      <Layout>
        Product #{this.props.params.productId}
        {variant}
      </Layout>
    )
  }
})
