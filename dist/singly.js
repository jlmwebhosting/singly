// Generated by CoffeeScript 1.4.0
(function() {
  var apiKey, cookie, getParam, request, singly, tok;

  cookie = require('cookie');

  request = require('superagent');

  getParam = function(param) {
    var match, re, url;
    url = window.location.hash;
    re = new RegExp("#" + param + "=([^&]+)(&|$)");
    match = url.match(re);
    if (!((match != null) && (match[1] != null))) {
      return;
    }
    return match[1];
  };

  apiKey = null;

  singly = {
    base: "https://api.singly.com",
    cookieName: "singly_access_token",
    redirectOnSucess: true,
    setKey: function(key) {
      return apiKey = key;
    },
    token: function() {
      return cookie(singly.cookieName);
    },
    clearToken: function() {
      cookie(singly.cookieName, null);
      return singly;
    },
    setToken: function(val, expiration) {
      if (expiration == null) {
        expiration = 30;
      }
      cookie(singly.cookieName, {
        maxage: expiration * 86400000
      });
      return singly;
    },
    authorize: function(service, cburl) {
      var uri;
      if (cburl == null) {
        cburl = window.location.origin;
      }
      uri = "" + singly.base + "/oauth/authorize?client_id=" + appKey + "&service=" + service + "&redirect_uri=" + cburl + "&scope=email&response_type=token";
      window.location.href = uri;
      return singly;
    },
    makeRequest: function(path, opt, type, cb) {
      var req, uri;
      if (opt == null) {
        opt = {};
      }
      if (typeof opt === 'function' && !cb) {
        cb = opt;
        opt = {};
      }
      uri = "" + singly.base + path;
      req = request.type('json').query(opt.qs).query({
        access_token: singly.token()
      });
      req[type](uri);
      if (type === 'post' || type === 'put') {
        req.send(opt.data);
      }
      req.end(cb);
      return req;
    },
    get: function(path, opt, cb) {
      return singly.makeRequest(path, opt, 'get', cb);
    },
    post: function(path, opt, cb) {
      return singly.makeRequest(path, opt, 'post', cb);
    },
    put: function(path, opt, cb) {
      return singly.makeRequest(path, opt, 'put', cb);
    },
    del: function(path, opt, cb) {
      return singly.makeRequest(path, opt, 'del', cb);
    }
  };

  tok = getParam("access_token");

  if (tok != null) {
    singly.setToken(tok);
    if (singly.redirectOnSucess) {
      window.location.href = "/";
    }
  }

  module.exports = singly;

}).call(this);