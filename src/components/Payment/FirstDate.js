import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { format, addDays, addMonths } from 'date-fns'
import {
 StyledField,
 ErrMsg,
 FirstPaymentDate,
 Label
} from '../styled/FormElements'
import { Clear } from '../styled/Layout'
import DatePicker from '../UI/DatePicker'
import { Validate } from '../../utils/validation'

const validate = new Validate({
 firstPaymentDate: {
  required: true
 }
})

const MIN_PAYMENT_DATE = addDays(new Date(), 7)
const INITIAL_PAYMENT_DATE = format(addMonths(new Date(), 1), 'yyyyMMdd')
const MAX_PAYMENT_DATE = addDays(new Date(), 45)

class FirstDate extends Component {
 state = {
  firstPaymentDate: INITIAL_PAYMENT_DATE
 }

 componentDidMount() {
  this.refs.form.submitForm()
  this.props.onDateChange(this.state.firstPaymentDate)

 }

 onSubmit = (values, actions) => {
  this.setState({ ...this.state, ...values })
  //actions.setSubmitting(true)
  //this.props.reCalculate(values).then(() => {
  // actions.setSubmitting(false)
  //})
 }

 render() {
  return (
   <Fragment>
    <Formik
     ref="form"
     validate={validate}
     initialValues={{ ...this.state }}
     onSubmit={this.onSubmit}
     render={({ isSubmitting }) => (
      <Fragment>
       <Form>
        <Label htmlFor="firstPaymentDate">İlk Taksit Tarihi</Label>
        <FirstPaymentDate colored>
         <StyledField
          as={Field}
          component={DatePicker}
          name="firstPaymentDate"
          placeholder="ilk taksit tarihi"
          cwidth="full"
          showCustomButtons
          minDate={MIN_PAYMENT_DATE}
          maxDate={MAX_PAYMENT_DATE}
          onChange={this.props.onDateChange}
         />
        </FirstPaymentDate>

        <Clear />

        <ErrMsg
         as={ErrorMessage}
         component="div"
         name="firstPaymentDate"
        />
       </Form>
      </Fragment>
     )}
    />
   </Fragment>
  )
 }
}

FirstDate.propTypes = {
 reCalculate: PropTypes.func.isRequired
}

export default FirstDate