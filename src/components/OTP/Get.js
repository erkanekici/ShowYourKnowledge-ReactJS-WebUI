import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import globalAction from '../../store/global/actions'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import Button from '../styled/Button'
import { Validate } from '../../utils/validation'
import { ErrMsg, Checkbox } from '../styled/FormElements'
import {
 Paragraph,
 ParagraphInfo,
 Clear,
 ContentCapsule
} from '../styled/Layout'
import Modal from '../UI/Modal'
import { ModalButton } from '../UI/Modal/styled'
import { Input, MaskedInput } from '../UI/Input'
import KVKContent from '../KVK'
import ValidateOTP from './Validate'
import MediaQuery from 'react-responsive'

const validate = new Validate({
 nationalIdentityNo: {
  required: true,
  TCKN: true
 },
 mobileNumber: {
  required: true,
  phone: true
 },
 agreedPolicy: {
  required: [true]
 },
 email: {
  required: true,
  email: true
 }
})

class GetOTP extends Component {

 constructor(props) {
  super(props)
  this.formRef = React.createRef()
 }

 state = {
  email: this.props.email,
  showKVKModal: false,
  nationalIdentityNo: this.props.nationalIdentityNo,
  mobileNumber: this.props.mobileNumber,
  agreedPolicy: false,
  captcha: ''
 }

 componentDidMount() {
  //GoogleTagManager Events
  this.addGTM()

  //recaptcha v3
  const sitekey = window.APP_CONFIG.grecaptcha_sitekey
  window.grecaptcha.ready(() => {
   window.grecaptcha.execute(sitekey, { action: 'homepage' }).then((token) => {
    this.setState({ captcha: token })
    this.formRef.current.setFieldValue('captcha', token)
   })
  })
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.banner === "1") { //n11Banner
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step1_banner/',
    'userId': this.props.transactionId
   });
  }
  else if (this.props.companyCode === "N11" && this.props.basketType === "4") { //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step1_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else {
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step1_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 //callGetOTP = (values, actions) => {
 // const attributes = {
 //  nationalIdentityNo:document.getElementById('tckn').value,
 //  mobileNumber:document.getElementById('phoneNo').value.replace(" ","").replace(" ","").replace(" ","")
 // }
 // this.setState({ nationalIdentityNo: document.getElementById('tckn').value }) ;
 // this.setState({ mobileNumber: document.getElementById('tckn').value }) ;
 // actions.setSubmitting(true)
 // this.props.save(attributes).then(() => {
 //  actions.setSubmitting(false)
 // })
 //}

 onSubmit = (values, actions) => {
  this.setState({ ...this.state, ...values })
  actions.setSubmitting(true)
  this.props.save(values).then(() => {
   actions.setSubmitting(false)
  })
 }

 redirectToN11 = () => {
  const redirectUrl = 'https://www.n11.com'
  this.props.informRedirection({ redirectUrl })
  document.location.replace(redirectUrl)
 }

 checkBanner(component) {
  if (component === "title") {
   if (this.props.banner !== "1") {
    const mainParagraphStyleWeb = {
     marginBottom: "10px",
     fontSize: "16px"
    };
    const mainParagraphStyleMobile = {
     marginBottom: "5px",
     fontFamily: "calibri",
     fontSize: "14px"
    };
    return (
     <Fragment>
      <MediaQuery query={`(max-height:680px)`}>
       <MediaQuery query={`(max-width:1149px)`}>
        <Paragraph style={mainParagraphStyleMobile}>
         Ödemenizi Fibabanka Alışveriş Kredisi’yle gerçekleştirmek için
         lütfen başvuru formunu doldurunuz.
        </Paragraph>
       </MediaQuery>
       <MediaQuery query={`(min-width:1150px)`}>
        <Paragraph style={mainParagraphStyleWeb}>
         Ödemenizi Fibabanka Alışveriş Kredisi’yle gerçekleştirmek için
         lütfen başvuru formunu doldurunuz.
        </Paragraph>
       </MediaQuery>
      </MediaQuery>
      <MediaQuery query={`(min-height:681px)`}>
       <Paragraph style={mainParagraphStyleWeb}>
        Ödemenizi Fibabanka Alışveriş Kredisi’yle gerçekleştirmek için
        lütfen başvuru formunu doldurunuz.
      </Paragraph>
      </MediaQuery>
     </Fragment>


    )
   }
   else if (this.props.banner === "1") {
    const firstParagraphMobileStyles = {
     margin: "10px",
     fontSize: "13px"
    };
    const secondParagraphMobileStyles = {
     marginBottom: "10px",
     fontSize: "13px"
    };
    const firstParagraphWebStyles = {
     margin: "10px",
     fontSize: "16px"
    };
    const secondParagraphWebStyles = {
     marginBottom: "10px",
     fontSize: "16px"
    };
    const boxStyle = {
     backgroundColor: "#ecf7d2",
     borderStyle: "solid",
     borderWidth: 2,
     borderRadius: 6,
     borderColor: '#84bd00',
     marginBottom: "10px",
     marginTop: "10px",
    };
    const linkWebStyle = {
     color: "#0057b8",
     fontSize: "16px"
    }
    const linkMobileStyle = {
     color: "#0057b8",
     fontSize: "13px"
    }
    return (
     <Fragment>

      <MediaQuery query={`(max-width:1149px)`}>
       <div style={boxStyle}>
        <Paragraph style={firstParagraphMobileStyles}>
         Fibabankalıysanız; <b>faizsiz, masrafsız</b> alışveriş kredisinden
         faydalanmak için ürününüzü sepete ekleyin ve ödeme
        adımında <b>“Fibabanka'yı”</b> seçin! <b><a style={linkMobileStyle} href="https://www.n11.com" rel="noopener noreferrer" >Alışverişe Devam</a></b>
        </Paragraph>
       </div>

       <Paragraph style={secondParagraphMobileStyles}>
        Fibabankalı değilseniz; <b>faizsiz, masrafsız</b> alışveriş kredisi için 2 adımdan
        oluşan formu doldurun, sizi ziyaret edelim ve hemen Fibabankalı olun.
        Üstelik ilk kez Fibabankalı olacak herkese n11.com’daki tüm alışverişlerinde
       geçerli <b>50 TL’lik indirim kuponu hediye!</b>
       </Paragraph>
      </MediaQuery>

      <MediaQuery query={`(min-width:1150px)`}>
       <div style={boxStyle}>
        <Paragraph style={firstParagraphWebStyles}>
         Fibabankalıysanız; <b>faizsiz, masrafsız</b> alışveriş kredisinden
         faydalanmak için ürününüzü sepete ekleyin ve ödeme
        adımında <b>“Fibabanka'yı”</b> seçin! <br></br>
         <b><a style={linkWebStyle} href="https://www.n11.com" rel="noopener noreferrer" >Alışverişe Devam</a></b>
        </Paragraph>
       </div>

       <Paragraph style={secondParagraphWebStyles}>
        Fibabankalı değilseniz; <b>faizsiz, masrafsız</b> alışveriş kredisi için 2 adımdan
        oluşan formu doldurun, sizi ziyaret edelim ve hemen Fibabankalı olun.
        Üstelik ilk kez Fibabankalı olacak herkese n11.com’daki tüm alışverişlerinde
       geçerli <b>50 TL’lik indirim kuponu hediye!</b>
       </Paragraph>
      </MediaQuery>

     </Fragment>
    )
   }
  }
  else if (component === "footnote") {
   const footNoteWebStyle = {
    fontFamily: "calibri",
    fontSize: "12px"
   }
   const footNoteMobileStyle = {
    fontFamily: "calibri",
    fontSize: "11px",
    marginBottom: "0px"
   }
   if (this.props.banner !== "1") {
    return (
     <Fragment>
      <MediaQuery query={`(max-width:1149px)`}>
       <ParagraphInfo style={footNoteMobileStyle}>
        <span className="icon-icons-16-px-information" />
        T.C. kimlik numaranız, cep telefonu numaranız ve e-posta adresiniz Fibabanka
        Alışveriş Kredisi başvurunuzun ön değerlendirmesinin yapılması
        ve bilgilerinizin doğrulanması amacıyla istenmektedir. Cep
        telefonunuza doğrulama kodu gönderilecektir.
      </ParagraphInfo>
      </MediaQuery>
      <MediaQuery query={`(min-width:1150px)`}>
       <ParagraphInfo style={footNoteWebStyle}>
        <span className="icon-icons-16-px-information" />
        T.C. kimlik numaranız, cep telefonu numaranız ve e-posta adresiniz Fibabanka
        Alışveriş Kredisi başvurunuzun ön değerlendirmesinin yapılması
        ve bilgilerinizin doğrulanması amacıyla istenmektedir. Cep
        telefonunuza doğrulama kodu gönderilecektir.
      </ParagraphInfo>
      </MediaQuery>
     </Fragment>
    )
   }
   else if (this.props.banner === "1") {
    return (
     <Fragment>
      <MediaQuery query={`(max-width:1149px)`}>
       <ParagraphInfo style={footNoteMobileStyle}>
        <span className="icon-icons-16-px-information" />
        T.C. kimlik numaranız, cep telefonu numaranız ve e-posta adresiniz kampanyaya başvuruda
        gerekli değerlendirmenin yapılması
        ve bilgilerinizin doğrulanması amaçlı istenmektedir. Cep
        telefonunuza doğrulama kodu gönderilecektir.
     </ParagraphInfo>
      </MediaQuery>
      <MediaQuery query={`(min-width:1150px)`}>
       <ParagraphInfo style={footNoteWebStyle}>
        <span className="icon-icons-16-px-information" />
        T.C. kimlik numaranız, cep telefonu numaranız ve e-posta adresiniz kampanyaya başvuruda
        gerekli değerlendirmenin yapılması
        ve bilgilerinizin doğrulanması amaçlı istenmektedir. Cep
        telefonunuza doğrulama kodu gönderilecektir.
     </ParagraphInfo>
      </MediaQuery>
     </Fragment>
    )
   }
  }
 }

 addButtonContinue(isSubmitting) {
  if (this.props.getOTP) {
   const buttonContinueStyle = {
    marginTop: "10px"
   }
   const buttonContinueStyleMobile = {
    marginTop: "5px"
   }
   return (
    <Fragment>
     <MediaQuery query={`(max-width:1149px)`}>
      <Button
       style={buttonContinueStyleMobile}
       type="submit"
       disabled={isSubmitting}>
       Devam
    </Button>
     </MediaQuery>
     <MediaQuery query={`(min-width:1150px)`}>
      <Button
       style={buttonContinueStyle}
       type="submit"
       disabled={isSubmitting}>
       Devam
    </Button>
     </MediaQuery>
    </Fragment>
   )
  }
 }

 checkboxClick() {
  //this.setState({ showKVKModal: true })
  window.scrollTo(0, document.body.scrollHeight)
 }

 render() {
  const KvkkTextStyle = {
   fontFamily: "calibri"
  }
  return (
   <Formik
    ref={this.formRef}
    validate={validate}
    initialValues={{ ...this.state }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, errors, touched, values, setFieldValue }) => (
     <Fragment>
      {this.checkBanner("title")}
      <Form>
       <MediaQuery query={`(max-height:680px)`}>
        <MediaQuery query={`(max-width:1149px)`}>
         <Input
          type="tel"
          name="nationalIdentityNo"
          placeholder="11 haneli T.C. kimlik numaranızı giriniz."
          maxLength="11"
          label="T.C. Kimlik Numaranız"
          rules={{ onlyNumber: true }}
          id="tckn"
          autoComplete="off"
          isSmall={true}
          isFibaKey={true}
         />
         <MaskedInput
          type="tel"
          name="mobileNumber"
          placeholder="5xx xxx xx xx"
          maxLength="13"
          label="Cep Telefonu Numaranız"
          id="phoneNo"
          autoComplete="off"
          isSmall="true"
         />
         <Input
          name="email"
          placeholder="adsoyad@adres.com"
          maxLength="320"
          label="E-posta Adresiniz"
          autoComplete="off"
          isSmall="true"
         />
        </MediaQuery>
        <MediaQuery query={`(min-width:1150px)`}>
         <Input
          type="tel"
          name="nationalIdentityNo"
          placeholder="11 haneli T.C. kimlik numaranızı giriniz."
          maxLength="11"
          label="T.C. Kimlik Numaranız"
          rules={{ onlyNumber: true }}
          id="tckn"
          autoComplete="off"
         />
         <MaskedInput
          type="tel"
          name="mobileNumber"
          placeholder="5xx xxx xx xx"
          maxLength="13"
          label="Cep Telefonu Numaranız"
          id="phoneNo"
          autoComplete="off"
         />
         <Input
          name="email"
          placeholder="adsoyad@adres.com"
          maxLength="320"
          label="E-posta Adresiniz"
          autoComplete="off"
         />
        </MediaQuery>
       </MediaQuery>

       <MediaQuery query={`(min-height:681px)`}>
        <Input
         type="tel"
         name="nationalIdentityNo"
         placeholder="11 haneli T.C. kimlik numaranızı giriniz."
         maxLength="11"
         label="T.C. Kimlik Numaranız"
         rules={{ onlyNumber: true }}
         id="tckn"
         autoComplete="off"
        />
        <MaskedInput
         type="tel"
         name="mobileNumber"
         placeholder="5xx xxx xx xx"
         maxLength="13"
         label="Cep Telefonu Numaranız"
         id="phoneNo"
         autoComplete="off"
        />
        <Input
         name="email"
         placeholder="adsoyad@adres.com"
         maxLength="320"
         label="E-posta Adresiniz"
         autoComplete="off"
        />
       </MediaQuery>

       <ContentCapsule>
        {this.checkBanner("footnote")}
        <Checkbox
         hasError={errors.agreedPolicy && touched.agreedPolicy}
        >
         <Field
          id="agreedPolicy"
          type="checkbox"
          name="agreedPolicy"
          checked={values.agreedPolicy}
          onClick={() => this.checkboxClick()}
         />
         <label htmlFor="agreedPolicy">
          <button
           style={KvkkTextStyle}
           type="button"
           onClick={() => this.setState({ showKVKModal: true })}
          >
           Kişisel Verilerin Korunması ve İşlenmesi Hakkında
           Bilgilendirme Metni'ni ve Haklarımı okudum.
          </button>
         </label>
        </Checkbox>
        {errors.agreedPolicy && touched.agreedPolicy ? (
         <ErrMsg marginclear="true">
          {window.APP_CONFIG.custom_error_messages.agreed_policy}
         </ErrMsg>
        ) : null}
       </ContentCapsule>

       {this.addButtonContinue(isSubmitting)}
      </Form>

      <Modal
       title="Kişisel Verilerin Korunması ve İşlenmesi Hakkında Bilgilendirme Metni"
       show={this.state.showKVKModal}
       onClose={() => this.setState({ showKVKModal: false })}
      >
       <KVKContent />
       <ModalButton
        float="right"
        onClick={() =>
         this.setState({ showKVKModal: false }) ||
         setFieldValue('agreedPolicy', true)
        }
       >
        <span className="icon-icons-16-px-input-check" /> Onayla
       </ModalButton>
       <Clear />
      </Modal>

      {this.props.getOTP ? (
       <b></b>
      ) : (
        <ValidateOTP
         {...this.props}
         save={this.props.validateOTP}
         reject={this.props.reject}
         confirm={this.props.confirm}
         reSendOtp={this.props.reSendOtp}
         timeUp={this.props.timeUp}
        />
       )}
     </Fragment>
    )}
   />
  )
 }
}

GetOTP.propTypes = {
 save: PropTypes.func.isRequired
}


const mapDispatchToProps = {
 informRedirection: globalAction('InformRedirectionFail')
}

export default connect(
 null,
 mapDispatchToProps
)(GetOTP)