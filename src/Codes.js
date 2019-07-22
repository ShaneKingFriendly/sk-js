import Mesgs from './Mesgs';
import Proxy0 from './Proxy0';
import SK from './SK';

export default class Codes {
  static code = {};
  static hash = {};//current language hash

  static PATH_PREFIX = '/json/codes';
  static SERVER_URL = '';

  static get(code, path = '/') {
    const validPath = SK.getValidPath(path);
    const validPaths = Codes.getSubPaths(validPath, false);
    for (let i = 0; i < validPaths.length; i += 1) {
      const validPathsCode0 = Codes.code[validPaths[i]];
      if (validPathsCode0) {
        const validPathsCodes = SK.s4a(validPathsCode0.skVal(code));
        if (validPathsCodes.length !== 0) {
          return validPathsCodes;
        }
      }
    }
    return [];
  }

  static getSubPaths(path, justUnExisted) {
    return justUnExisted ? Proxy0._.difference(SK.getSubPaths(path), Object.keys(Codes.code)) : SK.getSubPaths(path);
  }

  static load(path = '/', async = true) {
    path = SK.getValidPath(path);
    if (Codes.code[path]) {
      return Proxy0.$.when(Codes.code[path]);
    } else if (Proxy0.$.isEmptyObject(Codes.hash)) {
      const deferred = Proxy0.$.Deferred();
      Codes.loadHash(async).done(() => {
        Codes.load(path, async).always(() => {
          deferred.resolve();
        });
      }).fail(() => {
        Proxy0.$.ajax({
          async,
          cache: false,
          dataType: SK.FILE_TYPE_JSON,
          method: SK.REQUEST_METHOD_GET,
          url: Codes.SERVER_URL + Codes.PATH_PREFIX + SK.CHAR_UNDERLINE + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT,
        }).done(resp => {
          Mesgs.jsonNodeParser(resp, SK.CHAR_EMPTY, Codes.code);
          Object.keys(Codes.code).forEach((item) => {
            Codes.loadMesg(Codes.code[item]);
          });
        }).always(() => {
          deferred.resolve();
        });
      });
      return deferred;
    } else {
      return Proxy0.$.when(...Codes.getSubPaths(path, true).filter(validPath => {
        return Codes.hash[validPath];
      }).map(validPath => {
        return Proxy0.$.ajax({
          async,
          cache: true,
          dataType: SK.FILE_TYPE_JSON,
          method: SK.REQUEST_METHOD_GET,
          url: Codes.SERVER_URL + Codes.PATH_PREFIX + validPath + Codes.hash[validPath] + SK.CHAR_UNDERLINE + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT,
        }).done(resp => {
          Codes.code[validPath] = resp;
          Codes.loadMesg(Codes.code[validPath]);
        });
      }));
    }
  }

  static loadHash(async = true) {
    return Proxy0.$.ajax({
      async,
      cache: false,
      dataType: SK.FILE_TYPE_JSON,
      method: SK.REQUEST_METHOD_GET,
      url: Codes.SERVER_URL + Codes.PATH_PREFIX + Mesgs.PART_OF_HASH_PATH + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT,
    }).done(resp => {
      Codes.hash = resp;
    });
  }

  static loadMesg(pathObject) {
    Object.keys(pathObject).forEach((key) => {
      if (Proxy0._.isArray(pathObject[key])) {
        pathObject[key].forEach((item) => {
          pathObject[key + SK.CHAR_UNDERLINE_DOUBLE + item.id] = item.text ? item.text : item.label;
        });
      }
    });
  }

  static mesg(key, path = '/') {
    const validPath = SK.getValidPath(path);
    const validPaths = Mesgs.getSubPaths(validPath, false);
    let rtn = SK.s4s(key);
    for (let i = 0; i < validPaths.length; i += 1) {
      const tmpRtn = SK.s4o(Codes.code[validPaths[i]]).skVal(key);
      if (!Proxy0._.isNil(tmpRtn)) {
        rtn = tmpRtn;
        break;
      }
    }
    return rtn;
  }

  static unload(path) {
    Object.keys(Codes.code).filter(existPath => {
      return Proxy0._.startsWith(existPath, path);
    }).forEach(existPath => {
      delete Codes.code[existPath];
    });
  }
}
