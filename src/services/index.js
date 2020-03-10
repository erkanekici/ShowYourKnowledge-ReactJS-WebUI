import { trim, toString } from 'lodash-es'
import http, { serviceStep1, serviceINSTANTCredit } from './http'
import { SERVICE_SUCCESS_CODE} from '../utils/enums'

const globalServiceHandler = ({ data = {} }) => {
 const {
  resultCode,  
  ...payload
 } = data
 
 if (resultCode != null && trim(toString(resultCode)) !== SERVICE_SUCCESS_CODE) {
  const errorMessage = trim(payload.errorMessage) 
  
  //throw new Error(JSON.stringify(errorMessage))
  throw new Error(errorMessage)
 }

//  if (data.approvalStatus === APPROVAL_REJECTED_STATUS_CODE) {
//   throw new Error(JSON.stringify({ errorMessage, payload }))
//  }
 return Promise.resolve(payload)
}

export async function Login({
 transactionId = null,
 email = null, 
 password = null, 
 captcha = null
} = {}) {
 return serviceStep1
  .post('Login', {
   transactionId,
   email,
   password,   
   captcha
  })
  .then(globalServiceHandler)
}

export async function Register({
  transactionId = null,
  email = null, 
  password = null,  
  captcha = null
 } = {}) {
  return serviceStep1
   .post('Register', {
    transactionId,
    email,
    password,    
    captcha
   })
   .then(globalServiceHandler)
 }

 export async function GetTopic({
  transactionId = null,
  email = null  
 } = {}) {
  return serviceStep1
   .post('GetTopic', {
    transactionId,
    email    
   })
   .then(globalServiceHandler)
 }

 export async function GetGameStatus({
  transactionId = null,
  topicId = null  
 } = {}) {
  return serviceStep1
   .post('GetGameStatus', {
    transactionId,
    topicId    
   })
   .then(globalServiceHandler)
 }

// OTP Doğrulama ve Skorlama
// Web Servis Adı: ValidateOTPCreateApp
// Fonksiyon: "Devam Et" butonuna basıldığında, müşterinin ekrana girdiği OTP ile cep telefonuna gönderilen OTP'nin doğruluğu karşılaştırılır.
// Doğru ise ön skorlama yapılarak başvuru yaratılır.
// Output	Parametre	Açıklama
// Output -> otpResult -> OTP Karşılaştırma Sonucu
// Output -> successUrl -> Başarılı URL
// Output -> failUrl -> Başarısız URL
// Output -> approvalStatus -> Skorlama Sonucu
// Output -> explanation -> Skorlama Sonucu Açıklama
// Output -> applicationNo -> Oluşan Başvuru Numarası
// Output -> resultCode -> Sonuç Kodu
// Output -> resultExplanation -> Sonuç Açıklaması
export async function ValidateOTP({
 transactionId = null, // İşleme ait tekil numara
 channelCode = null, // Dış Sistem Kanal Kodu
 companyCode = null, // Kurum Kodu
 nationalIdentityNo = null, // TCKN
 mobileNumber = null, // Cep Telefonu
 otp = null, // Ekrana Girilen OTP
 email = null, // Ekrana Girilen E-posta
 basketAmount = null, // Sepet Tutarı
 referenceCode = null, // Referans Kod-1
 adkOid = null, // Referans Kod-2
 orderId = null, // Sipariş Numarası
 productTable = [] // Sepetteki Ürünler
} = {}) {
 return serviceStep1
  .post('ValidateOTPCreateApp', {
   transactionId,
   channelCode,
   companyCode,
   nationalIdentityNo,
   mobileNumber,
   otp,
   email,
   basketAmount,
   referenceCode,
   adkOid,
   orderId,
   productTable
  })
  .then(globalServiceHandler)
}

// Ön Skorlama sonucunda Önerilen Ürün Listesi
// Web Servis Adı: OfferProductList
// Fonksiyon: Ön skorlama sonucuna göre önerilen ürün listesini döner.
// Output	Parametre	Açıklama
// Output -> Liste<productCode> --> Ürün Kodu
// Output -> Liste<productName> --> Ürün ismi
// Output -> Liste<term> --> Taksit Numarası
// Output -> Liste<installmentAmount> --> Taksit Tutarı
// Output -> Liste<totalPaymentAmount> --> Toplam Geri Ödeme Tutarı
// Output -> Liste<insuranceAmount> --> Sigorta prim tutarı
// Output -> Liste<creditInterest> --> Faiz oranı
// Output -> resultCode --> Sonuç Kodu
// Output -> resultExplanation --> Sonuç Açıklaması
export async function OfferProductList({
 transactionId = null, // İşleme ait tekil numara
 applicationNo = null // Başvuru no
} = {}) {
 return serviceStep1
  .post('OfferProductList', {
   transactionId,
   applicationNo
  })
  .then(globalServiceHandler)
}

//Genel Ödeme Planı Simülasyonu
// Web Servis Adı: GetPaymentPlan
// Fonksiyon: Sepet tutarına, seçilen ürüne ve ilk taksit tarihine göre ödeme planını oluşturur.
// Output	Parametre	Açıklama
// Output -> commissionAmount --> Komisyon tutarı
// Output -> term --> Vade
// Output -> installmentAmount --> Taksit tutarı
// Output -> paymentTotalAmaount --> Toplam Geri ödeme tutarı
// Output -> Liste<installmentNumber> --> Taksit Numarası
// Output -> Liste<installmentDate> --> Taksit Tarihi
// Output -> Liste<installmentAmount> --> Taksit Tutarı
// Output -> Liste<totalPaymentAmount> --> Toplam Ödeme Tutarı
// Output -> Liste<principalAmount> --> Anapara
// Output -> Liste<interestAmount> --> Faiz Tutarı
// Output -> Liste<kkdf> --> KKDF
// Output -> Liste<bsmv> --> BSMV
// Output -> Liste<remainingPrincipalAmount> --> Kalan Anapara
// Output -> approvalStatus -> Skorlama Sonucu
// Output -> explanation -> Skorlama Sonucu Açıklama
// Output -> resultCode -> Sonuç Kodu
// Output -> resultExplanation -> Sonuç Açıklaması
export async function GetPaymentPlan({
 transactionId = null, // İşleme ait tekil numara
 channelCode = null, // channelCode --> Dış Sistem Kanal Kodu
 companyCode = null, // companyCode --> Kurum Kodu
 productCode = null, // productCode --> Ürün Kodu
 term = null, // term --> Vade
 basketAmount = null, // basketAmount --> Sepet Tutarı
 limit = null, // limit --> Kredi Tutarı
 firstPaymentDate = null // firstPaymentDate --> İlk Taksit Tarihi (Default: O)
} = {}) {
 return serviceStep1
  .post('GetPaymentPlan', {
   transactionId,
   channelCode,
   companyCode,
   productCode,
   term,
   basketAmount,
   limit,
   firstPaymentDate
  })
  .then(globalServiceHandler)
}

// Yeni Müşteri Bilgilerini Kaydet
// Web Servis Adı: SaveApplicationInformationAll
// Fonksiyon: Müşterinin ekrandan girdiği bilgiler Banka sistemine kaydedilir ve 2. Skorlama yapılır.
// Output	Parametre	Açıklama
// Output -> limit --> Onaylanan Limit
// Output -> expireDate --> Limit Geçerlilik Tarihi
// Output -> isAvailableCustomer --> Mevcut Müşteri Mi?
// Output -> resultCode --> Sonuç Kodu
// Output -> resultExplanation --> Sonuç Açıklaması
export async function SaveApplicationInformation({
 transactionId = null, // İşleme ait tekil numara
 applicationNo = null, // Başvuru Numarası
 educationState = null, // Öğrenim Durumu
 homeState = null, // İkamet Tipi
 workingType = null, // Çalışma Şekli
 riskySectorCode = null, // Çalışma Şekli
 profession = null, // Meslek
 workPlaceName = null, // İş Yeri Adı
 orderId = null, // Sipariş Numarası
 email = null, // E-Posta
 term = null, // Seçilen Vade
 productCode = null, // Seçilen ürün kodu
 basketAmount = null, // Sepet Tutarı
 telephone = [
  // fieldCode: Telefon Alan Kodu
  // telephoneNo: Telefon No
  // telephoneType: Telefon Tipi
  // countryCode: Telefon Ülke Kodu
 ],
 addressTable = [
  // address: Adres
  // addressType: Adres Tipi
  // region: Adres İl
  // district: Adres İlçe
  // residenceStatus: Adres İkamet Tipi
 ]
} = {}) {
 return serviceStep1
  .post('SaveApplicationInformationAll', {
   transactionId,
   applicationNo,
   educationState,
   homeState,
   workingType,
   riskySectorCode,
   profession,
   workPlaceName,
   orderId,
   email,
   term,
   productCode,
   basketAmount,
   telephone,
   addressTable
  })
  .then(globalServiceHandler)
}

// Mevcut Müşteri Bilgilerini Kaydet
// Web Servis Adı: SaveApplicationProduct
// Fonksiyon: Müşterinin ekrandan girdiği bilgiler Banka sistemine kaydedilir ve 2. Skorlama yapılır.
// Output	Parametre	Açıklama
// Output -> limit --> Onaylanan Limit
// Output -> expireDate --> Limit Geçerlilik Tarihi
// Output -> isAvailableCustomer --> Mevcut Müşteri Mi?
// Output -> resultCode --> Sonuç Kodu
// Output -> resultExplanation --> Sonuç Açıklaması
export async function SaveApplicationProduct({
 transactionId = null, // İşleme ait tekil numara
 applicationNo = null, // Başvuru Numarası
 orderId = null, // Sipariş Numarası
 term = null, // Seçilen Vade
 productCode = null, // Seçilen ürün kodu
 basketAmount = null, // Sepet Tutarı
} = {}) {
 return serviceStep1
  .post('SaveApplicationProduct', {
   transactionId,
   applicationNo,
   orderId,
   term,
   productCode,
   basketAmount
  })
  .then(globalServiceHandler)
}

// Yeni müşteri süreci: Bankacılık Hizmet Çerçevesi Sözleşmesi(BHÇS) Dokümanının İmza’ ya Götürüleceği Adresin Kaydedilmesi
// Web Servis Adı: SaveBHCSAddress
// Fonksiyon: Yeni müşterler için, BHÇS dokümanının müşteriye imzaya götürüleceği adres bilgisini Banka sistemine kaydeder.
// Output	Parametre	Açıklama
// Output -> resultCode -> Sonuç Kodu
// Output -> resultExplanation -> Sonuç Açıklaması
export async function SaveBHCSAddress({
 transactionId = null, // İşleme ait tekil numara
 applicationNo = null, // applicationNo Başvuru Numarası
 city = null, // city İl
 county = null, // county İlçe
 district = null, // district Mahalle
 postCode = null, // postCode Posta Kodu
 address = null, // address Adres
 postMethod = null // postMethod Kurye Tipi
} = {}) {
 return serviceStep1
  .post('SaveBHCSAddress', {
   transactionId,
   applicationNo,
   city,
   county,
   district,
   postCode,
   address,
   postMethod
  })
  .then(globalServiceHandler)
}

// Yeni/Mevcut müşteri süreci: Fibaanahtar kontrolü
// Web Servis Adı: CheckFibaKey
export async function CheckFibaKey({
 transactionId = null, // İşleme ait tekil numara
 nationalIdentityNo,
 motherMaidenName
} = {}) {
 return serviceINSTANTCredit
  .post('CheckFibaKey', {
   transactionId,
   nationalIdentityno: nationalIdentityNo,
   motherMaidenName
  })
  .then(globalServiceHandler)
}

// Mevcut müşteri süreci: Fibaanahtar bilgisi sorgulama
// Web Servis Adı: GetFibaKeyQuestions
export async function GetFibaKeyQuestions({
 transactionId = null, // İşleme ait tekil numara
 nationalIdentityNo = null
} = {}) {
 return serviceStep1
  .post('GetFibaKeyQuestions', {
   transactionId,
   nationalIdentityNo
  })
  .then(globalServiceHandler)
}

// Mevcut müşteri süreci: Fibaanahtar belirleme kimlik doğrulaması
// Web Servis Adı: CheckedFibaKeyIdentityInfo
export async function CheckedFibaKeyIdentityInfo({
 transactionId = null, // İşleme ait tekil numara
 nationalIdentityNo = null,
 serialNumber = null,
 cityCode = null,
 countyCode = null,
 flag = null,
 code = null,
 answer = null,
} = {}) {
 return serviceStep1
  .post('CheckedFibaKeyIdentityInfo', {
   transactionId,
   nationalIdentityNo,
   serialNumber,
   cityCode,
   countyCode,
   flag,
   code,
   answer
  })
  .then(globalServiceHandler)
}

// Mevcut müşteri süreci: Fibaanahtar olusturma
// Web Servis Adı: SaveFibaKey
export async function SaveFibaKey({
 transactionId = null, // İşleme ait tekil numara
 nationalIdentityNo = null,
 fibaKey = null,
 questionAnswerTable = []
} = {}) {
 return serviceStep1
  .post('SaveFibaKey', {
   transactionId,
   nationalIdentityNo,
   fibaKey,
   questionAnswerTable
  })
  .then(globalServiceHandler)
}

// Mevcut müşteri süreci: Doküman servisleri
// Web Servis Adı: GetOSCustomerDocumentsSF
// Fonksiyon: Dökümanları listeler ve iletişim izni alınıp/alınmama bilgisini döner.
// Output	Parametre	Açıklama
// Output -> mustChoice --> iletişim izni zorunlu/opsiyonel mi?
// Output -> emailDelivery --> Mevcuttaki e-mail kanalı
// Output -> telephoneDelivery --> Mevcuttaki Telefon kanalı
// Output -> smsDelivery --> Mevcuttaki SMS kanalı
// Output -> Liste<documentName> --> Doküman ismi
// Output -> Liste<documentCode>	--> Doküman kodu
// Output	-> resultCode --> Sonuç Kodu
// Output	-> resultExplanation --> Sonuç Açıklaması
export async function GetOSCustomerDocumentsSF({
 transactionId = null, // İşleme ait tekil numara
 applicationNo = null // Başvuru No
} = {}) {
 return serviceINSTANTCredit
  .post('GetOSCustomerDocumentsSF', {
   transactionId,
   applicationNo
  })
  .then(globalServiceHandler)
}

// Mevcut müşteri süreci: Doküman servisleri
// Web Servis Adı: GetOSSingleDocument
// Fonksiyon: Tek tek tüm doküman Id'lerini döner.
// Output	Parametre	Açıklama
// Output -> documentCode --> Doküman kodu
// Output -> documentId --> Doküman Id
// Output -> resultCode --> Sonuç Kodu
// Output -> resultExplanation --> Sonuç Açıklaması
export async function GetOSSingleDocument({
 transactionId = null, // İşleme ait tekil numara
 applicationNo = null, // Başvuru No
 documentCode = null // Doküman kodu
} = {}) {
 return serviceINSTANTCredit
  .post('GetOSSingleDocument', {
   transactionId,
   applicationNo,
   documentCode
  })
  .then(globalServiceHandler)
}

// Mevcut müşteri süreci: Doküman servisleri
// Web Servis Adı: InstantCreditOSDocumentApprove
// Fonksiyon: Doküman onaylarını ve seçilen iletişim izni kanallarını iletir. Ardından kullandırım gerçekleşir.
// Output	Parametre	Açıklama
// Output	-> resultCode	 Sonuç Kodu
// Output -> successUrl -> Başarılı URL
// Output -> failUrl -> Başarısız URL
// Output ->	resultExplanation	 Sonuç Açıklaması
export async function InstantCreditOSDocumentApprove({
 transactionId = null, // İşleme ait tekil numara
 applicationNo = null, // applicationNo --> Başvuru no
 logMerchantCode = null, // logMerchantCode --> Kurum kodu
 logShopCode = null, // logShopCode --> Bayi kodu
 customerChoice = null, // customerChoice --> Manuel/Dijital
 emailDelivery = null, // emailDelivery --> e-mail kanalı seçimi
 telephoneDelivery = null, // telephoneDelivery --> telefon kanalı seçimi
 smsDelivery = null, // smsDelivery --> sms kanalı seçimi
 docApproveTableOS = [
  // documentCode: Doküman kodu
  // packageUniqueID: Doküman paketi
  // docChannel: Manuel/Dijital
 ]
} = {}) {
 return serviceINSTANTCredit
  .post('InstantCreditOSDocumentApprove', {
   transactionId,
   applicationNo,
   logMerchantCode,
   logShopCode,
   customerChoice,
   emailDelivery,
   telephoneDelivery,
   smsDelivery,
   docApproveTableOS
  })
  .then(globalServiceHandler)
}

// Web Servis Adı: GetPrmData
// Fonksiyon: Belirlenen Prm bilgilerini çeker.
// Output	Parametre	Açıklama
// Output	-> resultCode Sonuç Kodu
// Output -> prmTableOut --> Prm Bilgileri
export async function GetPrmData({
 transactionId = null, // İşleme ait tekil numara
 banner = null,
 redirect = null,
 prmTableIn = [
  // value2
  // prmName
  // value1
 ]
} = {}) {
 return serviceINSTANTCredit
  .post('GetPrmData', {
   transactionId,
   banner,
   redirect,
   prmTableIn
  })
  .then(({ data: { prmTableOut } }) => {
   return globalServiceHandler({ data: { prmTableOut } })
  })
}

// Web Servis Adı: Success
// Fonksiyon: İş akışı başarıyla tamamlandığında, yönleneceği URL bilgisini iletir.
export async function InformRedirectionSuccess({
 redirectUrl = null // yönlendirme yapılacak url
} = {}) {
 return http
  .post('success', {
   redirectUrl
  })
  .then(globalServiceHandler)
}

// Web Servis Adı: Fail
// Fonksiyon: İş akışı başarısız olduğunda, yönleneceği URL bilgisini iletir.
export async function InformRedirectionFail({
 redirectUrl = null // yönlendirme yapılacak url
} = {}) {
 return http
  .post('fail', {
   redirectUrl
  })
  .then(globalServiceHandler)
}