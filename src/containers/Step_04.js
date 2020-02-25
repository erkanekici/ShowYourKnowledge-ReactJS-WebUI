import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { pick } from 'lodash-es'
import globalAction from '../store/global/actions'
import {
 PersonalInformation,
 AddressInformation,
 CustomerBHCSAddress
} from '../components/CustomerInformation'
import MenuLink from '../components/UI/MenuLink'
import { routePathByName } from '../routes'
import { H1, Paragraph, ParagraphInfo } from '../components/styled/Layout'
import { PersonelInfoNav } from '../components/styled/PersonelInfoNav'
import CreditLimitInformation from '../components/CreditLimitInformation'
import ServiceError from '../components/UI/ServiceError'
import { AVAILABLE_CUSTOMER } from '../utils/enums'

class StepFourth extends Component {
 BASE_STEP_FOURTH_PATH = routePathByName('Step_04')
 BASE_STEP_FIFTH_PATH = routePathByName('Step_05')
 BASE_STEP_SIXTH_PATH = routePathByName('Step_06')
 STEP_TENTH_PATH = routePathByName('Step_10')

 pathOfFirstStep = this.BASE_STEP_FOURTH_PATH
 pathOfSecondStep = `${this.BASE_STEP_FOURTH_PATH}/address-information`
 pathOfThirdStep = `${this.BASE_STEP_FOURTH_PATH}/customer-bhcs-address`

 state = {
  personal: {},
  address: {},
  BHCSAdress: {}
 }

 componentDidMount() {
  this.props.setStep('none')
 }

 redirectToErrorPage = () => {
  this.props.history.replace(this.STEP_TENTH_PATH, {
   message: this.props.errorMessage
  })
 }

 redirectToTimeoutErrorPage = payload => {
  this.props.history.replace(this.STEP_TENTH_PATH, {
   message: window.APP_CONFIG.custom_error_messages.timeoutMessage,
   ...payload
  })
 }

 isThirdStepActive = () => {
  return this.props.location.pathname === this.pathOfThirdStep
 }

 isAvailableCustomer = () => {
  return AVAILABLE_CUSTOMER === this.props.isAvailableCustomer
 }

 savePersonalInformation = (data = {}) => {
  this.setState({
   personal: {
    ...data
   }
  })

  this.props.history.replace(this.pathOfSecondStep)

  return Promise.resolve({
   ...this.state.personal,
   ...data
  })
 }

 saveAddressInformation = (data = {}) => {
  this.setState({
   address: {
    ...data
   }
  })

  return this.props
   .saveApplicationInformation({
    ...this.state.personal,
    ...this.state.address,
    ...data,
    ...pick(this.props, [
     'transactionId',
     'applicationNo',
     'term',
     'orderId',
     'productCode',
     'basketAmount'
    ])
   })
   .then(() => {
    const { history, hasError } = this.props
    if (!hasError) {
     if (this.isAvailableCustomer()) {
      history.replace(this.BASE_STEP_SIXTH_PATH)
     } else {
      history.replace(this.pathOfThirdStep)
     }
    }else{
     if(this.props.expiredTransaction === '1'){
      if (this.props.companyCode === "N11") {
       this.redirectToErrorPage({ button: false })
      } else {
       this.redirectToTimeoutErrorPage({ button: false })
      }
     }
    }
   })
 }

 saveBHCSAddress = (data = {}) => {
  this.setState({
   BHCSAdress: {
    ...data
   }
  })

  return this.props
   .saveBHCSAddress({
    ...this.state.BHCSAdress,
    ...data,
    ...pick(this.props, ['transactionId', 'applicationNo'])
   })
   .then(() => {
    const { history, hasError } = this.props
    hasError
     ? this.redirectToErrorPage()
     : history.replace(this.BASE_STEP_FIFTH_PATH)
   })
 }

 render() {
  return (
   <Fragment>
    <H1>ALIŞVERİŞ KREDİSİ</H1>
    <Paragraph>
     Kredi başvuruzu tamamlayabilmek için sizi daha yakından tanımak
     istiyoruz. Lütfen aşağıdaki alanların tamamını doldurunuz.
    </Paragraph>

    <CreditLimitInformation />

    <ParagraphInfo>
     <span className="icon-icons-16-px-information" />
     Tüm alanları eksiksiz doldurunuz.
    </ParagraphInfo>

    <PersonelInfoNav>
     <ul>
      <li>
       <MenuLink
        exact={true}
        to={this.pathOfFirstStep}
        label="Kişisel Bilgileriniz"
       />
      </li>
      <li>
       <MenuLink
        to={this.pathOfSecondStep}
        label="İkametgah Bilgileriniz"
       />
      </li>
      {this.isThirdStepActive() && (
       <li>
        <MenuLink
         to={this.pathOfThirdStep}
         label="Kurye Gönderim Adresiniz"
        />
       </li>
      )}
     </ul>
    </PersonelInfoNav>

    <Route
     path={this.pathOfFirstStep}
     exact={true}
     render={props => (
      <PersonalInformation
       {...props}
       personalInitialValue={this.state.personal}
       save={this.savePersonalInformation}
       basketType={this.props.basketType}
       companyCode={this.props.companyCode}
       transactionId={this.props.transactionId}
      />
     )}
    />

    <Route
     path={this.pathOfSecondStep}
     render={props => (
      <AddressInformation
       {...props}
       back={() => this.props.history.replace(this.pathOfFirstStep)}
       save={this.saveAddressInformation}
       basketType={this.props.basketType}
       companyCode={this.props.companyCode}
       transactionId={this.props.transactionId}
      />
     )}
    />

    <Route
     path={this.pathOfThirdStep}
     render={props => (
      <Fragment>
       <CustomerBHCSAddress
        {...props}
        usualAddress={this.state.address}
        save={this.saveBHCSAddress}
        basketType={this.props.basketType}
        companyCode={this.props.companyCode}
        transactionId={this.props.transactionId}
       />
      </Fragment>
     )}
    />

    <ServiceError {...this.props} />
   </Fragment>
  )
 }
}

const mapStateToProps = state => {
 return {
  ...pick(state.global, [
   'transactionId',
   'applicationNo',
   'term',
   'orderId',
   'basketAmount',
   'isAvailableCustomer',
   'hasError',
   'errorMessage',
   'basketType',
   'companyCode',
   'expiredTransaction'
  ]),
  productCode: state.products.selectedProduct
 }
}

const mapDispatchToProps = {
 saveApplicationInformation: globalAction('SaveApplicationInformation'),
 saveBHCSAddress: globalAction('SaveBHCSAddress')
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(StepFourth)