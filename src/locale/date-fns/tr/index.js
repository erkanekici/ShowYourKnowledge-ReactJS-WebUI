import formatDistance from './_lib/formatDistance/index.js'
import formatLong from './_lib/formatLong/index.js'
import formatRelative from './_lib/formatRelative/index.js'
import localize from './_lib/localize/index.js'
import match from './_lib/match/index.js'

/**
* @type {Locale}
* @category Locales
* @summary Turkish locale.
* @language Turkish
* @iso-639-2 tur
* @author Berkay Sargın [@berkaey]{@link https://github.com/berkaey}
*/
var locale = {
 formatDistance: formatDistance,
 formatLong: formatLong,
 formatRelative: formatRelative,
 localize: localize,
 match: match,
 options: {
  weekStartsOn: 1 /* Monday */,
  firstWeekContainsDate: 1
 }
}

export default locale