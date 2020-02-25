import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Validate } from '../../utils/validation'
import { Clear } from '../styled/Layout'
import { ButtonWrapper, ButtonItem } from '../styled/Button'
import Button from '../styled/Button'
import { ErrMsg, Checkbox } from '../styled/FormElements'

const validate = new Validate({
 agreedPolicy: {
  required: [true]
 }
})

class AgreedPolicy extends Component {

 onSubmit = (values, actions) => {
  actions.setSubmitting(true)
  this.props.save(values).then(() => {
   actions.setSubmitting(false)
  })
 }

 onProgress = () => {
  return this.props.disabled()
 }

 render() {
  const buttonContinueStyle={
   marginTop: "10px",
  }
  return (
   <Formik
    validate={validate}
    initialValues={{ agreedPolicy: false }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting }) => (
     <Form>
     <Checkbox>
      <Field id="agreedPolicy" type="checkbox" name="agreedPolicy" disabled={this.onProgress()} />
      <label htmlFor="agreedPolicy">Onaylıyorum.</label>
     </Checkbox>
     <ErrMsg
      as={ErrorMessage}
      component="div"
      name="agreedPolicy"
      marginclear
     />

     <ButtonWrapper>
      <ButtonItem>
       <Button
        type="submit"
        style={buttonContinueStyle}
        disabled={isSubmitting || this.onProgress()}>
        Devam
       </Button>
      </ButtonItem>
      <Clear />
     </ButtonWrapper>
     </Form>
    )}
   />
  )
 }


}

export default AgreedPolicy