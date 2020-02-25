import { get, set, isObject, isEmpty, isFunction } from 'lodash-es'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
import isMobilePhone from 'validator/lib/isMobilePhone'

const Validation = {
 messages: {
  required: '*Bu alanın doldurulması zorunludur.',
  email: '*Lütfen geçerli bir e-posta adresi giriniz.',
  TCKN: '*Lütfen geçerli bir TCKN giriniz.',
  phone: '*Lütfen geçerli bir Telefon Numarası giriniz.',
  // date: 'Lütfen geçerli bir tarih giriniz.',
  // remote: 'Lütfen bu alanı düzeltin.',
  // url: 'Lütfen geçerli bir web adresi (URL) giriniz.',
  // dateISO: 'Lütfen geçerli bir tarih giriniz(ISO formatında)',
  // number: 'Lütfen geçerli bir sayı giriniz.',
  // digits: 'Lütfen sadece sayısal karakterler giriniz.',
  // creditcard: 'Lütfen geçerli bir kredi kartı giriniz.',
  // equalTo: 'Lütfen aynı değeri tekrar giriniz.',
  // extension: 'Lütfen geçerli uzantıya sahip bir değer giriniz.',
  // maxlength: (...args) => {
  //  return `Lütfen en fazla ${args[0]} karakter uzunluğunda bir değer giriniz.`
  // },
  minlength: (...args) => {
   return `*Lütfen en az ${args[0]} karakter uzunluğunda bir değer giriniz.`
  },
  // rangelength: (...args) =>`Lütfen en az ${args[0]} ve en fazla ${args[1]} uzunluğunda bir değer giriniz.`,
  // range: (...args) => {
  //  return `Lütfen ${args[0]} ile ${args[1]} arasında bir değer giriniz.`
  // },
  // max: (...args) => {
  //  return `Lütfen ${args[0]} değerine eşit ya da daha küçük bir değer giriniz.`
  // },
  // min: (...args) => {
  //  return `Lütfen ${args[0]} değerine eşit ya da daha büyük bir değer giriniz.`
  // },
  // require_from_group: (...args) => {
  //  return `Lütfen bu alanların en az ${args[0]} tanesini doldurunuz.`
  // }
 },
 methods: {
  required(value, [invalidateFalse = false] = []) {
   if (isObject(value) && isEmpty(value)) {
    return false
   }

   // incase a field considers `false` as an empty value like checkboxes.
   if (value === false && invalidateFalse) {
    return false
   }

   if (value === undefined || value === null) {
    return false
   }

   return !!String(value).trim().length
  },
  TCKN(value = '') {
   value = value.toString()
   const isEleven = /^[0-9]{11}$/.test(value)
   let totalX = 0
   for (let i = 0; i < 10; i++) {
    totalX += Number(value.substr(i, 1))
   }
   // eslint-disable-next-line
   const isRuleX = totalX % 10 == value.substr(10, 1)
   let totalY1 = 0
   let totalY2 = 0
   for (let i = 0; i < 10; i += 2) {
    totalY1 += Number(value.substr(i, 1))
   }
   for (let i = 1; i < 10; i += 2) {
    totalY2 += Number(value.substr(i, 1))
   }
   // eslint-disable-next-line
   const isRuleY = (totalY1 * 7 - totalY2) % 10 == value.substr(9, 0)
   return isEleven && isRuleX && isRuleY
  },
  email: isEmail,
  phone: (val, [locale = 'tr-TR', options] = []) => {
   return isMobilePhone(val, locale, options)
  },
  minlength: (value = '', [min]) => {
   return isLength(value, { min })
  }
 }
}

export function Validate(rules) {
 const valueKeys = Object.keys(rules)

 return async (values, keysShouldPassed = {}) => {
  let errors = {}
  await valueKeys.reduce(async (acc, key) => {
   if (keysShouldPassed[key]) return acc

   await new Promise(resolve => {
    for (const rule in rules[key]) {
     const value = get(values, key)
     const method = Validation.methods[rule]
     const ruleArgs = isObject(rules[key][rule]) ? rules[key][rule] : []
 
     if (!method(value, ruleArgs)) {
      const message = typeof rules[key][rule] === 'string' ? rules[key][rule] : Validation.messages[rule]
      set(errors, key, isFunction(message) ? message(...ruleArgs) : message)
      resolve(message)
      break
     }
    }

    resolve()
   })

   return acc
  }, Promise.resolve)

  if (!isEmpty(errors)) throw errors
  return errors
 }
}