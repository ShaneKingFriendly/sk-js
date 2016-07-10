# [ShaneKing for JavaScript][]
More to see [shaneking.org][].

## Functions
- [x] **SK.extend()**: Like jQuery extend, but replace array node
- [x] **SK.$(context, $)**: New namespace, eg. `var $sk = SK.$(window, '$sk')`
- [x] **SK.a(array)**: Always return valid Array, if invalid return empty array
- [x] **SK.b(boolean)**: Just true return true, other return false
- [x] **SK.d(date, defaultDate)**: Always return valid Date, if invalid return defaultDate or new Date()
- [x] **SK.isNullOrUndefined(value)**: UnInput
- [x] **SK.n(number, defaultNumber)**: Can be to Number than return value of number, other return 0
- [x] **SK.o(object)**: Always return plain Object, if invalid return empty object
- [x] **SK.s(string, defaultString)**: Return the String of input
- [x] **SK.noConflict()**: Return previous owner

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
