# [ShaneKing for JavaScript][]
More to see [shaneking.org][].

## Extensions
- [x] **Array.prototype.skArr(recursive, keyFunc)**: [2,{skIdx0:3,skIdx1:[4,{skIdx0:5,skIdx1:[]}]}] -> [2,[3,[4,[5,[]]]]]
- [x] **Array.prototype.skFilter(recursive, filterFunc)**: filter recursive
- [x] **Array.prototype.skObj(recursive, keyFunc)**: [1,{a:2,b:[3,{c:4,d:[5,{}]}]}] -> {skIdx0:1,skIdx1:{a:2,b:{skIdx0:3,skIdx1:{c:4,d:{skIdx0:5,skIdx1:{}}}}}}
- [x] **Array.prototype.skRmv(item)**: [1,2,3].skRmv(2) -> [1,3]
- [x] **Number.prototype.skCurrencyFmt(fraction)**: (-123456.789).skCurrencyFmt(2) -> '-123,456.79'
- [x] **Object.prototype.skArr(recursive, keyFunc)**: {skIdx0:1,skIdx1:[2,{skIdx0:3,skIdx1:[4,{skIdx0:5,skIdx1:[]}]}]} -> [1,[2,[3,[4,[5,[]]]]]]
- [x] **Object.prototype.skFilter(recursive, filterFunc)**: filter recursive
- [x] **Object.prototype.skObj(recursive, keyFunc)**: {a:2,b:[3,{c:4,d:[5,{}]}]} -> {a:2,b:{skIdx0:3,skIdx1:{c:4,d:{skIdx0:5,skIdx1:{}}}}}
- [x] **Object.prototype.skVal(str, val)**: like $.val()
- [x] **Object.prototype.skVals()**: {a: {x: 1}, b: {y: 2}} -> [{x: 1}, {y: 2}]
- [x] **String.prototype.skBlank()**: ' '.skBlank() -> true, ''.skBlank() -> true
- [x] **String.prototype.skCurrencyFmt(fraction)**: '987654.321'.skCurrencyFmt(2) -> '987,654.32'
- [x] **String.prototype.skEmpty()**: ' '.skEmpty() -> false, ''.skEmpty() -> true
- [x] **String.prototype.skFmt(o)**: 'My $name {is} ${name}, i {am from ${city}'.skFmt({name: 'ShaneKing', city: 'Shanghai'}) -> 'My $name {is} ShaneKing, i {am from Shanghai'
- [x] **String.prototype.skFmtArr(a)**: 'My $name ${is} $1, i am$ from $2'.skFmtArr(['ShaneKing', 'Shanghai']) -> 'My $name ${is} ShaneKing, i am$ from Shanghai'


## Functions
- [x] **SK.$($, initVal, env)**: New or get namespace object. eg. `var $sk = SK.$('$sk', {}, window)`
- [x] **SK.assign()**: Like lodash assign, but deep while object node.
- [x] **SK.s4a(value, defaultValue = [])**: Safe array for value.
- [x] **SK.s4b(value, defaultValue = false)**: Safe boolean for value.
- [x] **SK.s4d(value, defaultValue = new Date())**: Safe date for value.
- [x] **SK.s4n(value, defaultValue = 0)**: Safe finite number for value.
- [x] **SK.s4o(value, defaultValue = {})**: Safe plain object for value.
- [x] **SK.s4s(value, defaultValue = '')**: Safe string for value.

## Naming conventions
- [x] **inner function parameter**: Begin $, like $item
- [x] **inner function variable**: Begin tmp, like tmpVal

## Dependencies
[![][versioneye img]][versioneye]

[![][david img]][david]
[![][davidDev img]][davidDev]
[![][davidPeer img]][davidPeer]

## Build
[![][travis img]][travis]

## Test
[![][codecov img]][codecov]
[![][codacy img]][codacy]

## Release
[![][npmbadge img]][npmbadge]
[![][npmDownloadbadge img]][npmDownloadbadge]

[![][npmDetailBadge img]][npmDetailBadge]

## Discussion
[![][gitter img]][gitter]

## License
[![][license img]][license]

ShaneKing is released under [MIT][].


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


[MIT]: https://opensource.org/licenses/MIT
[license]:LICENSE
[license img]:https://img.shields.io/badge/License-MIT-blue.svg
