/* global describe, it, before, after, afterEach, sinon */

var React = require('React'),
    Store = require('./Store')

describe('client', function() {
  var container = document.getElementById('application')

  afterEach(function() {
    container.innerHTML = ''
  })

  describe('application', function() {
    var Application = require('./Application')

    before(function() {
      sinon
        .stub(Store.prototype, 'fetchUrl')
        .yields(null, {message: 'Goodbye'})
    })

    after(function() {
      Store.prototype.fetchUrl.restore()
    })

    it('should properly route to Dashboard and render message', function() {
      React.renderComponent(Application(), container)

      container.querySelector('.motd').textContent.should.contain('Goodbye')
    })
  })

  describe('products', function() {
    it('should increment count when button is clicked', function() {
      var Products = require('./Products')

      React.renderComponent(Products(), container)

      var button = container.querySelector('button')
      button.click()
      button.click()
      button.querySelector('span:nth-child(2)').textContent.should.equal('2')
    })
  })
})
