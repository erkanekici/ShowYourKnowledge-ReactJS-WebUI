import numeral from 'numeral'
import { format, isValid, parse } from 'date-fns'
import tr from '../locale/date-fns/tr'
import { get, sortBy } from 'lodash-es'
import { UI_DATE_FORMAT, SERVICE_DATE_FORMAT } from './enums'

const upperCase = (value = '') => {
 const letters = { i: 'İ', ş: 'Ş', ğ: 'Ğ', ü: 'Ü', ö: 'Ö', ç: 'Ç', ı: 'I' }
 const str = value.replace(/(([iışğüçö]))/g, letter => {
  return letters[letter]
 })
 return str.toUpperCase()
}

const toLower = (value = '') => {
 const letters = { İ: 'i', I: 'ı', Ş: 'ş', Ğ: 'ğ', Ü: 'ü', Ö: 'ö', Ç: 'ç' }
 const str = value.replace(/(([İIŞĞÜÇÖ]))/g, letter => {
  return letters[letter]
 })
 return str.toLowerCase()
}

export const toUpperCase = (value = '') => {
 return String.prototype.toLocaleUpperCase
  ? value.toLocaleUpperCase('TR')
  : upperCase(value)
}

export const toLowerCase = (value = '') => {
 return String.prototype.toLocaleLowerCase
  ? value.toLocaleLowerCase('TR')
  : toLower(value)
}

const formatMoneyTR = (value) => {
 if(value.length > 3){
  if(value.substring(value.length-3).indexOf(".") !== -1){
   if(value.length>6){
    return value.replace(".",",").replace(",",".")
   }else{
    return value.replace(".",",")
   }
  }
 }

 return value.replace(",",".").replace(",",".").replace(",",".").replace(",",".")
}

export const formatMoney = (value = 0) => formatMoneyTR(numeral(value).format('0[.]0,'))

export const formatRate = (value = 0) => `%${numeral(value).format('0[.]00')}`

export const formatDate = value => {
 const date = parse(value.toString(), SERVICE_DATE_FORMAT, new Date())
 return isValid(date) ? format(date, UI_DATE_FORMAT, { locale: tr }) : value
}

export const generatePrmData = (list = []) => {
 let currentPrmName = ''
 return list.reduce((acc, item) => {
  if (item.prmName) {
   currentPrmName = item.prmName
   acc[currentPrmName] = []
  } else if (currentPrmName) {
   acc[currentPrmName].push(item)
  }

  return acc
 }, {})
}

export const localeSortBy = (list, path) => {
 return String.prototype.localeCompare
  ? list.sort((a, b) => get(a, path, '').localeCompare(get(b, path, '')))
  : sortBy(list, path)
}