import CryptoJS from 'crypto-js';
import $ from 'jquery';
import Cookies from 'js-cookie';
import md5 from 'js-md5';
import _ from 'lodash';
import moment from 'moment';

export default class Proxy0 {
  static CryptoJS = CryptoJS;
  static $ = $;
  static $Any = any => $(any);
  static Cookies = Cookies;
  static md5 = md5;
  static md5Any = any => md5(any);
  static _ = _;
  static _Any = any => _(any);
  static moment = moment;
  static momentAny = any => moment(any);
}
