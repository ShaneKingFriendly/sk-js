import $ from 'jquery';
import _ from 'lodash';
import SK from './SK';
import Mesgs from './Mesgs';

export default class Codes {
  static codes = {};
  static hash = {};//current language hash

  static PATH_PREFIX = '/json/codes';
  static SERVER_URL = '';

  static get(code, path) {
    let validPath = SK.getValidPath(path ? path : SK.getCurrentPath());
    let validPaths = Codes.getSubPaths(validPath, false);
    for (let i = 0; i < validPaths.length; i++) {
      let validPathsCode0 = Codes.codes[validPaths[i]];
      if (validPathsCode0) {
        let validPathsCodes = SK.s4a(validPathsCode0.skVal(code));
        if (validPathsCodes.length !== 0) {
          return validPathsCodes;
        }
      }
    }
    return [];
  }

  static getSubPaths(path, justUnExisted) {
    return justUnExisted ? _.difference(SK.getSubPaths(path), Object.keys(Codes.codes)) : SK.getSubPaths(path);
  }

  static load(path) {
    if (Codes.codes[path]) {
      return $.when(Codes.codes[path]);
    } else {
      if ($.isEmptyObject(Codes.hash)) {
        let deferred = $.Deferred();
        Codes.loadHash().done(() => {
          Codes.load(path).always(() => {
            deferred.resolve();
          });
        }).fail(() => {
          Codes.hash.env = SK.ENV_DEV;
          $.ajax({
            cache: false,
            dataType: SK.FILE_TYPE_JSON,
            method: SK.REQUEST_METHOD_GET,
            url: SK.CONTEXT_PATH + Codes.PATH_PREFIX + SK.CHAR_UNDERLINE + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT
          }).done($resp => {
            Mesgs.jsonNodeParser($resp, SK.EMPTY, Codes.codes);
          }).always(() => {
            deferred.resolve();
          });
        });
        return deferred;
      } else {
        return $.when.apply($, Codes.getSubPaths(path, true).filter(validPath => {
          return Codes.hash[validPath];
        }).map(validPath => {
          return $.ajax({
            cache: true,
            dataType: SK.FILE_TYPE_JSON,
            method: SK.REQUEST_METHOD_GET,
            url: SK.CONTEXT_PATH + Codes.PATH_PREFIX + validPath + Codes.hash[validPath] + SK.CHAR_UNDERLINE + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT
          }).done($resp => {
            Codes.codes[validPath] = $resp;
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
      url: Codes.SERVER_URL + Codes.PATH_PREFIX + Mesgs.PART_OF_HASH_PATH + SK.getCurrentLanguage() + SK.FILE_TYPE_JSON_WITH_POINT
    }).done($resp => {
      Codes.hash = $resp;
    });
  }

  static unload(path) {
    if (Object.keys(Codes.codes).filter($existPath => {
        return $existPath.indexOf(path) !== -1;
      }).length === 1) {
      delete Codes.codes[path];
    }
  }
}
