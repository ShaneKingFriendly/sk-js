import Codes from '../src/Codes';

describe('Codes', () => {
  describe('code', () => {
    it('code', () => {
      expect(Codes.code).toEqual({});
    });
  });
  describe('hash', () => {
    it('hash', () => {
      expect(Codes.hash).toEqual({});
    });
  });
  describe('PATH_PREFIX', () => {
    it('PATH_PREFIX', () => {
      expect(Codes.PATH_PREFIX).toEqual('/json/codes');
    });
  });
  describe('SERVER_URL', () => {
    it('SERVER_URL', () => {
      expect(Codes.SERVER_URL).toEqual('');
    });
  });
});


