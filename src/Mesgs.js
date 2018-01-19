import $ from 'jquery';
import _ from 'lodash';
import SK from './SK';

export default class Mesgs {
  static hash = {};//current language hash
  static mesg = {};//all

  static PART_OF_HASH_PATH = '_Hash_';
  static PATH_PREFIX = '/json/mesg';
  static RESP_MSG_KEY_PREFIX = 'Resp.';
  static SERVER_URL = '';

  static get(key, path) {
    let validPath = SK.getValidPath(path ? path : SK.getCurrentPath());
    let validPaths = Mesgs.getSubPaths(validPath, false);
    let rtn = SK.s4s(key);
    for (let i = 0; i < validPaths.length; i++) {
      let tmpRtn = SK.s4o(Mesgs.mesg[validPaths[i]]).skVal(key);
      if (!_.isNil(tmpRtn)) {
        rtn = tmpRtn;
        break;
      }
    }
    return rtn;
  }

  static getResp(key, path) {
    let tmpKey = Mesgs.RESP_MSG_KEY_PREFIX + key;
    let rtn = Mesgs.get(tmpKey, path);
    if (rtn === tmpKey) {
      rtn = Mesgs.get(key, path);
    }
    return rtn;
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
    let pathObject = {};
    Object.keys(jsonObject).forEach($path => {
      if ($path === SK.CHAR_SLASH) {
        let rootObject = jsonObject[$path];
        Object.keys(rootObject).forEach(key => {
          pathObject[key] = rootObject[key];
        });
      } else if (_.endsWith($path, SK.CHAR_SLASH)) {
        pathObjects[existPath + (_.startsWith($path, SK.CHAR_SLASH) ? $path : (SK.CHAR_SLASH + $path))] = jsonObject[$path];
      } else if (_.startsWith($path, SK.CHAR_SLASH)) {
        Mesgs.jsonNodeParser(jsonObject[$path], existPath + $path, pathObjects);
      } else {
        pathObject[$path] = jsonObject[$path];
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
   * @returns {*} Promise
   */
  static load(path) {
    if (Mesgs.mesg[path]) {
      return $.when(Mesgs.mesg[path]);
    } else {
      if ($.isEmptyObject(Mesgs.hash)) {
        let $Deferred = $.Deferred();
        Mesgs.loadHash().done(() => {
          Mesgs.load(path).always(() => {
            $Deferred.resolve();
          });
        }).fail(() => {
          Mesgs.hash.env = SK.ENV_DEV;
          $.ajax({
            cache: false,
            dataType: SK.FILE_TYPE_JSON,
            method: SK.REQUEST_METHOD_GET,
            url: SK.CONTEXT_PATH + Mesgs.PATH_PREFIX + SK.CHAR_UNDERLINE + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT
          }).done($resp => {
            Mesgs.jsonNodeParser($resp, SK.EMPTY, Mesgs.mesg);
          }).always(() => {
            $Deferred.resolve();
          });
        });
        return $Deferred;
      } else {
        return $.when.apply($, Mesgs.getSubPaths(path, true).filter(validPath => {
          return Mesgs.hash[validPath];
        }).map(validPath => {
          return $.ajax({
            cache: true,
            dataType: SK.FILE_TYPE_JSON,
            method: SK.REQUEST_METHOD_GET,
            url: SK.CONTEXT_PATH + Mesgs.PATH_PREFIX + validPath + Mesgs.hash[validPath] + SK.CHAR_UNDERLINE + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT
          }).done($resp => {
            Mesgs.mesg[validPath] = $resp;
          });
        }));
      }
    }
  }

  static loadHash() {
    return $.ajax({
      cache: false,
      dataType: SK.FILE_TYPE_JSON,
      method: SK.REQUEST_METHOD_GET,
      url: Mesgs.SERVER_URL + Mesgs.PATH_PREFIX + Mesgs.PART_OF_HASH_PATH + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT
    }).done($resp => {
      Mesgs.hash = $resp;
    });
  }

  static unload(path) {
    if (Object.keys(Mesgs.mesg).filter($existPath => {
        return $existPath.indexOf(path) !== -1;
      }).length === 1) {
      delete Mesgs.mesg[path];
    }
  }
}
