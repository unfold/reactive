/*global describe, it */

var request = require('supertest'),
    server = require('../server')

describe('server', function() {
  describe('GET /', function() {
    it('should respond with "Hello" in both markup and initial client data', function(done) {
      request(server)
        .get('/')
        .expect(200)
        .end(done)
        // .expect(/<span[^>]+>Hello<\/span>/)
        // .expect(/data: {"message":"Hello"}/, done)
    })
  })
  /*
  describe('GET /', function() {
    it('should respond with "Hello" in both markup and initial client data', function(done) {
      request(server)
        .get('/')
        .expect(200)
        .expect(/<span[^>]+>Hello<\/span>/)
        .expect(/data: {"message":"Hello"}/, done)
    })

    it('should pass request parameters to components', function(done) {
      request(server)
        .get('/products/fancy-jacket')
        .expect(200)
        .expect(/Product #<\/span><span[^>]+>fancy-jacket<\/span>/, done)
    })

    it('should handle components with event listeners', function(done) {
      request(server)
        .get('/products')
        .expect(200)
        .expect(/<h1[^>]+>Products<\/h1>/, done)
    })
  })
  */
})
