/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash-es'
import { CheckFibaKey, ValidatePersonalInfo, SetFibaKey } from '../components/Fibakey'
import globalAction from '../store/global/actions'
import { routePathByName } from '../routes'
import {
 ContactPermissions,
 FIBAKEY_CHECK_CORRECT_CODE,
 FIBAKEY_CHECK_WRONG_CODE,
 FIBAKEY_CHECK_LIMIT,
 FIBAKEY_CHECK_LIMIT_MESSAGE
} from '../utils/enums'
import { H1, Paragraph } from '../components/styled/Layout'
import { ErrMsg } from '../components/styled/FormElements'
import MediaQuery from 'react-responsive'

class StepSeventh extends Component {
 STEP_SEVENTH_PATH = routePathByName('Step_07')
 STEP_EIGTH_PATH = routePathByName('Step_08')
 STEP_TENTH_PATH = routePathByName('Step_10')

 FibakeyCheckCount = 0

 state = {
  showCreateFibaKey: false,
  isCreateFibaKeyInputsValidated: false,
  showGetFibakeyInfoError: false,
  hasCheckedFibaKeyIdentityInfoError: false,
  hasSaveFibaKeyError: false,
  successSaveFibaKey: false,
  showFibaKeyError: true,
 }

 componentDidMount() {
  this.props.setStep('fibaKeyStep')

  //GoogleTagManager Events
  this.addGTM()
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.basketType === "4") { //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step8_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else {
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step8_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 redirectToErrorPage = payload => {
  this.props.history.replace(this.STEP_TENTH_PATH, {
   message: this.props.errorMessage,
   ...payload
  })
 }

 redirectToTimeoutErrorPage = payload => {
  this.props.history.replace(this.STEP_TENTH_PATH, {
   message: window.APP_CONFIG.custom_error_messages.timeoutMessage,
   ...payload
  })
 }

 fibaKeyControl = () => {
  this.FibakeyCheckCount = this.FibakeyCheckCount + 1

  if (this.FibakeyCheckCount >= FIBAKEY_CHECK_LIMIT) {
   this.props.history.replace(this.STEP_TENTH_PATH, {
    message: FIBAKEY_CHECK_LIMIT_MESSAGE
   })
  }
 }

 isFibakeyValid = () => {
  return FIBAKEY_CHECK_CORRECT_CODE === this.props.result
 }

 isFibakeyUnvalid = () => {
  return FIBAKEY_CHECK_WRONG_CODE === this.props.result
 }

 removeFibaKeyErrors = () => {
  this.setState({ showFibaKeyError: false })
  this.setState({ showGetFibakeyInfoError: false })
 }

 removeCreateFibaKeyInputsError = () => {
  this.setState({ hasCheckedFibaKeyIdentityInfoError: false })
 }

 removeSaveFibaKeyError = () => {
  this.setState({ hasSaveFibaKeyError: false })
 }



 setCreateFibaKeySection = (value) => {
  if (value === '1') {
   this.removeFibaKeyErrors()
   this.getCurrentFibaKeyInfo()
   this.setState({ successSaveFibaKey: false })
  }
  else {
   this.setState({ hasCheckedFibaKeyIdentityInfoError: false })
   this.setState({ hasSaveFibaKeyError: false })
   this.setState({ isCreateFibaKeyInputsValidated: false })
   this.setState({ showCreateFibaKey: false })
  }
 }

 save = (data = {}) => {
  this.setState({ showGetFibakeyInfoError: false })
  //this.setState({ successSaveFibaKey: false })
  return this.props
   .check({
    ...data,
    ...pick(this.props, ['transactionId', 'nationalIdentityNo'])
   })
   .then(() => {
    if(this.props.hasError && this.props.expiredTransaction === '1'){
     if (this.props.companyCode === "N11") {
      this.redirectToErrorPage({ button: false })
     } else {
      this.redirectToTimeoutErrorPage({ button: false })
     }
    }

    if (this.isFibakeyUnvalid()) {
     this.setState({ showFibaKeyError: true })
     this.fibaKeyControl()
     return false
    }

   })
   .then(() => {
    if (this.isFibakeyValid()) {
     if (this.props.mustChoice === ContactPermissions.NOT_NECESSARY) {
      return this.props.history.replace(this.STEP_EIGTH_PATH)
     }
     this.props.history.replace(this.STEP_SEVENTH_PATH)
    }
   })
 }

 getCurrentFibaKeyInfo = (data = {}) => {
  return this.props.getCurrentFibaKeyInfo({
   ...data,
   ...pick(this.props, ['transactionId', 'nationalIdentityNo'])
  })
   .then(() => {
    if (this.props.hasError) {
     if(this.props.expiredTransaction === '1'){
      if (this.props.companyCode === "N11") {
       this.redirectToErrorPage({ button: false })
      } else {
       this.redirectToTimeoutErrorPage({ button: false })
      }
     }
     this.setState({ showGetFibakeyInfoError: true })
    }
    else {
     this.setState({ showGetFibakeyInfoError: false })
     this.setState({ showCreateFibaKey: true })
    }
   })
 }

 validateFibaKeyInputs = (data = {}) => {
  return this.props.validateFibaKeyInputs({
   ...data
  })
   .then(() => {
    if (this.props.hasError) {
     if(this.props.expiredTransaction === '1'){
      if (this.props.companyCode === "N11") {
       this.redirectToErrorPage({ button: false })
      } else {
       this.redirectToTimeoutErrorPage({ button: false })
      }
     }
     this.setState({ hasCheckedFibaKeyIdentityInfoError: true })
     this.setState({ showCreateFibaKey: false })
     this.setState({ showCreateFibaKey: true })
    }
    else {
     this.setState({ hasCheckedFibaKeyIdentityInfoError: false })
     this.setState({ isCreateFibaKeyInputsValidated: true })
    }
   })
 }

 setFibaKey = (data = {}) => {
  return this.props.setFibaKey({
   ...data
  })
   .then(() => {
    if (this.props.hasError) {
     if(this.props.expiredTransaction === '1'){
      if (this.props.companyCode === "N11") {
       this.redirectToErrorPage({ button: false })
      } else {
       this.redirectToTimeoutErrorPage({ button: false })
      }
     }
     this.setState({ hasSaveFibaKeyError: true })
     this.setState({ isCreateFibaKeyInputsValidated: false })
     this.setState({ isCreateFibaKeyInputsValidated: true })
    }
    else {
     this.setState({ hasSaveFibaKeyError: false })
     this.setState({ successSaveFibaKey: true })
     this.setCreateFibaKeySection("0")
    }
   })
 }

 render() {
  const paragraphStyleWeb = {
   fontSize: "16px",
   marginBottom: "10px",
   display: this.state.showCreateFibaKey ? 'none' : 'block'
  }
  const paragraphStyleMobile = {
   fontSize: "14px",
   display: this.state.showCreateFibaKey ? 'none' : 'block'
  }
  const mainTitleStyle = {
   marginTop: "40px"
  }
  const successSaveFibaKeyInfoStyleWeb = {
   fontSize: "16px",
   marginBottom: "15px"
  }
  const successSaveFibaKeyInfoStyleMobile = {
   fontSize: "14px",
   marginBottom: "15px"
  }
  return (
   <div>
    <H1 >ALIŞVERİŞ KREDİSİ</H1>

    {!this.state.successSaveFibaKey && (
     <Fragment>
      <MediaQuery query={`(max-width:1149px)`}>
       <Paragraph style={paragraphStyleMobile} visible='hidden'>
        Değerli müşterimiz, Fibabanka Alışveriş Kredisi başvurunuz onaylanmıştır.
      Kredi dokümanlarınızı onaylayabilmek için lütfen FibaAnahtar bilginizi giriniz.<br></br>
        Bankacılık işlemlerinde kimliğinizi doğrulamak için kullanacağınız, gizli güvenlik
        kelimeniz olacak FibaAnahtar’ınızı unuttuysanız veya yeni oluşturabilmek
      için <a
         href="#"
         onClick={(value) => this.setCreateFibaKeySection("1")}
         id="createFibaKeyLink"
        >
         <b> tıklayınız.</b>
        </a>
       </Paragraph>
      </MediaQuery>
      <MediaQuery query={`(min-width:1150px)`}>
       <Paragraph style={paragraphStyleWeb} visible='hidden'>
        Değerli müşterimiz, Fibabanka Alışveriş Kredisi başvurunuz onaylanmıştır.
      Kredi dokümanlarınızı onaylayabilmek için lütfen FibaAnahtar bilginizi giriniz.<br></br>
        Bankacılık işlemlerinde kimliğinizi doğrulamak için kullanacağınız, gizli güvenlik
        kelimeniz olacak FibaAnahtar’ınızı unuttuysanız veya yeni oluşturabilmek
      için <a
         href="#"
         onClick={(value) => this.setCreateFibaKeySection("1")}
         id="createFibaKeyLink"
        >
         <b> tıklayınız.</b>
        </a>
       </Paragraph>
      </MediaQuery>
     </Fragment>
    )}

    {this.state.successSaveFibaKey && (
     <Fragment>
      <MediaQuery query={`(max-width:1149px)`}>
       <Paragraph style={successSaveFibaKeyInfoStyleMobile}>
        <b>FibaAnahtar’ınız oluşturulmuştur.</b><br></br>
        Kredi dokümanlarınızı onaylayabilmek için lütfen FibaAnahtar bilginizi giriniz.
       </Paragraph>
      </MediaQuery>
      <MediaQuery query={`(min-width:1150px)`}>
       <Paragraph style={successSaveFibaKeyInfoStyleWeb}>
       <b>FibaAnahtar’ınız oluşturulmuştur.</b><br></br>
        Kredi dokümanlarınızı onaylayabilmek için lütfen FibaAnahtar bilginizi giriniz.
       </Paragraph>
      </MediaQuery>
     </Fragment>
    )}

    {this.state.showCreateFibaKey ?
     this.state.isCreateFibaKeyInputsValidated ? (
      <Fragment>
       <SetFibaKey
        {...this.props}
        setFibaKey={this.setFibaKey}
        hasSaveFibaKeyError={this.state.hasSaveFibaKeyError}
        removeSaveFibaKeyError={() => this.removeSaveFibaKeyError()}
        back={(value) => this.setCreateFibaKeySection("0")}
       />
      </Fragment>
     ) : (
       <Fragment>
        <ValidatePersonalInfo
         {...this.props}
         validateFibaKeyInputs={this.validateFibaKeyInputs}
         isCreateFibaKeyInputsValidated={this.isCreateFibaKeyInputsValidated}
         hasCheckedFibaKeyIdentityInfoError={this.state.hasCheckedFibaKeyIdentityInfoError}
         removeCreateFibaKeyInputsError={() => this.removeCreateFibaKeyInputsError()}
         back={(value) => this.setCreateFibaKeySection("0")}
        />
       </Fragment>
      ) : (
      <Fragment>
       <CheckFibaKey
        removeFibaKeyError={() => this.removeFibaKeyErrors()}
        save={this.save}
       />
       {this.isFibakeyUnvalid()
        && this.state.showFibaKeyError && (
         <ErrMsg component="div" marginclear="true">
          {window.APP_CONFIG.custom_error_messages.incorrect_fibakey}
         </ErrMsg>
        )}
       {this.state.showGetFibakeyInfoError && (
        <ErrMsg component="div" marginclear="true">
         {window.APP_CONFIG.custom_error_messages.getFibakeyInfoError}
        </ErrMsg>
       )}
      </Fragment>
     )}
   </div>
  )
 }
}

const mapStateToProps = state => {
 const { global, documents } = state
 return {
  ...pick(global, [
   'transactionId',
   'applicationNo',
   'nationalIdentityNo',
   'result',
   'hasError',
   'errorMessage',
   'companyCode',
   'basketType',
   'flag',
   'questionTable',
   'expiredTransaction'
  ]),
  mustChoice: documents.mustChoice
 }
}

const mapDispatchToProps = {
 check: globalAction('CheckFibaKey'),
 validateFibaKeyInputs: globalAction('CheckedFibaKeyIdentityInfo'),
 setFibaKey: globalAction('SaveFibaKey'),
 getCurrentFibaKeyInfo: globalAction('GetFibaKeyQuestions'),

}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(StepSeventh)