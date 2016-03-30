
var $sk = require('../src/sk')(global, require('jsface'), require('jquery')(global));
var expect = require('expect.js');

describe("1", function(){
  describe("a", function(){
    it("array return array", function(){
      expect($sk.a([])).to.equal([]);
    });
    it("unarray return array", function(){
      expect($sk.a(null)).to.equal([]);
    });
  });
  describe("b", function(){
    it("true return true", function(){
      expect($sk.b(true)).to.equal(true);
      expect($sk.b("true")).to.equal(true);
    });
    it("other return false", function(){
      expect($sk.b("b")).to.equal(false);
    });
  });
  describe("d", function(){
    it("date return date", function(){
      var date = new Date();
      expect($sk.d(date)).to.equal(date);
    });
    it("should return false", function(){
      expect($sk.d("Invalid Date")).to.equal(new Date());
    });
  });
  describe("n", function(){
    it("number return number", function(){
      expect($sk.n("1")).to.equal(1);
    });
    it("other return zero", function(){
      expect($sk.n("n")).to.equal(0);
    });
  });
  describe("o", function(){
    it("object return object", function(){
      expect($sk.o({})).to.equal({});
    });
    it("other return object", function(){
      expect($sk.o("o")).to.equal({});
    });
  });
  describe("s", function(){
    it("string return string", function(){
      expect($sk.s("s")).to.equal("s");
    });
    it("other return empty", function(){
      expect($sk.s(undefined)).to.equal("");
    });
  });

});
