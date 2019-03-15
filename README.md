# [sk-js][]
JavaScript library by ES6 for ShaneKing, More to see [shaneking.org][].

## Badge
### Dependencies
[![][versioneye img]][versioneye]

[![][david img]][david]
[![][davidDev img]][davidDev]
[![][davidPeer img]][davidPeer]

### Build
[![][travis img]][travis]

### Test
[![][codecov img]][codecov]
[![][codacy img]][codacy]

### Release
[![][npmbadge img]][npmbadge]
[![][npmDownloadbadge img]][npmDownloadbadge]

[![][npmDetailBadge img]][npmDetailBadge]

### Discussion
[![][gitter img]][gitter]

### License
[![][license img]][license]

ShaneKing is released under [Apache-2.0][].


## API
### Codes

```json
{
  "/":{
    "supportedLanguages": [
      {
        "id": "en_US",
        "text": "English"
      },
      {
        "id": "zh_CN",
        "text": "Chinese"
      }
    ]
  }
}
```
| Method | Example | Remark |
| -- | -- | -- |
| `static get(code, path = SK.getCurrentPath())` | `'supportedLanguages'` -> `[{"id": "en_US","text": "English"},{"id": "zh_CN","text": "Chinese"}]` | |
| `static load(path = SK.getCurrentPath(), async = true)` | `'/'` -> `{"supportedLanguages":👆}` | the remote json file like : `Codes.SERVER_URL` + `Codes.PATH_PREFIX` + `Mesgs.PART_OF_HASH_PATH` + `SK.getCurrentLanguage()` + `SK.FILE_TYPE_JSON_WITH_POINT`, default `/json/codes_Hash_en_US.json`, if not exist, then load `/json/codes_en_US.json` |
| `static mesg(key, path = SK.getCurrentPath())` | `supportedLanguages__en_US` -> `English` | |
| `static unload(path)` | | `'/a'` -> will delete /a**/* |

### Color0
| Method | Example | Remark |
| -- | -- | -- |
| `static hexColor(str)` | `ShaneKing` -> `#f27d79` | |

### Crypto0
```java
REF：https://github.com/ShaneKing/org.shaneking.skava/blob/mirror/src/main/java/org/shaneking/skava/crypto/AES.java
```
| Method | Example | Remark |
| -- | -- | -- |
| `static aesDecrypt(cipherText, salt = Crypto0.DEFAULT_SALT, iv = salt.substr(0, salt.length / 2), passPhrase = salt, iterations = salt.length, keySize = (salt.length * 2) / 32)` | `'plainText'` -> `'2SZ/de9I0rvxO7s9wdCohQ=='` | |
| `static aesEncrypt(plainText, salt = Crypto0.DEFAULT_SALT, iv = salt.substr(0, salt.length / 2), passPhrase = salt, iterations = salt.length, keySize = (salt.length * 2) / 32)` | `'2SZ/de9I0rvxO7s9wdCohQ=='` -> `'plainText'` | |

### Mesgs
```json
{
  "/": {
    "$#{field}_is_required": "[$#{field}] is required",
    "Account_No": "Account No.",
    "Password": "Password",
    "Remember_me": "Remember me"
  },
  "/auth": {
    "Log_in": "Log in",
    "register_now_": "register now!"
  }
}
```
| Method | Example | Remark |
| -- | -- | -- |
| `static get(key, path = SK.getCurrentPath())` | `'Account_No'` -> `'Account No.'` | |
| `static gets(keys, path = SK.getCurrentPath())` | `['Remember_me','Password']` or `'Remember_me♀Password'` -> `'Remember me Password'` | |
| `static load(path = SK.getCurrentPath(), async = true)` | `'/auth'` -> `{"Log_in":"Log in","register_now_":"register now!"}` | |
| `static unload(path)` | | `'/a'` -> will delete /a**/* |

### Model
```java
MVC' Model, but like Controller
```
| Method | Example | Remark |
| -- | -- | -- |
| `constructor(freeObject = {}, validator = new Validator())` | | |
| `static object2ModelIds(prefix, modelIds = [], object = {})` | | `('x',[],{a:{b:true,c:false,d:true}})`, modelIds will `['x.a.b','x.a.d']` |
| `static parseSao(sao)` | `('x',[],{a:{b:true,c:false,d:true}})` -> `['x.a.b','x.a.d']` | sao is string[reg], array[string] or object |
| `zzzXX[YYY]Listener(id,[ type,] listener)` | | `XX` is id or reg, `YYY` is Changed or Errored, `zzz` is add or rmv |
| `fireYYYEvent(id, old, current)` | | |
| `fireEvent(evt)` | | |
| `getAllErrors()` | | |
| `getErrors(id)` | | |
| `setErrors(errors = {})` | | |
| `getFreeObject()` | | |
| `setFreeObject(freeObject = {})` | | |
| `getValidator()` | | |
| `hasErrors()` | | |
| ... | ... | ... |
| `skVal(id, value)` | | |
| `addAllValidatorMonitor()` | | |
| `zzzValidatorMonitor(modelId, config)` | | `zzz` is add or rmv |
| `execValidate(ruleKey, modelId, ruleFunc, model, setting)` | | |
| `validate(evt)` | | |
| `validateAll()` | | |

#### freeObject recommend
```json
{
  "req": {
    "enc": "string, encode string, if need, else undefined",
    "pri": {
      "desc1": "pri0, pri1 or pri2 etc",
      "desc2": "search by select component for lst service",
      "desc3": "id for one service"
    },
    "pub": {
      "desc1": "will send to server every request, you can take token ...",
      "desc2": "priEncode: if true, will send enc, for rpc or open api request",
      "desc3": "appName",
      "desc4": "sysName"
    }
  },
  "resp": {
    "pris": {
      "pri0": {
        "ext": {
          "desc1": "will send to server",
          "desc2": "take table pagination, sorter etc",
          "desc3": "createDatetime range"
        },
        "obj": {
          "desc": "this is entity mapping db"
        },
        "rtn": {
          "desc1": "will not send to server",
          "desc2": "received table data, select data"
        }
      },
      "pri1": {}
    },
    "pubs": {
      "codes": {},
      "pub0": {
        "desc": "mapping pris.pri0, use by component auto generate"
      },
      "pub1": {}
    }
  }
}
```

### Polyfill
| Method | Example | Remark |
| -- | -- | -- |
| `Array.prototype.skFilter(recursive, filterFunc)` | | |
| `Array.prototype.skRmv(item)` | `[1,2,3].skRmv(2)` -> `[1,3]` | |
| `Array.prototype.skToggle(item)` | `[1,2,3].skToggle(2)` -> `[1,3]`, `[1,3].skToggle(2)` -> `[1,2,3]` | |
| `Array.prototype.skTrans(recursive, transFunc)` | | |
| `Number.prototype.skCurrencyFmt(fraction)` | `(-123456.789).skCurrencyFmt(2)` -> `'-123,456.79'` | |
| `Object.prototype.skFilter(recursive, filterFunc)` | | |
| `Object.prototype.skTrans(recursive, transFunc)` | | |
| `Object.prototype.skVal(str, val)` | | like `$.val()` |
| `Object.prototype.skVals()` | `{a: {x: 1}, b: {y: 2}}.skVals()` -> `[{x: 1}, {y: 2}]` | |
| `String.prototype.skBlank()` | `' '.skBlank()` -> `true`, `''.skBlank()` -> `true` | |
| `String.prototype.skCurrencyFmt(fraction)` | `'987654.321'.skCurrencyFmt(2)` -> `'987,654.32'` | |
| `String.prototype.skEmpty()` | `' '.skEmpty()` -> `false`, `''.skEmpty()` -> `true` | |
| `String.prototype.skFmt(o)` | `'My $name {is} $#{name}, i {am from $#{city}'.skFmt({name: 'ShaneKing', city: 'China'})` -> `'My $name {is} ShaneKing, i {am from China'` | |
| `String.prototype.skFmtArr(array)` | `'My $name $#{is} $1, i am$ from $2'.skFmtArr(['ShaneKing', 'China'])` -> `'My $name $#{is} ShaneKing, i am$ from China'` | |

### Proxy0


### Resp
| Method | Example | Remark |
| -- | -- | -- |
| `constructor(respJsonData)` | | build Resp by response json data |

#### recommend
```json
{
  "data":"business object, like Model.freeObject",
  "done":"true: No Unknown Exception; false: has Unknown Exception",
  "mesg":"type of RespMesg"
}
```

### RespMesg
| Method | Example | Remark |
| -- | -- | -- |
| `constructor(mesg)` | | build message by response json data |
| `getMessage()` | | get message |
| `getType()` | | get message type |

#### recommend
```json
{
  "args":"Array: Mesgs.get(this.code).skFmtArr(this.args); PlainObject: Mesgs.get(this.code).skFmt(this.args); undefined: code is message",
  "code":"code or message",
  "type":"Success: just prompt; Info: just prompt; Warning: business continue, but must prompt; Error: Unknown Exception(done == false), UI will prompt details; Business Stop(done == true), process by component"
}
```

### SK
| Method | Example | Remark |
| -- | -- | -- |
| `static $($ = SK.DEFAULT_DOMAIN, initVal = {}, env = SK.DEFAULT_ENV)` | | New or get namespace object. eg. `var $sk = SK.$('$sk', {}, window)` |
| `static appendParameter(url, param, value)` | `('/a','b','c')` -> `'/a?b=c'` | |
| `static arePlainObject(...values)` | | |
| `static assign(object, ...objects)` | | Like lodash assign, but deep while object node. |
| `static cookies(key, value)` | | set/get cookie, delete key when value is null or undefined |
| `static descartes(array = [], anotherArray = [], concat = SK.CHAR_DASH)` | `(['alert','btn'],['success','info'])` -> `['alert-success','alert-info','btn-success','btn-info']` | |
| `static emptyFunc()` | | |
| `static extend()` | | |
| `static getCurrentHref()` | | |
| `static getCurrentLanguage()` | | |
| `static getCurrentOrigin()` | | |
| `static getCurrentPath()` | `/a/b -> /a/b`, `/a/b/c.html -> /a/b/c`, `/context/a -> /a` | |
| `static getCurrentSearch()` | | like `?a=1&b=2` |
| `static getRequestParameter(param, search)` | `(a,?a=1&b=2)` -> `1` | |
| `static getSubPaths(path)` | `/a/b` -> `['/','/a/','/a/b/']` | |
| `static getValidPath(path)` | `a/b/c` -> `/a/b/c/` | |
| `static local(key, value)` | | set/get localStorage, delete key when value is null or undefined |
| `static redirect(url)` | | |
| `static s4a(value, defaultValue = [])` | | Safe array for value |
| `static s4b(value, defaultValue = false)` | | Safe boolean for value |
| `static s4d(value, defaultValue = new Date())` | | Safe date for value |
| `static s4n(value, defaultValue = 0)` | | Safe finite number for value |
| `static s4o(value, defaultValue = {})` | | Safe plain object for value |
| `static s4s(value, defaultValue = SK.CHAR_EMPTY)` | | Safe string for value |
| `static session(key, value)` | | set/get sessionStorage, delete key when value is null or undefined |
| `static strMapping(str = SK.uuid().toLowerCase().replace(/-/g, SK.CHAR_EMPTY), dstSet = SK.SET_ARY_L62, srcSet = SK.SET_ARY_HEX)` | | |
| `static upperWordsFirstChar(words)` | `'xi nAn shi you xUe yuan china people'` -> `'Xi NAn Shi You XUe Yuan China People'` | |
| `static uuid()` | `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX` | |
| `static uuidShort(uuid = SK.uuid(), dstSet = SK.SET_ARY_L62)` | | max length 22 |

### SKEntity
base entity for every entity, contain useful id, ext and audit columns, createUserId, createDatetime, lastModifyUserId, lastModifyDatetime, invalid, invalidUserId, invalidDatetime

### SKL10nEntity
for internationalization system, contain time zone info, createTimezone, lastModifyTimezone, invalidTimezone

### SKRefEntity
friendly common resource, like attachment, contain refId, refType

### Validator
```javascript
  /**
   * MVC'V（Validator）
   * 
   * @param modelIds
   * 
   * {
   *   "id1": {
   *     "deps": "dependencies: option, can be string[reg], string array or object",
   *     "func": "custom rule by function",
   *     "rule1": {
   *       "field": "x.xx.xxx, this is i18n mesg for required rule"
   *     },
   *     "rule2": {
   *       "exec": "enable function"
   *     }
   *   }
   * @param rules
   */
```
| Method | Example | Remark |
| -- | -- | -- |
| `constructor(modelIds = {}, rules = {})` | | |
| `getModelIds()` | | |
| `getRules()` | | |


[sk-js]: https://github.com/ShaneKing/sk-js
[shaneking.org]: http://shaneking.org/

[versioneye]:https://www.versioneye.com/user/projects/56fa049335630e003e0a8ab9
[versioneye img]:https://www.versioneye.com/user/projects/56fa049335630e003e0a8ab9/badge.svg
[david]:https://david-dm.org/ShaneKing/sk-js
[david img]:https://david-dm.org/ShaneKing/sk-js.svg
[davidDev]:https://david-dm.org/ShaneKing/sk-js#info=devDependencies
[davidDev img]:https://david-dm.org/ShaneKing/sk-js/dev-status.svg
[davidPeer]:https://david-dm.org/ShaneKing/sk-js#info=peerDependencies
[davidPeer img]:https://david-dm.org/ShaneKing/sk-js/peer-status.svg

[travis]:https://travis-ci.org/ShaneKing/sk-js
[travis img]:https://travis-ci.org/ShaneKing/sk-js.png

[codecov]:https://codecov.io/github/ShaneKing/sk-js?branch=mirror
[codecov img]:https://codecov.io/github/ShaneKing/sk-js/coverage.svg?branch=mirror
[codacy]:https://www.codacy.com/app/ShaneKing/sk-js
[codacy img]:https://api.codacy.com/project/badge/grade/b3e08d356b334765939b1c77b5360a3f
[saucelabs]:https://saucelabs.com/u/ShaneKing
[saucelabs img]:https://saucelabs.com/browser-matrix/ShaneKing.svg

[npmbadge]:https://www.npmjs.com/package/sk-js
[npmbadge img]:https://img.shields.io/npm/v/sk-js.svg
[npmDownloadbadge]:https://www.npmjs.com/package/sk-js
[npmDownloadbadge img]:http://img.shields.io/npm/dm/sk-js.svg
[npmDetailBadge]:https://www.npmjs.com/package/sk-js
[npmDetailBadge img]:https://nodei.co/npm/sk-js.png?downloads=true&downloadRank=true&stars=true

[gitter]:https://gitter.im/ShaneKing/sk-js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[gitter img]:https://badges.gitter.im/Join%20Chat.svg

[Apache-2.0]: https://opensource.org/licenses/Apache-2.0
[license]:LICENSE
[license img]:https://img.shields.io/badge/License-Apache--2.0-blue.svg
