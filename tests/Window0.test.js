import Window0 from '../src/Window0';

let JSDOM = require('jsdom').JSDOM;
global.document = new JSDOM('<html></html>', { url: 'http://shaneking.org/', includeNodeLocations: true });
global.window = document.window;

function propagateToGlobal(window) {
  for (var key in window) {
    if (!window.hasOwnProperty(key)) {
      continue;
    }
    if (key in global) {
      continue;
    }
    global[key] = window[key];
  }
}

propagateToGlobal(window);

describe('Window0', () => {
  describe('getCurrentHref', () => {
    it('getCurrentHref', () => {
      expect(Window0.getCurrentHref()).toEqual('http://localhost/');
    });
  });
  describe('getCurrentOrigin', () => {
    it('getCurrentOrigin', () => {
      expect(Window0.getCurrentOrigin()).toEqual('http://localhost');
    });
  });
  describe('getCurrentPath', () => {
    it('getCurrentPath', () => {
      expect(Window0.getCurrentPath()).toEqual('/');
    });
  });
  describe('getCurrentSearch', () => {
    it('getCurrentSearch', () => {
      expect(Window0.getCurrentSearch()).toEqual('');
    });
  });
  describe('local', () => {
    it('setter getter', () => {
      Window0.local('a', 1);
      expect(Window0.local('a')).toEqual('1');
    });
  });
  describe('redirect', () => {
    it('redirect', () => {
      expect(Window0.redirect('/a')).toEqual(undefined);
    });
  });
  describe('session', () => {
    it('setter getter', () => {
      Window0.session('a', 1);
      expect(Window0.session('a')).toEqual('1');
    });
  });
});


