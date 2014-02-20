/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({
  displayName: 'Layout',

  render: function() {
    return (
      <main>
        <nav>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/products">Products</a></li>
          </ul>
        </nav>

        {this.props.children}
      </main>
    )
  }
})
