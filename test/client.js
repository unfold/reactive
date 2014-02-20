/* global describe, it */

var React = require('React')

var container = document.getElementById('application')

describe('client', function() {
  describe('application', function() {
    var Application = require('./Application')

    it('should properly route to Dashboard and render', function() {
      var routes = {
        '*': 'Dashboard'
      }

      var data = {
        message: 'Bird'
      }

      React.renderComponent(Application({
        routes: routes,
        data: data
      }), container)

      container.querySelector('.motd').textContent.should.eql('Bird')
    })
  })

  describe('dashboard', function() {
    var Dashboard = require('./Dashboard')

    it('should properly render "Hello" message with provided data', function() {
      React.renderComponent(Dashboard({
        data: {
          message: 'Hello'
        }
      }), container)

      container.querySelector('.motd').textContent.should.eql('Hello')
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
