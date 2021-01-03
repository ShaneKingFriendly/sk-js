import Proxy0 from './Proxy0';
import SK from './SK';

export default class Window0 {
  /**
   * the url of page or sub frame page
   *
   * @returns {string}
   */
  static getCurrentHref() {
    if (window && window.location) {
      return window.location.href;
    }
  }

  /**
   * window.location.origin
   *
   * @returns {string}
   */
  static getCurrentOrigin() {
    if (window && window.location) {
      return window.location.origin;
    }
  }

  /**
   * /a/b -> /a/b
   * /a/b/c.html -> /a/b/c
   * /context/a -> /a
   *
   * @returns {string}
   */
  static getCurrentPath() {
    if (window && window.location) {
      let path = window.location.pathname;
      path = path.substring(SK.DEFAULT_CONTEXT_PATH.length, path.length);
      path = Proxy0._.endsWith(path, SK.FILE_TYPE_HTML_WITH_POINT) ? path.substring(0, path.length - 5) : path;
      return path;
    }
  }

  /**
   * ?a=1&b=2
   *
   * @returns {*}
   */
  static getCurrentSearch() {
    if (window && window.location) {
      return window.location.search;
    }
  }

  /**
   * (a,?a=1&b=2) -> 1
   *
   * @param param
   * @param search
   * @returns {*}
   */
  static getRequestParameter(param, search = SK.getCurrentSearch()) {
    return SK.getRequestParameter(param, search);
  }

  /**
   * localStorage
   *
   * @param key
   * @param value
   */
  static local(key, value) {
    if (localStorage) {
      if (arguments.length > 1) {
        localStorage.removeItem(key);
        if (!Proxy0._.isNil(value)) {
          return localStorage.setItem(key, value);
        }
      } else {
        return localStorage.getItem(key);
      }
    }
  }

  /**
   * web redirect
   *
   * @param url
   */
  static redirect(url) {
    if (window && window.location) {
      window.location.href = url;
    }
  }

  /**
   * sessionStorage
   *
   * @param key
   * @param value
   */
  static session(key, value) {
    if (sessionStorage) {
      if (arguments.length > 1) {
        sessionStorage.removeItem(key);
        if (!Proxy0._.isNil(value)) {
          return sessionStorage.setItem(key, value);
        }
      } else {
        return sessionStorage.getItem(key);
      }
    }
  }
}
