'use strict';

var superagent = require('superagent')

var data = {}

var Store = module.exports = {
  get: function(key) {
    if (typeof key == 'object') {
      return Store.getManifest(key)
    } else {
      return Store.getKey(key)
    }
  },

  set: function(key, value) {
    if (typeof key == 'object') {
      Store.setObject(key)
    } else if (value !== undefined) {
      data[key] = value
    } else {
      delete data[key]
    }
  },

  fetch: function(url, callback) {
    if (typeof url == 'object')  {
      return Store.fetchManifest(url, callback)
    } else {
      return Store.fetchUrl(url, callback)
    }
  },

  getManifest: function(manifest) {
    var result

    for (var key in manifest) {
      var value = Store.get(key)

      if (value !== undefined) {
        if (!result) result = {}

        result[key] = value
      }
    }

    return result
  },

  getKey: function(key) {
    return data[key]
  },

  setObject: function(data) {
    for (var key in data) {
      Store.set(key, key[data])
    }
  },

  fetchManifest: function(manifest, callback) {
    var pending = []

    for (var key in manifest) {
      pending.push(key)
    }

    var remaining = pending.length,
        running = true

    pending.forEach(function(key) {
      Store.fetch(manifest[key], function(err, data) {
        if (!running) return
        if (err) return callback(err)

        Store.set(key, data)

        if (!--remaining) callback(null, Store.getManifest(manifest))
      })
    })
  },

  fetchUrl: function(url, callback) {
    return superagent.get(url, function(err, res) {
      if (err) return callback(err)

      callback(null, res.body)
    })
  },

  loadCache: function(cache) {
    data = cache
  },

  clearCache: function() {
    data = {}
  },

  toJSON: function() {
    return JSON.stringify(data)
  }
}
