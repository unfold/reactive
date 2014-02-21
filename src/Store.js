'use strict';

var superagent = require('superagent')

var cache = {}

var Store = module.exports = {
  loadCache: function(data) {
    cache = data
  },

  get: function(key) {
    return cache[key]
  },

  set: function(key, value) {
    if (value !== undefined) {
      cache[key] = value
    } else {
      delete cache[key]
    }
  },

  fetchManifest: function(manifest, callback) {
    var running = true,
        keys = Object.keys(manifest),
        remaining = keys.length

    keys.forEach(function(key) {
      Store.fetch(manifest[key], function(err, data) {
        if (err) {
          running = false

          return callback(err)
        }

        Store.set(key, data)

        if (running && !--remaining) {
          var result = keys.reduce(function(result, key) {
            result[key] = Store.get(key)

            return result
          }, {})

          callback(null, result)
        }
      })
    })
  },

  fetch: function(url, callback) {
    if (typeof url == 'object')  {
      return this.fetchManifest(url, callback)
    } else {
      superagent.get(url, function(err, res) {
        if (err) return callback(err)

        callback(null, res.body)
      })
    }
  },

  toJSON: function() {
    return JSON.stringify(cache)
  }
}
