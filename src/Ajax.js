import $ from 'jquery';
import _ from 'lodash';
import NProgress from 'nprogress';
import Model from './Model';
import SK from './SK';

export default class Ajax {
  static METHOD = {
    DELETE: SK.REQUEST_METHOD_DELETE,
    GET: SK.REQUEST_METHOD_GET,
    POST: SK.REQUEST_METHOD_POST,
    PUT: SK.REQUEST_METHOD_PUT
  };
  static CURRENT_PROGRESS_COUNT = 0;
  static CURRENT_SYNC_COUNT = 0;

  static CONTENT_JSON_UTF_8 = 'application/json; charset=UTF-8';

  static getDefaultSettings() {
    return {
      contentType: Ajax.CONTENT_JSON_UTF_8,
      dataType: SK.FILE_TYPE_JSON,
      // processData: false,
      // traditional: true,
      needStringify: true,
      progress: true,//sk extend jquery
      async: true//sk extend jquery
    }
  }

  static doAjax(settings) {
    if (settings.progress) {
      if (Ajax.CURRENT_PROGRESS_COUNT === 0) {
        NProgress.start();
      }
      Ajax.CURRENT_PROGRESS_COUNT++;
    }
    if (!settings.async) {
      if (Ajax.CURRENT_SYNC_COUNT === 0) {
        if (SK.$(Model.PROP_SYS) instanceof Model) {
          SK.$(Model.PROP_SYS).skVal('ui.spinning', true);
        }
      }
      Ajax.CURRENT_SYNC_COUNT++;
    }
    settings.data = settings.data && settings.needStringify ? JSON.stringify(settings.data) : settings.data;
    try {
      return $.ajax(settings).done((data, textStatus, jqXHR) => {
        if(_.isFunction(settings.doneFunc)){
          settings.doneFunc(data, textStatus, jqXHR);
        }
      }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(jqXHR);
        console.error(textStatus);
        console.error(errorThrown);
        if(_.isFunction(settings.failFunc)){
          settings.failFunc(jqXHR, textStatus, errorThrown);
        }
      }).always(() => {
        if (settings.progress) {
          Ajax.CURRENT_PROGRESS_COUNT--;
          if (Ajax.CURRENT_PROGRESS_COUNT === 0) {
            NProgress.done();
          } else {
            NProgress.inc();
          }
        }
        if (!settings.async) {
          Ajax.CURRENT_SYNC_COUNT--;
          if (Ajax.CURRENT_SYNC_COUNT === 0) {
            if (SK.$(Model.PROP_SYS) instanceof Model) {
              SK.$(Model.PROP_SYS).skVal('ui.spinning', false);
            }
          }
        }
      });
    } catch (exception) {
      console.error(exception);
    }
  }

  static doDelete(url, data = {}, options = {}) {
    return Ajax.doAjax(SK.assign({}, Ajax.getDefaultSettings(), {url: url}, {data: data}, {method: Ajax.METHOD.DELETE}, options));
  }

  static doGet(url, data = {}, options = {}) {
    return Ajax.doAjax(SK.assign({}, Ajax.getDefaultSettings(), {url: url}, {data: data}, {method: Ajax.METHOD.GET}, options));
  }

  static doPost(url, data = {}, options = {}) {
    return Ajax.doAjax(SK.assign({}, Ajax.getDefaultSettings(), {url: url}, {data: data}, {method: Ajax.METHOD.POST}, options));
  }

  static doPut(url, data = {}, options = {}) {
    return Ajax.doAjax(SK.assign({}, Ajax.getDefaultSettings(), {url: url}, {data: data}, {method: Ajax.METHOD.PUT}, options));
  }
}
