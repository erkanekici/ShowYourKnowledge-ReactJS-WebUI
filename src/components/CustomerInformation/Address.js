import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { Validate } from '../../utils/validation'
import Button, { ButtonWrapper, ButtonItem, ButtonBack } from '../styled/Button'
import { Input } from '../UI/Input'
import PreLoader from '../../components/UI/Loader'
import CityDistrictInputGroups from '../CityDistrictInputGroups'

const validate = new Validate({
 'addressTable[0].region': { required: true },
 'addressTable[0].district': { required: true },
 'addressTable[0].address': { required: true },
 email: { required: true, email: true }
})

class BHCSAddress extends Component {
 state = {
  email: '',
  addressTable: [
   {
    region: '',
    district: '',
    address: '',
    addressType: 'RA'
   }
  ]
 }

 componentDidMount() {
  //GoogleTagManager Events
  this.addGTM()
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.basketType === "4"){ //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step6_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else{
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step6_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 onSubmit = (values, actions) => {
  this.setState({ ...this.state, ...values })

  actions.setSubmitting(true)
  this.props.save({ ...values }).then(() => {
   actions.setSubmitting(false)
  })
 }

 render() {
  return (
   <Formik
    validate={validate}
    initialValues={{ ...this.state }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, setFieldValue, values, errors, touched }) => (
     <Form>
      <CityDistrictInputGroups
       values={values}
       errors={errors}
       touched={touched}
       cityProps={{
        cityLabel: 'İkametgah Adresi İliniz',
        name: 'addressTable[0].region',
        onChange: val =>
         setFieldValue('addressTable[0].district', null, false)
       }}
       districtProps={{
        districtLabel: 'İkametgah Adresi İlçeniz',
        name: 'addressTable[0].district'
       }}
      />

      <Input
       name="addressTable[0].address"
       placeholder="Sokak, cadde ve diğer bilgilerinizi giriniz."
       cwidth="full"
       maxLength="155"
       label="İkametgah Adresiniz"
      />

      <Input
       name="email"
       placeholder="adsoyad@adres.com"
       cwidth="full"
       maxLength="320"
       label="E-posta Adresiniz"
      />

      <ButtonWrapper>
       <ButtonItem>
        <ButtonBack type="button" onClick={this.props.back}>
         Geri
        </ButtonBack>
       </ButtonItem>
       <ButtonItem>
        <Button type="submit" disabled={isSubmitting}>
         Devam
        </Button>
       </ButtonItem>
      </ButtonWrapper>
      {isSubmitting && <PreLoader />}
     </Form>
    )}
   />
  )
 }
}

BHCSAddress.propTypes = {
 save: PropTypes.func.isRequired,
 back: PropTypes.func.isRequired
}

export default BHCSAddress