/* global describe, it, afterEach */

var React = require('React'),
    Store = require('./Store')

var container = document.getElementById('application')

describe('client', function() {
  afterEach(function() {
    container.innerHTML = ''
  })

  describe('application', function() {
    var Application = require('./Application')

    it('should properly route to Dashboard and render message', function() {
      React.renderComponent(Application({
        path: '/',
        store: new Store({motd: {message: 'Goodbye'}})
      }), container)

      container.querySelector('.motd').textContent.should.endWith('Goodbye')
    })
  })

  describe('products', function() {
    it('should increment count when button is clicked', function() {
      var Products = require('./Products')

      React.renderComponent(Products(), container)

      var button = container.querySelector('button')
      button.click()
      button.click()
      button.querySelector('span:nth-child(2)').textContent.should.eql(2)
    })
  })
})
