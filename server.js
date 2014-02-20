var express = require('express'),
    path = require('path'),
    middleware = require('./lib/middleware')

var app = module.exports = express()

app.get('/api', function(req, res) {
  res.send({message: 'Hello from API'})
})

app.use(middleware(path.resolve('./client'), { debug: true }))

if (!module.parent) {
  var port = process.env.PORT || 3000

  app.listen(port, function() {
    console.log('Listening on port %s', port)
  })
}
