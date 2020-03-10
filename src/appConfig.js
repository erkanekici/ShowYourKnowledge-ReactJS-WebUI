var BASE_URL = process.env.REACT_APP_BASE_URL
window.APP_CONFIG = {
  ServiceStep1: {
    service_base_url: BASE_URL + '/serviceCaller/ServiceStep1',
    headers: {
      //username: process.env.REACT_APP_HEADERS_ServiceStep1_USERNAME,
      //password: process.env.REACT_APP_HEADERS_ServiceStep1_PASSWORD
    }
  },
  INSTANTCreditService: {
    service_base_url: BASE_URL + '/serviceCaller/INSTANTCreditService',
    headers: {
      //username: process.env.REACT_APP_HEADERS_INSTANTCREDITSERVICE_USERNAME,
      //password: process.env.REACT_APP_HEADERS_INSTANTCREDITSERVICE_PASSWORD
    }
  },
  document_base_url: BASE_URL + '/document',
  custom_error_messages: {
    agreed_policy:
      '*Lütfen Kişisel Verilerin Korunması ve İşlenmesi Hakkındaki bilgilendirmeyi onaylayınız.',
    incorrect_fibakey:
      "FibaAnahtar'ınızı yanlış girdiniz. Lütfen kontrol ederek tekrar deneyiniz.",
    contact_permission:
      "Tercih etmiş olduğunuz avantajlı 0 faizli kredi ile ilerlemek için 'Onay veriyorum' seçeneğini işaretlemenizi ya da bankamıza ait diğer kredi alternatifi ile ilerlemenizi rica ederiz.",
    contact_channels:
      'Lütfen sizinle iletişime geçmemizi istediğiniz kanalları belirtiniz. Birden fazla kanal seçebilirsiniz.',
    payment_date:
      '* Lütfen seçim yaptığınız ilk taksit tarihi için Tekrar Hesaplama yapınız.',
    getFibakeyInfoError:
      'Teknik bir hata oluştu. Lütfen tekrar deneyiniz.',
    timeoutMessage:
      'İşlem süreniz dolmuştur. Alışverişinizin ödeme adımında Fibabanka Alışveriş Kredisi’ni tekrar seçerek alışverişinizi tamamlayabilirsiniz.',
    n11TimeoutMessage:
      'İşlem süreniz dolmuştur. n11.com üzerindeki ödeme adımında, Fibabanka Alışveriş Kredisi’ni tekrar seçerek alışverişinizi tamamlayabilirsiniz.'
  },
  grecaptcha_sitekey: '6LdQQsUUAAAAAJomJ5vBFxrhH-athRzwCgf_Xio4'
}