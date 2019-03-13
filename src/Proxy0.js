import CryptoJS from 'crypto-js';
import $ from 'jquery';
import Cookies from 'js-cookie';
import md5 from 'js-md5';
import _ from 'lodash';

export default class Proxy0 {
  static CryptoJS = CryptoJS;
  static $ = $;
  static $any = any => $(any);
  static Cookies = Cookies;
  static md5 = md5;
  static md5Any = any => md5(any);
  static _ = _;
}
