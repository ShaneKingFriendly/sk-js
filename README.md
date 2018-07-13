# [ShaneKing for JavaScript][]
More to see [shaneking.org][].

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


## Directory conventions
### Codes
```json
{
  "/":{
    "supported_languages": [
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
- **get(code, path)**: 'supported_languages' -> [{"id": "en_US","text": "English"},{"id": "zh_CN","text": "Chinese"}]
- **load(path)**: '/' -> {"supported_languages":👆}
- **loadHash()**: gulp-sk-i18n plugin can split by path, like codes_Hash_en_US.json contain {"/":"22abc1fb"} -> 22abc1fb_en_US.json
- **unload(path)**: '/a' -> will delete /a**/*

### Crypto
```java
REF：https://github.com/ShaneKing/org.shaneking.skava/blob/mirror/src/main/java/org/shaneking/skava/crypto/AES.java
```
- **aesDecrypt(cipherText, salt, iv, passPhrase, iterations, keySize)**: 'plainText' -> '2SZ/de9I0rvxO7s9wdCohQ=='
- **aesEncrypt(plainText, salt, iv, passPhrase, iterations, keySize)**: '2SZ/de9I0rvxO7s9wdCohQ==' -> 'plainText'

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
- **get(key, path)**: 'Account_No' -> 'Account No.'
- **load(path)**: '/auth' -> {"Log_in":"Log in","register_now_":"register now!"}
- **loadHash()**: gulp-sk-i18n plugin can split by path, like mesgs_Hash_en_US.json contain {"/auth/":"34d85247"} -> /auth/34d85247_en_US.json
- **unload(path)**: '/a' -> will delete /a**/*

### Model
```java
MVC'M
```
- **constructor(freeObject, validator)**: PlainObject & Validator
- **XXXListener**: listener on model
- **fireXXXEvent**: fire event
- **XXXError**: operation error message
- **skVal(id, value)**: get/set values will fireEvent
- **XXXValidatorXXXMonitor**: monitor on model for validate
- **validateXXX**: exec validates

### Polyfill
- **Array.prototype.skArr(recursive, keyFunc)**: [2,{skIdx0:3,skIdx1:[4,{skIdx0:5,skIdx1:[]}]}] -> [2,[3,[4,[5,[]]]]]
- **Array.prototype.skFilter(recursive, filterFunc)**: filter recursive
- **Array.prototype.skObj(recursive, keyFunc)**: [1,{a:2,b:[3,{c:4,d:[5,{}]}]}] -> {skIdx0:1,skIdx1:{a:2,b:{skIdx0:3,skIdx1:{c:4,d:{skIdx0:5,skIdx1:{}}}}}}
- **Array.prototype.skRmv(item)**: [1,2,3].skRmv(2) -> [1,3]
- **Array.prototype.skToggle(item)**: [1,2,3].skToggle(2) -> [1,3], [1,3].skToggle(2) -> [1,2,3]
- **Number.prototype.skCurrencyFmt(fraction)**: (-123456.789).skCurrencyFmt(2) -> '-123,456.79'
- **Object.prototype.skArr(recursive, keyFunc)**: {skIdx0:1,skIdx1:[2,{skIdx0:3,skIdx1:[4,{skIdx0:5,skIdx1:[]}]}]} -> [1,[2,[3,[4,[5,[]]]]]]
- **Object.prototype.skFilter(recursive, filterFunc)**: filter recursive
- **Object.prototype.skObj(recursive, keyFunc)**: {a:2,b:[3,{c:4,d:[5,{}]}]} -> {a:2,b:{skIdx0:3,skIdx1:{c:4,d:{skIdx0:5,skIdx1:{}}}}}
- **Object.prototype.skVal(str, val)**: like $.val()
- **Object.prototype.skVals()**: {a: {x: 1}, b: {y: 2}} -> [{x: 1}, {y: 2}]
- **String.prototype.skBlank()**: ' '.skBlank() -> true, ''.skBlank() -> true
- **String.prototype.skCurrencyFmt(fraction)**: '987654.321'.skCurrencyFmt(2) -> '987,654.32'
- **String.prototype.skEmpty()**: ' '.skEmpty() -> false, ''.skEmpty() -> true
- **String.prototype.skFmt(o)**: 'My $name {is} $#{name}, i {am from $#{city}'.skFmt({name: 'ShaneKing', city: 'China'}) -> 'My $name {is} ShaneKing, i {am from China'
- **String.prototype.skFmtArr(a)**: 'My $name $#{is} $1, i am$ from $2'.skFmtArr(['ShaneKing', 'China']) -> 'My $name $#{is} ShaneKing, i am$ from China'

### Resp
- **constructor(respJsonData)**: build Resp by response json data

### RespMesg
- **constructor(mesg)**: build message by response json data
- **getMessage()**: get message
- **getType()**: get Message Type

### SK
- **$($, initVal, env)**: New or get namespace object. eg. `var $sk = SK.$('$sk', {}, window)`
- **appendParameter(url, param, value)**: ('/a','b','c') -> /a?b=c
- **arePlainObject(...values)**: 
- **assign(object, ...objects)**: Like lodash assign, but deep while object node.
- **cookies(key, value)**: need send to server every times
- **descartes(array, anotherArray, concat)**: (['alert','btn'],['success','info']) -> ['alert-success','alert-info','btn-success','btn-info']
- **getCurrentHref()**: window.location.href
- **getCurrentLanguage()**: get/set from cookies
- **getCurrentOrigin()**: window.location.origin
- **getCurrentPath()**: /a/b/c.html -> /a/b/c
- **getCurrentSearch()**: ?a=1&b=2
- **getRequestParameter(param, search)**: (a,?a=1&b=2) -> 1
- **getSubPaths(path)**: /a/b -> ['/','/a/','/a/b/']
- **getValidPath(path)**: a/b/c -> /a/b/c/
- **local(key, value)**: for the moment, no use scenario
- **redirect(url)**: window.location.href = url
- **s4a(value, defaultValue = [])**: Safe array for value.
- **s4b(value, defaultValue = false)**: Safe boolean for value.
- **s4d(value, defaultValue = new Date())**: Safe date for value.
- **s4n(value, defaultValue = 0)**: Safe finite number for value.
- **s4o(value, defaultValue = {})**: Safe plain object for value.
- **s4s(value, defaultValue = '')**: Safe string for value.
- **session(key, value)**: need reload every new use
- **upperWordsFirstChar(words)**: 'xi nAn shi you xUe yuan china people' -> 'Xi NAn Shi You XUe Yuan China People'

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
- **constructor(modelIds = {}, rules = {})**: 
- **getModelIds()**: √
- **getRules()**: 


[ShaneKing for JavaScript]: http://shaneking.org/c/sk-js
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
