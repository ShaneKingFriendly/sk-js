import Mesgs from '../src/Mesgs';

describe('Mesgs', () => {
  describe('hash', () => {
    it('hash', () => {
      expect(Mesgs.hash).toEqual({});
    });
  });
  describe('mesg', () => {
    it('mesg', () => {
      expect(Mesgs.mesg).toEqual({});
    });
  });
  describe('PART_OF_HASH_PATH', () => {
    it('PART_OF_HASH_PATH', () => {
      expect(Mesgs.PART_OF_HASH_PATH).toEqual('_Hash_');
    });
  });
  describe('PATH_PREFIX', () => {
    it('PATH_PREFIX', () => {
      expect(Mesgs.PATH_PREFIX).toEqual('/json/mesgs');
    });
  });
  describe('SERVER_URL', () => {
    it('SERVER_URL', () => {
      expect(Mesgs.SERVER_URL).toEqual('');
    });
  });
});


