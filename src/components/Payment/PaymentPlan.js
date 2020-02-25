import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { pick, toNumber } from 'lodash-es'
import globalAction from '../../store/global/actions'
import { routePathByName } from '../../routes'
import FirstPaymentDate from './FirstDate'
import SamplePaymentList from './SampleList'
import AgreedPaymentPolicy from './AgreedPolicy'
import { PaymentPlain } from '../styled/Button'
import ServiceError from '../UI/ServiceError'
import PreLoader from '../UI/Loader'

class ShowPaymentPlan extends Component {
 STEP_FOURTH_PATH = routePathByName('Step_04')
 STEP_SIXTH_PATH = routePathByName('Step_06')
 STEP_TENTH_PATH = routePathByName('Step_10')

 state = {
  showModal: false,
  isLoading: false,
  paymentDate: '',
  paymentDateUsedToGetProductList: ''
 }

 componentDidMount() {
  //GoogleTagManager Events
  this.addGTM()
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.basketType === "4") { //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step4_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else {
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step4_checkout/',
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

 isPaymentDateFresh = () => {
  return this.state.paymentDateUsedToGetProductList === this.state.paymentDate
 }

 getProductList = (data = {}) => {
  this.setState({
   isLoading: true,
   paymentDateUsedToGetProductList: data.firstPaymentDate
  })

  return this.props
   .getProductList({
    ...pick(this.props, [
     'transactionId',
     'channelCode',
     'companyCode',
     'productCode',
     'basketAmount',
     'basketType',
     'limit'
    ]),
    term: this.props.product.term,
    ...data
   })
   .finally(() => {
    const { hasError } = this.props
    if (hasError) {
     if (this.props.expiredTransaction === '1') {
      if (this.props.companyCode === "N11") {
       this.redirectToErrorPage({ button: false })
      } else {
       this.redirectToTimeoutErrorPage({ button: false })
      }
     }
     this.setState({ isLoading: true })
    }
    else {
     this.setState({ isLoading: false })
    }
   })
 }

 callApplicationProduct = (data = {}) => {
  this.setState({ isLoading: true })
  return this.props
   .SaveApplicationProduct({
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
    this.setState({ isLoading: false })
    const { history, hasError } = this.props
    if (hasError && this.props.expiredTransaction === '1') {
     if (this.props.companyCode === "N11") {
      this.redirectToErrorPage({ button: false })
     } else {
      this.redirectToTimeoutErrorPage({ button: false })
     }
    }
    if (!hasError) {
     history.replace(this.STEP_SIXTH_PATH)
    }
   })
 }

 goNextStep = async () => {
  const { hasError, history } = this.props
  if (!hasError && this.isPaymentDateFresh()) {
   if (this.props.isAvailableCustomer === "0") {
    history.replace(this.STEP_FOURTH_PATH)
   }
   else {
    this.callApplicationProduct()
   }
  }
 }

 onDateChange = (val) => {
  this.setState({ paymentDate: val })
  const attributes = {
   firstPaymentDate: val
  }
  this.getProductList(attributes)
 }

 onProgress = () => {
  return this.state.isLoading
 }

 render() {
  const paymentPlan = this.props.paymentPlan || []
  const isThereAnyPaymentPlan = paymentPlan.length > 0

  return (
   <Fragment>
    <br></br>

    <FirstPaymentDate
     reCalculate={this.getProductList}
     onDateChange={val => this.onDateChange(val)}
     disabled={this.onProgress}
    />

    {isThereAnyPaymentPlan && (
     <SamplePaymentList
      list={paymentPlan}
      creditAmount={toNumber(this.props.basketType === '4' ? this.props.limit : this.props.basketAmount)}
      term={this.props.product.term}
      totalAmount={this.props.product.totalPaymentAmount}
      show={this.state.showModal}
      onClose={() => this.setState({ showModal: false })}
     />
    )}

    <PaymentPlain
     disabled={this.state.isLoading}
     onClick={() => this.setState({ showModal: true })}
     type="button"
    >
     <span className="icon-icons-16-px-plan" />
     <span className="button-text">Örnek Ödeme Planınız</span>
    </PaymentPlain>

    <AgreedPaymentPolicy {...this.props} save={this.goNextStep} disabled={this.onProgress} />

    <ServiceError {...this.props} />
    {this.state.isLoading && <PreLoader />}
   </Fragment>
  )
 }
}

const mapStateToProps = state => {
 return {
  ...pick(state.global, [
   'transactionId',
   'channelCode',
   'companyCode',
   'basketAmount',
   'basketType',
   'limit',
   'orderId',
   'term',
   'applicationNo',
   'commissionAmount',
   'isAvailableCustomer',
   'paymentPlan',
   'hasError',
   'errorMessage',
   'expiredTransaction'
  ]),
  productCode: state.products.selectedProduct,
  product:
   state.products.list.find(
    item => item.productCode === state.products.selectedProduct
   ) || {}
 }
}

const mapDispatchToProps = {
 getProductList: globalAction('GetPaymentPlan'),
 SaveApplicationProduct: globalAction('SaveApplicationProduct')
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(ShowPaymentPlan)