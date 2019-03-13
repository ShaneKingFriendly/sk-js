import Proxy0 from './Proxy0';
import SK from './SK';

export default class Mesgs {
  static hash = {};//current language hash
  static mesg = {};//all

  static PART_OF_HASH_PATH = '_Hash_';
  static PATH_PREFIX = '/json/mesgs';
  static SERVER_URL = '';

  static get(key, path = SK.getCurrentPath()) {
    const validPath = SK.getValidPath(path);
    const validPaths = Mesgs.getSubPaths(validPath, false);
    let rtn = SK.s4s(key);
    for (let i = 0; i < validPaths.length; i += 1) {
      const tmpRtn = SK.s4o(Mesgs.mesg[validPaths[i]]).skVal(key);
      if (!Proxy0._.isNil(tmpRtn)) {
        rtn = tmpRtn;
        break;
      }
    }
    return rtn;
  }

  static gets(keys, path = SK.getCurrentPath()) {
    const keyArray = Proxy0._.isArray(keys) ? keys : keys.split(SK.CHAR_FEMALE);
    const sep = SK.LANGUAGE_zh_CN === SK.getCurrentLanguage() ? SK.CHAR_EMPTY : SK.CHAR_BLANK;
    return keyArray.map((key) => {
      return Mesgs.get(key, path)
    }).join(sep);
  }

  static getSubPaths(path, justUnExisted) {
    return justUnExisted ? Proxy0._.difference(SK.getSubPaths(path), Object.keys(Mesgs.mesg)) : SK.getSubPaths(path);
  }

  /**
   *
   * @param jsonObject
   * @param existPath '' or '/path'
   * @param pathObjects
   */
  static jsonNodeParser(jsonObject, existPath, pathObjects) {
    const pathObject = {};
    Object.keys(jsonObject).forEach(path => {
      if (path === SK.CHAR_SLASH) {
        const rootObject = jsonObject[path];
        Object.keys(rootObject).forEach(key => {
          pathObject[key] = rootObject[key];
        });
      } else if (Proxy0._.endsWith(path, SK.CHAR_SLASH)) {
        pathObjects[existPath + (Proxy0._.startsWith(path, SK.CHAR_SLASH) ? path : (SK.CHAR_SLASH + path))] = jsonObject[path];
      } else if (Proxy0._.startsWith(path, SK.CHAR_SLASH)) {
        Mesgs.jsonNodeParser(jsonObject[path], existPath + path, pathObjects);
      } else {
        pathObject[path] = jsonObject[path];
      }
    });
    // if (Object.keys(pathObject).length > 0) {
    //   pathObjects[existPath + SK.STR_OF_CHAR_SLASH] = pathObject;
    // }
    //Always generate path
    pathObjects[existPath + SK.CHAR_SLASH] = pathObject;
  }

  /**
   *
   * @param path
   * @param async
   * @returns {*} Promise
   */
  static load(path = SK.getCurrentPath(), async = true) {
    path = SK.getValidPath(path);
    if (Mesgs.mesg[path]) {
      return Proxy0.$.when(Mesgs.mesg[path]);
    } else if (Proxy0.$.isEmptyObject(Mesgs.hash)) {
      const $Deferred = Proxy0.$.Deferred();
      Mesgs.loadHash(async).done(() => {
        Mesgs.load(path, async).always(() => {
          $Deferred.resolve();
        });
      }).fail(() => {
        Mesgs.hash.env = SK.ENV_DEV;
        Proxy0.$.ajax({
          async,
          cache: false,
          dataType: SK.FILE_TYPE_JSON,
          method: SK.REQUEST_METHOD_GET,
          url: Mesgs.SERVER_URL + Mesgs.PATH_PREFIX + SK.CHAR_UNDERLINE + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT,
        }).done(resp => {
          Mesgs.jsonNodeParser(resp, SK.CHAR_EMPTY, Mesgs.mesg);
        }).always(() => {
          $Deferred.resolve();
        });
      });
      return $Deferred;
    } else {
      return Proxy0.$.when(...Mesgs.getSubPaths(path, true).filter(validPath => {
        return Mesgs.hash[validPath];
      }).map(validPath => {
        return Proxy0.$.ajax({
          async,
          cache: true,
          dataType: SK.FILE_TYPE_JSON,
          method: SK.REQUEST_METHOD_GET,
          url: Mesgs.SERVER_URL + Mesgs.PATH_PREFIX + validPath + Mesgs.hash[validPath] + SK.CHAR_UNDERLINE + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT,
        }).done(resp => {
          Mesgs.mesg[validPath] = resp;
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
      url: Mesgs.SERVER_URL + Mesgs.PATH_PREFIX + Mesgs.PART_OF_HASH_PATH + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT,
    }).done(resp => {
      Mesgs.hash = resp;
    });
  }

  static unload(path) {
    Object.keys(Mesgs.mesg).filter(existPath => {
      return Proxy0._.startsWith(existPath, path);
    }).forEach(existPath => {
      delete Mesgs.mesg[existPath];
    });
  }
}
