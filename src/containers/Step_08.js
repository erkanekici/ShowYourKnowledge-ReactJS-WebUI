import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, pick } from 'lodash-es'
import Timeout from 'await-timeout'
import MediaQuery from 'react-responsive'
import { H1, Paragraph } from '../components/styled/Layout'
import DocumentList from '../components/DocumentList'
import { routePathByName } from '../routes'
import store from '../store'
import { GLOBAL_ERROR_CLEAR } from '../store/actionTypes'
import ServiceError from '../components/UI/ServiceError'
import PreLoader from '../components/UI/Loader'

class StepEight extends Component {
 STEP_NINETH_PATH = routePathByName('Step_09')
 STEP_TENTH_PATH = routePathByName('Step_10')

 state = {
  checkedDocuments: [],
  applicationDocumentsList: [],
  usageDocumentsList: [],
  isLoading: false
 }

 componentDidMount() {
  this.props.setStep('documentStep')

  this.getDocumentsUntilBeReady()

  //GoogleTagManager Events
  this.addGTM()
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.basketType === "4"){ //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step10_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else{
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step10_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 redirectToN11TimeoutErrorPage = payload => {
  this.props.history.replace(this.STEP_TENTH_PATH, {
   message: window.APP_CONFIG.custom_error_messages.n11TimeoutMessage ,
   ...payload
  })
 }

 redirectToTimeoutErrorPage = payload => {
  this.props.history.replace(this.STEP_TENTH_PATH, {
   message: window.APP_CONFIG.custom_error_messages.timeoutMessage,
   ...payload
  })
 }


 checkDocument = code => {
  this.setState({ checkedDocuments: [...this.state.checkedDocuments, code] })
 }

 areAllDocumentsCheck = () => {
  return this.props.documentList.length === this.state.checkedDocuments.length
 }

 approvePayment = () => {
  return this.props
   .save({
    ...pick(this.props, [
     'transactionId',
     'applicationNo',
     'mustChoice',
     'emailDelivery',
     'telephoneDelivery',
     'smsDelivery'
    ]),
    docApproveTableOS: this.props.documentList.map(item => {
     return {
      documentCode: item._documentCode,
      packageUniqueID: 'INSTANTCREDITDIGITAL',
      docChannel: 'D'
     }
    }),
    customerChoice: 'D'
   })
   .finally(() => {
    const { history, hasError } = this.props
    if (!hasError) {
     history.replace(this.STEP_NINETH_PATH)
    }else{
     if(this.props.expiredTransaction === '1'){
      if (this.props.companyCode === "N11") {
       this.redirectToN11TimeoutErrorPage({ button: false })
      } else {
       this.redirectToTimeoutErrorPage({ button: false })
      }
     }
    }
   })
 }

 getDocumentsUntilBeReady = () => {
  this.setState({ isLoading: true })
  Promise.all([
   ...this.props.documentList
    .filter(item => !item.documentId)
    .map(item => {
//      return this.props.getDocumentByDocumentCode({
//       transactionId: this.props.transactionId,
//       applicationNo: this.props.applicationNo,
//       documentCode: item.documentCode
//      }).then(() => store.dispatch({ type: GLOBAL_ERROR_CLEAR }))
    })
  ]).then(() => {
   if(this.props.expiredTransaction === '1'){
    if (this.props.companyCode === "N11") {
     this.redirectToN11TimeoutErrorPage({ button: false })
    } else {
     this.redirectToTimeoutErrorPage({ button: false })
    }
   }
   const areEveryDocumentsReady = this.props.documentList.every(
    item => item.documentId
   )

   if(areEveryDocumentsReady){
    this.createApplicationDocuments(this.props.documentList)
    this.setState({ isLoading: false })
   }
   else{
    Timeout.set(5000).then(() => this.getDocumentsUntilBeReady())
   }
  })
 }

 createApplicationDocuments = (list) => {
  const applicationDocumentsCodes = ["74","35","1"]
  const usageDocumentsCodes = ["53","34","388"]
  const applicationDocumentsList = []
  const usageDocumentsList = []

  list.filter((item) => {
   if(applicationDocumentsCodes.includes(item._documentCode)){
    applicationDocumentsList.push(item);
   }
   if(usageDocumentsCodes.includes(item._documentCode)){
    usageDocumentsList.push(item);
   }
  })

  this.setState({ applicationDocumentsList: applicationDocumentsList })
  this.setState({ usageDocumentsList: usageDocumentsList })
 }

 render() {
  const mainParagraphStylesMobile = {
   fontSize: "13px",
   fontFamily: "calibri"
  };
  const mainParagraphStylesWeb = {
   marginBottom: "20px"
  };

  return (
   <div>
    <H1>ALIŞVERİŞ KREDİSİ</H1>

    <MediaQuery query={`(max-width:1149px)`}>
     <Paragraph style={mainParagraphStylesMobile}>
      Fibabanka Alışveriş Kredisi ile ödemenizi
      gerçekleştirmek için lütfen aşağıdaki sözleşme ve formları okudum,
      onaylıyorum kutucuklarını işaretleyiniz.
     </Paragraph>
    </MediaQuery>
    <MediaQuery query={`(min-width:1150px)`}>
     <Paragraph style={mainParagraphStylesWeb}>
      Fibabanka Alışveriş Kredisi ile ödemenizi
      gerçekleştirmek için lütfen aşağıdaki sözleşme ve formları okudum,
      onaylıyorum kutucuklarını işaretleyiniz.
     </Paragraph>
    </MediaQuery>

    <DocumentList
     applicationDocumentsList={this.state.applicationDocumentsList}
     usageDocumentsList={this.state.usageDocumentsList}
     //save={this.approvePayment}
     transactionId={this.props.transactionId}
    />

    <ServiceError {...this.props} />
    {this.state.isLoading && <PreLoader />}
   </div>
  )
 }
}

const mapStateToProps = state => {
 return {
  ...pick(state.global, [
   'transactionId',
   'applicationNo',
   'hasError',
   'errorMessage',
   'companyCode',
   'basketType',
   'expiredTransaction'
  ]),
  ...pick(state.documents, [
   'mustChoice',
   'emailDelivery',
   'telephoneDelivery',
   'smsDelivery'
  ]),
  documentList: get(state.documents, 'list', [])
 }
}

const mapDispatchToProps = {
//  save: approveDocuments,
//  getDocumentByDocumentCode
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(StepEight)