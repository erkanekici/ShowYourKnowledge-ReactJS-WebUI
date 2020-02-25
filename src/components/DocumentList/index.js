/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { ErrMsg, DocumentCheckbox } from '../styled/FormElements'
import Button from '../styled/Button'
import MediaQuery from 'react-responsive'
import { List } from './styled'
import DocumentAccordion from '../UI/DocumentAccordion'
import FrameElement from './FrameElement'
import { Paragraph } from '../styled/Layout'
import { Validate } from '../../utils/validation'

const validate = new Validate({
 agreedApplicationDocuments: {
  required: [true]
 },
 agreedUsageDocuments: {
  required: [true]
 }
})

class ShowDocument extends Component {
 state = {
  checkedDocuments: [],
  enabledAgreement: []
 }

 documentAccSafariStyleFix = /iPhone|iPod|iPad/.test(navigator.userAgent)

 handleChange = (e, values, setter, code) => {
  if (e.target.checked) {
   setter('agreedList', [...values.agreedList, code])
  } else {
   setter('agreedList', values.agreedList.filter(item => item !== code))
  }
 }

 onSubmit = (values, actions) => {
  this.setState({ ...this.state, ...values })
  actions.setSubmitting(true)
  this.props.save(values).then(() => {
   actions.setSubmitting(false)
  })
 }

 checkboxClick() {
  window.scrollTo(0,document.body.scrollHeight)
 }

 setDisplayedDocument = (documentCode) => {
  if(this.isDocumentDisplayed(documentCode)){
   this.setState({
    enabledAgreement: []
   })
  }
  else{
   this.setState({
    enabledAgreement: [documentCode]
   })
  }
 }

 getDocumentName = (item) => {
  if(item._documentCode === "74"){
   return "Bankacılık işlemleri komisyon ve ücret bilgi formu"
  }else if(item._documentCode === "35"){
   return "İhtiyaç kredisi sözleşme öncesi bilgi formu"
  }else if(item._documentCode === "1"){
   return "İhtiyaç kredisi başvuru formu dijital"
  }else if(item._documentCode === "53"){
   return "Tüketici kredi sözleşmesi"
  }else if(item._documentCode === "34"){
   return "Ödeme planı"
  }else if(item._documentCode === "388"){
   return "Virman talimatı"
  }else{
   return item.documentName
  }
 }

 isDocumentDisplayed = (documentCode) => {
  if(this.state.enabledAgreement.includes(documentCode)){
   return true
  }
  else{
   return false
  }
 }

 getDocumentContent(item) {
  if(this.isDocumentDisplayed(item.documentCode)){
   return(
    <DocumentAccordion
     title={item.documentName}
     scrollContent={this.documentAccSafariStyleFix}
    >
     <FrameElement
      item={item}
      transactionId={this.props.transactionId}
      enableAggrement={() =>
       this.setState({
        enabledAgreement: [
         ...this.state.enabledAgreement,
         `allChannels_${item.documentCode}`
        ]
       })
      }
     />
    </DocumentAccordion>
   )
  }
 }

 render() {
  const titleStylesWeb = {
   marginBottom: "5px",
   marginTop: "10px",
   fontFamily: "calibri"
  };
  const titleStylesMobile = {
   fontSize: "15px",
   fontFamily: "calibri",
   marginBottom: "5px"
  };
  const documentNameStylesWeb = {
   fontSize: "16px",
   fontFamily: "calibri",
   marginBottom: "5px"
  };
  const documentNameStylesMobile = {
   fontSize: "13px",
   fontFamily: "calibri",
   marginBottom: "5px"
  };
  const checkboxLabelStylesWeb = {
   fontSize: "18px",
   fontFamily: "calibri"
  };
  const checkboxLabelStylesMobile = {
   fontSize: "14px",
   fontFamily: "calibri"
  };
  const submitButtonStylesMobile = {
   marginTop: "13px"
  };

  return (
   <Formik
    validate={validate}
    initialValues={{ agreedApplicationDocuments: false , agreedUsageDocuments: false }}
    //initialValues={{ agreedList: [] }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, values, setFieldValue, errors, touched }) => (
     <Form>
      <MediaQuery query={`(max-width:1149px)`}>
       <Paragraph style={titleStylesMobile}>
        <b>Başvuru Dokümanları</b>
       </Paragraph>
      </MediaQuery>

      <MediaQuery query={`(min-width:1150px)`}>
       <Paragraph style={titleStylesWeb}>
        <b>Başvuru Dokümanları</b>
       </Paragraph>
      </MediaQuery>

      <List>
       {this.props.applicationDocumentsList.map(item => (
        <li key={item.documentCode}>
          <MediaQuery query={`(max-width:1149px)`}>
          <Paragraph style={documentNameStylesMobile}>
            {this.getDocumentName(item)} <a
             href="#"
             onClick={(value) => this.setDisplayedDocument(item.documentCode)}
            >
            <b> {this.isDocumentDisplayed(item.documentCode) ? 'kapat' : 'tıklayınız'} </b>
            </a>
          </Paragraph>
          </MediaQuery>

          <MediaQuery query={`(min-width:1150px)`}>
          <Paragraph style={documentNameStylesWeb}>
            {this.getDocumentName(item)} <a
             href="#"
             onClick={(value) => this.setDisplayedDocument(item.documentCode)}
            >
            <b> {this.isDocumentDisplayed(item.documentCode) ? 'kapat' : 'tıklayınız'} </b>
            </a>
          </Paragraph>
          </MediaQuery>


          {this.getDocumentContent(item)}
        </li>
       ))}
      </List>

      <DocumentCheckbox hasError={errors.agreedApplicationDocuments && touched.agreedApplicationDocuments}>
       <Field
       id="agreedApplicationDocuments"
       type="checkbox"
       name="agreedApplicationDocuments"
       checked={values.agreedApplicationDocuments}
       onClick={() => this.checkboxClick()}
       />
        <MediaQuery query={`(max-width:1149px)`}>
         <label
          style={checkboxLabelStylesMobile}
          htmlFor="agreedApplicationDocuments"
         >
          <b>Yukarıda belirtilen sözleşme ve formları okudum, onaylıyorum.</b>
         </label>
        </MediaQuery>
        <MediaQuery query={`(min-width:1150px)`}>
         <label
          style={checkboxLabelStylesWeb}
          htmlFor="agreedApplicationDocuments"
         >
          <b>Yukarıda belirtilen sözleşme ve formları okudum, onaylıyorum.</b>
         </label>
       </MediaQuery>
      </DocumentCheckbox>

      {errors.agreedApplicationDocuments && touched.agreedApplicationDocuments ? (
       <ErrMsg marginclear="true">
        "Lütfen sözleşme ve formları okudum, onaylıyorum kutucuklarını işaretleyiniz."
       </ErrMsg>
      ) : null}

      <MediaQuery query={`(max-width:1149px)`}>
       <Paragraph style={titleStylesMobile}>
        <b>Kullandırım Dokümanları</b>
       </Paragraph>
      </MediaQuery>

      <MediaQuery query={`(min-width:1150px)`}>
       <Paragraph style={titleStylesWeb}>
        <b>Kullandırım Dokümanları</b>
       </Paragraph>
      </MediaQuery>

      <List>
       {this.props.usageDocumentsList.map(item => (
        <li key={item.documentCode}>

          <MediaQuery query={`(max-width:1149px)`}>
          <Paragraph style={documentNameStylesMobile}>
            {this.getDocumentName(item)} <a
             href="#"
             onClick={(value) => this.setDisplayedDocument(item.documentCode)}
            >
            <b> {this.isDocumentDisplayed(item.documentCode) ? 'kapat' : 'tıklayınız'} </b>
            </a>
          </Paragraph>
          </MediaQuery>
          <MediaQuery query={`(min-width:1150px)`}>
          <Paragraph style={documentNameStylesWeb}>
            {this.getDocumentName(item)} <a
             href="#"
             onClick={(value) => this.setDisplayedDocument(item.documentCode)}
            >
            <b> {this.isDocumentDisplayed(item.documentCode) ? 'kapat' : 'tıklayınız'} </b>
            </a>
          </Paragraph>
          </MediaQuery>

          {this.getDocumentContent(item)}
        </li>
       ))}
      </List>

      <DocumentCheckbox hasError={errors.agreedUsageDocuments && touched.agreedUsageDocuments}>
       <Field
       id="agreedUsageDocuments"
       type="checkbox"
       name="agreedUsageDocuments"
       checked={values.agreedUsageDocuments}
       onClick={() => this.checkboxClick()}
       />
        <MediaQuery query={`(max-width:1149px)`}>
         <label
          style={checkboxLabelStylesMobile}
          htmlFor="agreedUsageDocuments"
         >
         <b>Yukarıda belirtilen sözleşme ve formları okudum, onaylıyorum.</b>
         </label>
        </MediaQuery>
        <MediaQuery query={`(min-width:1150px)`}>
         <label
          style={checkboxLabelStylesWeb}
          htmlFor="agreedUsageDocuments"
         >
          <b>Yukarıda belirtilen sözleşme ve formları okudum, onaylıyorum.</b>
         </label>
       </MediaQuery>
      </DocumentCheckbox>

      {errors.agreedUsageDocuments && touched.agreedUsageDocuments ? (
       <ErrMsg marginclear="true">
        "Lütfen sözleşme ve formları okudum, onaylıyorum kutucuklarını işaretleyiniz."
       </ErrMsg>
      ) : null}

     <MediaQuery query={`(max-width:1149px)`}>
     <Button
       type="submit"
       style={submitButtonStylesMobile}
       disabled={
        isSubmitting
       }
      >
       Fibabanka Alışveriş Kredisi ile Ödemeyi Onaylıyorum
      </Button>
     </MediaQuery>
     <MediaQuery query={`(min-width:1150px)`}>
     <Button
       type="submit"

       disabled={
        isSubmitting
       }
      >
       Fibabanka Alışveriş Kredisi ile Ödemeyi Onaylıyorum
      </Button>
     </MediaQuery>

     </Form>
    )}
   />
  )
 }
}

export default ShowDocument