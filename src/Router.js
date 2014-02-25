'use strict';

var urlPattern = require('url-pattern')

var Dashboard = require('./Dashboard'),
    Products = require('./Products'),
    Product = require('./Product')

module.exports = {
  routes: [
    {path: '/', handler: Dashboard},
    {path: '/products', handler: Products},
    {path: '/products/:productId', handler: Product},
    {path: '/products/:productId/:variantId', handler: Product},
    {path: '*', handler: Dashboard}
  ],

  recognizePath: function(path) {
    var routes = this.routes

    for (var i = 0, l = routes.length; i < l; i++) {
      var route = routes[i],
          pattern = urlPattern(route.path),
          params = pattern.match(path)

      if (params) {
        return {
          path: path,
          params: params,
          handler: route.handler
        }
      }
    }
  }
}
