import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pick, get } from 'lodash-es'
import globalAction from '../store/global/actions'
import { Paragraph, Success } from '../components/styled/Layout'
import Button, { CenterButton } from '../components/styled/Button'
import UnSuccessImg from '../images/unsuccess.png'

class StepTen extends Component {

 componentDidMount() {
  this.props.setStep('none')

  //GoogleTagManager Events
  this.addGTM()
 }

 redirectToFailedUrl = () => {
  const redirectUrl = this.props.failUrl
  this.props.informRedirection({ redirectUrl })
  document.location.replace(redirectUrl)
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.banner === "1"){ //n11Banner
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/error_banner/',
    'userId': this.props.transactionId
   });
  }
  else if (this.props.companyCode === "N11" && this.props.basketType === "4"){ //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/error_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else{
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/error_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 render() {
  const errorMessage =
   get(this.props, 'location.state.message') || this.props.errorMessage
  const isButtonVisible = get(this.props, 'location.state.button', true)

  return (
   <div>
    <Success src={UnSuccessImg} />
    <Paragraph
     mbclear
     center
     dangerouslySetInnerHTML={{ __html: errorMessage }}
    />
    {isButtonVisible && (
     <CenterButton>
      <Button type="button" onClick={this.redirectToFailedUrl}>
       Geri Dön
      </Button>
     </CenterButton>
    )}
   </div>
  )
 }
}

const mapStateToProps = state => {
 return pick(state.global, ['failUrl','errorMessage','transactionId','banner','basketType','companyCode'])
}

const mapDispatchToProps = {
 informRedirection: globalAction('InformRedirectionFail')
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(StepTen)