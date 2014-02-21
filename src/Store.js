'use strict';

var superagent = require('superagent')

var Store = module.exports = function(data) {
  this.data = data || {}
}

Store.prototype.get = function(key, value) {
  if (typeof key == 'object') {
    return this.getManifest(key)
  } else {
    return this.getKey(key)
  }
}

Store.prototype.set = function(key, value) {
  if (typeof key == 'object') {
    this.setObject(key)
  } else if (value !== undefined) {
    this.data[key] = value
  } else {
    delete this.data[key]
  }
}

Store.prototype.fetch = function(url, callback) {
  if (typeof url == 'object')  {
    return this.fetchManifest(url, callback)
  } else {
    return this.fetchUrl(url, callback)
  }
}

Store.prototype.getManifest = function(manifest) {
  var result

  for (var key in manifest) {
    var value = this.get(key)

    if (value !== undefined) {
      if (!result) result = {}

      result[key] = value
    }
  }

  return result
}

Store.prototype.getKey = function(key) {
  return this.data[key]
}

Store.prototype.setObject = function(data) {
  for (var key in data) {
    this.set(key, key[data])
  }
}

Store.prototype.fetchManifest = function(manifest, callback) {
  var store = this,
      pending = []

  for (var key in manifest) {
    pending.push(key)
  }

  var remaining = pending.length,
      running = true

  pending.forEach(function(key) {
    store.fetch(manifest[key], function(err, data) {
      if (!running) return
      if (err) return callback(err)

      store.set(key, data)

      if (!--remaining) callback(null, store.getManifest(manifest))
    })
  })
}

Store.prototype.fetchUrl = function(url, callback) {
  return superagent.get(url, function(err, res) {
    if (err) return callback(err)

    callback(null, res.body)
  })
}

Store.prototype.loadCache = function(data) {
  this.data = data
}

Store.prototype.clearCache = function() {
  this.data = {}
}

Store.prototype.toJSON = function() {
  return JSON.stringify(this.data)
}
