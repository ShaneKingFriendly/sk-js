import Proxy0 from './Proxy0';
import SK from './SK';

export default class Window0 {
  /**
   * the url of page or sub frame page
   *
   * @returns {string}
   */
  static getCurrentHref() {
    return window.location.href;
  }

  /**
   * window.location.origin
   *
   * @returns {string}
   */
  static getCurrentOrigin() {
    return window.location.origin;
  }

  /**
   * /a/b -> /a/b
   * /a/b/c.html -> /a/b/c
   * /context/a -> /a
   *
   * @returns {string}
   */
  static getCurrentPath() {
    let path = window.location.pathname;
    path = path.substring(SK.DEFAULT_CONTEXT_PATH.length, path.length);
    path = Proxy0._.endsWith(path, SK.FILE_TYPE_HTML_WITH_POINT) ? path.substring(0, path.length - 5) : path;
    return path;
  }

  /**
   * ?a=1&b=2
   *
   * @returns {*}
   */
  static getCurrentSearch() {
    return window.location.search;
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
    if (arguments.length > 1) {
      localStorage.removeItem(key);
      if (!Proxy0._.isNil(value)) {
        return localStorage.setItem(key, value);
      }
    } else {
      return localStorage.getItem(key);
    }
  }

  /**
   * web redirect
   *
   * @param url
   */
  static redirect(url) {
    window.location.href = url;
  }

  /**
   * sessionStorage
   *
   * @param key
   * @param value
   */
  static session(key, value) {
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
