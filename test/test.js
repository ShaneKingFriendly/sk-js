
var simple = require('../src/sk');
var expect = require('expect.js');

describe("simple", function(){
  it("should return true", function(){
    expect(simple.$sk.inValid({})).to.equal(true);
  });
  it("should return false", function(){
    expect(simple.$sk.inValid(null)).to.equal(false);
  });
});
