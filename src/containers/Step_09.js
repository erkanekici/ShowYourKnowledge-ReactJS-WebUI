import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash-es'
import globalAction from '../store/global/actions'
import { SUCCESS_WAIT_TIME } from '../utils/enums'
import {
 Paragraph,
 Congratulations,
 Clear,
 Success
} from '../components/styled/Layout'
import { CongratulationsCount } from '../components/styled/PleaseWait'
import {
 SuccessBasket,
 SuccessBasketItem,
 SuccessBasketItemWrapper
} from '../components/styled/SuccessBasket'
import SuccessImg from '../images/success.png'
import PageCounter from '../components/UI/PageCounter'
import { formatMoney } from '../utils'

class StepNine extends Component {
 componentDidMount() {
  this.props.setStep('success')

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
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/stepSuccess_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else{
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/stepSuccess_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 isN11CarCreditLoan() {
  if(this.props.basketType === "4"){
   return(
    <Paragraph center>
     {this.props.finalMessage}
    </Paragraph>
   )
  }
  else {
   return(
    <Paragraph center>
    Fibabanka Alışveriş Krediniz kullandırılmış, ödemeniz başarıyla
    gerçekleştirilmiştir.
   </Paragraph>
   )
  }
 }

 render() {
  return (
   <div>
    <Success src={SuccessImg} />
    <Congratulations>Tebrikler!</Congratulations>

    {this.isN11CarCreditLoan()}

    <CongratulationsCount>
     <PageCounter />
     <span>
      Lütfen bekleyiniz, {this.props.companyName} sayfasına
      yönlendiriliyorsunuz.
     </span>
     <Clear />
    </CongratulationsCount>

    <SuccessBasket>
     <SuccessBasketItemWrapper>
      <SuccessBasketItem>
       <h5>Sipariş Numarası</h5>
       <p>{this.props.orderId}</p>
      </SuccessBasketItem>
     </SuccessBasketItemWrapper>
     <SuccessBasketItemWrapper>
      <SuccessBasketItem>
       <h5>Sepet Tutarı</h5>
       <p>
        {formatMoney(this.props.basketAmount)}
        <sup> TL</sup>
       </p>
      </SuccessBasketItem>
     </SuccessBasketItemWrapper>
    </SuccessBasket>
   </div>
  )
 }
}

const mapStateToProps = state => {
 return pick(state.global, [
  'orderId',
  'basketAmount',
  'basketType',
  'transactionId',
  'companyCode',
  'finalMessage',
  'successUrl',
  'companyName'
 ])
}

const mapDispatchToProps = {
 informRedirection: globalAction('InformRedirectionSuccess')
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(StepNine)