import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash-es'
import globalAction from '../store/global/actions'
import { SUCCESS_WAIT_TIME } from '../utils/enums'
import {
 H1,
 Paragraph,
 Clear
} from '../components/styled/Layout'
import { PleaseWait } from '../components/styled/PleaseWait'
import PageCounter from '../components/UI/PageCounter'
import CreditLimitInformation from '../components/CreditLimitInformation'

class StepFifth extends Component {
 componentDidMount() {
  this.props.setStep('none')

  //GoogleTagManager Events
  this.addGTM()

  const redirectUrl = this.props.successUrl
  this.props.informRedirection({ redirectUrl })

  setTimeout(() => {
   document.location.replace(redirectUrl)
  }, SUCCESS_WAIT_TIME)
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.basketType === "4"){ //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step7_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else{
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step7_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 render() {
  return (
   <Fragment>
    <H1>ALIŞVERİŞ KREDİSİ</H1>
    <Paragraph>
     Anlaşmalı kurye firmamız en kısa sürede sizinle iletişime geçecektir.
     Kuryemizin ziyareti sonrasında, kredi kullanım onayınızın
     tamamlanabilmesi için SMS ile tarafınıza iletilecek linke tıklayarak
     onaylamanız gerekmektedir. Onayınız sonrasında kredi kullandırım
     süreciniz tamamlanacak ve ödemeniz gerçekleştirilerek, sipariş
     gönderim süreciniz başlayacaktır.
    </Paragraph>

    <Paragraph>Bankamızı tercih ettiğiniz için teşekkür ederiz.</Paragraph>

    <Paragraph>
     <strong>Mutlu günler dileriz.</strong>
    </Paragraph>

    <CreditLimitInformation />

    <PleaseWait>
     <PageCounter />
     <span>
      Lütfen bekleyiniz, {this.props.companyName} sayfasına
      yönlendiriliyorsunuz.
     </span>
     <Clear />
    </PleaseWait>
   </Fragment>
  )
 }
}

const mapStateToProps = state => {
 return pick(state.global, ['successUrl', 'companyName', 'basketType','companyCode','transactionId'])
}

const mapDispatchToProps = {
 informRedirection: globalAction('InformRedirectionSuccess')
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(StepFifth)