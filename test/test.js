
var $sk = require('../src/sk')(global, require('jsface'), require('jquery'));
var expect = require('expect.js');

describe("1", function(){
  describe("a", function(){
    it("should return true", function(){
      expect($sk.a([])).to.equal(true);
    });
    it("should return false", function(){
      expect($sk.a(null)).to.equal(false);
    });
  });
  describe("b", function(){
    it("should return true", function(){
      expect($sk.b(false)).to.equal(true);
      expect($sk.b("false")).to.equal(false);
    });
    it("should return false", function(){
      expect($sk.b("b")).to.equal(false);
    });
  });
  describe("d", function(){
    it("should return true", function(){
      expect($sk.d(new Date())).to.equal(true);
    });
    it("should return false", function(){
      expect($sk.d("Invalid Date")).to.equal(false);
    });
  });
  describe("n", function(){
    it("should return true", function(){
      expect($sk.n("1")).to.equal(true);
    });
    it("should return false", function(){
      expect($sk.n("n")).to.equal(false);
    });
  });
  describe("o", function(){
    it("should return true", function(){
      expect($sk.o({})).to.equal(true);
    });
    it("should return false", function(){
      expect($sk.o("o")).to.equal(false);
    });
  });
  describe("s", function(){
    it("should return true", function(){
      expect($sk.s("s")).to.equal(true);
    });
    it("should return false", function(){
      expect($sk.s(undefined)).to.equal(false);
    });
  });
  
});
