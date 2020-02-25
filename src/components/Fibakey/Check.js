import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import Button from '../styled/Button'
import { Validate } from '../../utils/validation'
import { ParagraphInfo } from '../styled/Layout'
import { Input } from '../UI/Input'
import MediaQuery from 'react-responsive'

const validate = new Validate({
 motherMaidenName: {
  required: true
 }
})

class CheckFibaKey extends Component {
 state = {
  motherMaidenName: ''
 }

 onSubmit = (values, actions) => {
  this.setState({ ...this.state, ...values })
  actions.setSubmitting(true)
  this.props.save(values).then(() => {
   actions.setSubmitting(false)
  })
 }

 // handleBlur = field => event => {
 //  if(event.relatedTarget && event.relatedTarget.id === 'createFibaKeyLink' ){
 //   document.getElementById('createFibaKeyLink').click()
 //  }
 // };

 render() {
  const submitButtonStyle = {
   marginTop: "5px"
  }
  const infoStyle = {
   fontSize: "11px"
  }
  return (
   <Formik
    validate={validate}
    initialValues={{ ...this.state }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, errors, touched }) => (
     <Fragment>
      <Form>
       <Input
        name="motherMaidenName"
        hasError={errors.motherMaidenName && touched.motherMaidenName}
        maxLength="155"
        label="FibaAnahtar"
        rules={{ onlyText: true }}
        type="password"
        autoComplete="off"
        onFocus={this.props.removeFibaKeyError}
       //handleBlur={this.handleBlur()}
       />

       <MediaQuery query={`(max-width:1149px)`}>
        <ParagraphInfo style={infoStyle}>
         <span className="icon-icons-16-px-information" />
         FibaAnahtar, İnternet ve Mobil Bankacılık ile Telefon Bankacılığı
         işlemlerinizi gerçekleştirebilmek için oluşturduğunuz, size özel
         ve gizli güvenlik kelimesidir. Daha önce, annenizin evlenmeden
         önceki soyadını Bankamıza ilettiyseniz, bu kelimeyi de
         FibaAnahtar’ınız olarak kullanabilirsiniz.
        </ParagraphInfo>
       </MediaQuery>

       <MediaQuery query={`(min-width:1150px)`}>
        <ParagraphInfo>
         <span className="icon-icons-16-px-information" />
         FibaAnahtar, İnternet ve Mobil Bankacılık ile Telefon Bankacılığı
         işlemlerinizi gerçekleştirebilmek için oluşturduğunuz, size özel
         ve gizli güvenlik kelimesidir. Daha önce, annenizin evlenmeden
         önceki soyadını Bankamıza ilettiyseniz, bu kelimeyi de
         FibaAnahtar’ınız olarak kullanabilirsiniz.
       </ParagraphInfo>
       </MediaQuery>



       {/* <ParagraphInfo>
        <span className="icon-icons-16-px-information" />
        FibaAnahtar'ınızı henüz belirlemediyseniz ya da hatırlamıyorsanız,
        <Strong> 444 88 88</Strong> Telefon Bankacılığı’ndan bize
        ulaşabilirsiniz.
       </ParagraphInfo> */}

       <Button type="submit" style={submitButtonStyle} disabled={isSubmitting}>
        Doğrula
       </Button>

      </Form>
     </Fragment>
    )}
   />
  )
 }
}

CheckFibaKey.propTypes = {
 save: PropTypes.func.isRequired
}

export default CheckFibaKey