export const SUCCESS_WAIT_TIME = 1000 * 10 // ten seconds

export const APPROVAL_REJECTED_STATUS_CODE = '0'
export const APPROVAL_ACCEPTED_STATUS_CODE = '1'

// Mevcut müşteri olma durumu;
export const AVAILABLE_CUSTOMER = '1'
// Mevcut müşteri olma durumu;
export const NEW_CUSTOMER = '0'

/*
 İletişim izni zorunlu/opsiyonel mi?
  [1]: Hiç ekran gösterilmeyecek.
  [2]: Ekranda gösterilecek ve iletişim kanalı seçilmesi zorunlu olacak.
  [3]: Ekranda gösterilecek ve iletişim kanalı seçimi opsiyonel olacak.
*/
export const ContactPermissions = {
 NOT_NECESSARY: '1',
 SHOWS_SECTION_REQUIRED_CONTACT_CHANNEL: '2',
 SHOWS_SECTION_OPTIONAL_CONTACT_CHANNEL: '3'
}

export const SERVICE_SUCCESS_CODE = '1'

export const SERVICE_DATE_FORMAT = 'yyyyMMdd'
export const UI_DATE_FORMAT = 'dd.MM.yyyy'

export const FIBAKEY_CHECK_CORRECT_CODE = '1'
export const FIBAKEY_CHECK_WRONG_CODE = '0'
export const FIBAKEY_CHECK_LIMIT = 5
export const FIBAKEY_CHECK_LIMIT_MESSAGE =
 'Fiba anahtarınızı günlük yanlış girme limitinizi aştınız. <br/> Lütfen daha sonra tekrar deneyiniz.'

export const PrmDataProperties = {
 // bunun ilk sırada olması önemli
 DISTRICT: {
  value1: 'DISTRICTCODE',
  value2: 'DISTRICT',
  value3: 'REGIONCODE',
  prmName: 'PRM_CUST_DISTRICT'
 },
 REGION: {
  value1: 'REGIONCODE',
  value2: 'REGION',
  prmName: 'PRM_CUST_REGION'
 },
 WORKING_TYPE: {
  value2: 'DURUMADI',
  prmName: 'PRM_MUS_CALISMADURUMU',
  value1: 'DURUMKODU'
 },
 PROFESSION: {
  value2: 'MESLEKADI',
  prmName: 'PRM_MESLEK',
  value1: 'MESLEKKODU'
 },
 EDUCATION_STATE: {
  value2: 'ASAMAADI',
  prmName: 'PRM_MUS_OKULASAMA',
  value1: 'ASAMAKODU'
 },
 HOME_STATE: {
  value2: 'IKAMETGAHADI',
  prmName: 'PRM_MUS_IKAMETGAHBILGISI',
  value1: 'IKAMETGAHKODU'
 }
}