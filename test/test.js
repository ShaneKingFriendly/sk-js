'use strict';

var jsdom = require('jsdom').jsdom;
global.document = jsdom('<html></html>', {});
global.window = document.defaultView;
propagateToGlobal(window);

function propagateToGlobal (window) {
  for (var key in window) {
    if (!window.hasOwnProperty(key))
      continue;
    if (key in global)
      continue;

    global[key] = window[key];
  }
}
global.jQuery = global.$ = require('jquery');
global.jsface = require('jsface');

var $sk = require('../src/sk')(window, jsface, jQuery);
var assert = require('assert');

describe("1", function(){
  var badValueArray = [null,undefined,NaN,"Invalid Date"];
  describe("a", function(){
    it("array return array", function(){
      assert.equal($sk.a(['a',1,'b',2]),['a',1,'b',2]);
    });
    it("unarray return array", function(){
      badValueArray.forEach(function (element, index, array) {
        assert.equal($sk.a(element),[]);
      });
    });
  });
  describe("b", function(){
    it("true return true", function(){
      assert.equal($sk.b(true),true);
    });
    it("other return false", function(){
      assert.equal($sk.b("true"),false);
      assert.equal($sk.b("false"),false);
      assert.equal($sk.b("everything"),false);
      assert.equal($sk.b(""),false);
      badValueArray.forEach(function (element, index, array) {
        assert.equal($sk.b(element),false);
      });
    });
  });
  describe("d", function(){
    var date = new Date();
    it("date return date", function(){
      assert.equal($sk.d(date), date);
    });
    it("should return false", function(){
      badValueArray.forEach(function (element, index, array) {
        assert.equal($sk.d(element, date), date);
      });
    });
  });
  describe("n", function(){
    it("number return number", function(){
      assert.equal($sk.n("1"),1);
    });
    it("other return zero", function(){
      badValueArray.forEach(function (element, index, array) {
        assert.equal($sk.n(element),0);
      });
    });
  });
  describe("o", function(){
    it("object return object", function(){
      assert.equal($sk.o({a:1,b:2}),{a:1,b:2});
    });
    it("other return object", function(){
      badValueArray.forEach(function (element, index, array) {
        assert.equal($sk.o(element),{});
      });
    });
  });
  describe("s", function(){
    it("string return string", function(){
      assert.equal($sk.s("s"),"s");
    });
    it("other return empty", function(){
      assert.equal($sk.s(null),"null");
      assert.equal($sk.s(undefined),"undefined");
      assert.equal($sk.s(NaN),"NaN");
    });
  });

});
