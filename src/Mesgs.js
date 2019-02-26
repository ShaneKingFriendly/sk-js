import $ from 'jquery';
import _ from 'lodash';
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
      if (!_.isNil(tmpRtn)) {
        rtn = tmpRtn;
        break;
      }
    }
    return rtn;
  }

  static gets(keys, path = SK.getCurrentPath()) {
    const keyArray = _.isArray(keys) ? keys : keys.split(SK.CHAR_FEMALE);
    const sep = SK.LANGUAGE_zh_CN === SK.getCurrentLanguage() ? SK.EMPTY : SK.CHAR_BLANK;
    return keyArray.map((key) => {
      return Mesgs.get(key, path)
    }).join(sep);
  }

  static getSubPaths(path, justUnExisted) {
    return justUnExisted ? _.difference(SK.getSubPaths(path), Object.keys(Mesgs.mesg)) : SK.getSubPaths(path);
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
      } else if (_.endsWith(path, SK.CHAR_SLASH)) {
        pathObjects[existPath + (_.startsWith(path, SK.CHAR_SLASH) ? path : (SK.CHAR_SLASH + path))] = jsonObject[path];
      } else if (_.startsWith(path, SK.CHAR_SLASH)) {
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
      return $.when(Mesgs.mesg[path]);
    } else if ($.isEmptyObject(Mesgs.hash)) {
      const $Deferred = $.Deferred();
      Mesgs.loadHash(async).done(() => {
        Mesgs.load(path, async).always(() => {
          $Deferred.resolve();
        });
      }).fail(() => {
        Mesgs.hash.env = SK.ENV_DEV;
        $.ajax({
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
      return $.when(...Mesgs.getSubPaths(path, true).filter(validPath => {
        return Mesgs.hash[validPath];
      }).map(validPath => {
        return $.ajax({
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
    return $.ajax({
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
      return _.startsWith(existPath, path);
    }).forEach(existPath => {
      delete Mesgs.mesg[existPath];
    });
  }
}
