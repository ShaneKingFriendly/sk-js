import CryptoJS from 'crypto-js';
import $ from 'jquery';
import Cookies from 'js-cookie';
import md5 from 'js-md5';
import _ from 'lodash';
import moment from 'moment';

export default class Proxy0 {
  static CryptoJS = CryptoJS;
  static $ = $;
  static Cookies = Cookies;
  static md5 = md5;
  static _ = _;
  static moment = moment;

  static $Any = any => $(any);

  static md5Any = any => md5(any);

  static _Any = any => _(any);

  static momentAny = any => moment(any);
}
