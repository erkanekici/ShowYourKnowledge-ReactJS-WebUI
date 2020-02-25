import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash-es'
import { Formik, Form } from 'formik'
import PrmProvider from '../PrmProvider'
import { Validate } from '../../utils/validation'
import { PrmDataProperties } from '../../utils/enums'
import { Input } from '../UI/Input'
import Button from '../styled/Button'
import { AdressTable, AdressTableTitle } from '../styled/AdressTable'
import { Checkbox } from '../styled/FormElements'
import { ParagraphInfo } from '../styled/Layout'
import PreLoader from '../UI/Loader'
import CityDistrictInputGroups from '../CityDistrictInputGroups'

const validate = new Validate({
 city: { required: true },
 district: { required: true },
 county: { required: true },
 address: { required: true }
})

// Bankacılık Hizmet Çerçevesi Sözleşmesi (BHÇS)
class BHCSAddress extends Component {
 state = {
  address: {
   postMethod: '1',
   address: '',
   city: '',
   district: '',
   county: '',
   postCode: ''
  },
  getBHCSAddress: false
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

 getAdressByType = (type, prop = 'value') => {
  return get(this.props, `usualAddress.addressTable[0].${type}`)
 }

 getCityLabel = () => {
  return (
   <PrmProvider
    prmName={PrmDataProperties.REGION.prmName}
    render={prm => {
     const typeValue = this.getAdressByType('region')
     const prmItem =
      typeValue && prm.find(item => item.value1 === typeValue)
     return prmItem && prmItem.value2
    }}
   />
  )
 }

 getDistrictLabel = () => {
  return (
   <PrmProvider
    prmName={PrmDataProperties.DISTRICT.prmName}
    render={prm => {
     const typeValue = this.getAdressByType('district')
     const cityValue = this.getAdressByType('region')
     const prmItem =
      typeValue && prm.find(item => item.value1 === typeValue && item.value3 === cityValue)
     return prmItem && prmItem.value2
    }}
   />
  )
 }

 onSubmit = (values, actions) => {
  if (this.state.getBHCSAddress) {
   const address = {
    ...this.state.address,
    ...values
   }

   this.setState({ address })

   actions.setSubmitting(true)
   this.props.save(address).then(() => {
    actions.setSubmitting(false)
   })
  } else {
   this.props.save({
    ...this.state.address,
    city: this.getAdressByType('region'),
    county: this.getAdressByType('district'),
    address: this.getAdressByType('address')
   })
  }
 }

 render() {
  return (
   <Fragment>
    <AdressTableTitle>İkametgah Adresi</AdressTableTitle>
    <AdressTable>
     <tbody>
      <tr>
       <td>
        <span>EV ADRESİ İL</span>
        {this.getCityLabel()}
       </td>
       <td>
        <span>EV ADRESİ İLÇE</span>
        {this.getDistrictLabel()}
       </td>
      </tr>
      <tr>
       <td colSpan="2">
        <span>EV ADRESİ</span>
        {this.getAdressByType('address')}
       </td>
      </tr>
     </tbody>
    </AdressTable>

    <ParagraphInfo>
     <span className="icon-icons-16-px-information" />
     Kredi kullandırım evraklarınızın tamamlanabilmesi için anlaşmalı kurye
     firmamızı adresinize yönlendireceğiz.
    </ParagraphInfo>

    <Checkbox>
     <input
      id="getBHCSAddress"
      type="checkbox"
      name="getBHCSAddress"
      checked={this.state.getBHCSAddress}
      onChange={e => this.setState({ getBHCSAddress: e.target.checked })}
     />
     <label htmlFor="getBHCSAddress">
      Kredi kullandırım evraklarımın ikametgah adresim dışında bir adrese
      gönderilmesini istiyorum.
     </label>
    </Checkbox>

    {!this.state.getBHCSAddress && (
     <Button type="button" onClick={this.onSubmit}>
      Fibabanka Alışveriş Kredisi Başvurusunu Tamamla
     </Button>
    )}

    <Formik
     validate={validate}
     initialValues={{ ...this.state.address }}
     onSubmit={this.onSubmit}
     render={({
      isSubmitting,
      setFieldValue,
      values,
      errors,
      touched
     }) => (
      <Form hidden={!this.state.getBHCSAddress}>
       <CityDistrictInputGroups
        values={values}
        errors={errors}
        touched={touched}
        cityProps={{
         cityLabel: 'İli',
         name: 'city',
         onChange: val => setFieldValue('county', null, false)
        }}
        districtProps={{
         districtLabel: 'İlçe',
         name: 'county'
        }}
       />

       <Input
        name="district"
        placeholder="Semt giriniz."
        cwidth="full"
        label="Semt"
        maxLength="155"
       />

       <Input
        name="address"
        placeholder="Sokak, cadde ve diğer bilgilerinizi giriniz."
        cwidth="full"
        label="Adres"
        maxLength="155"
       />

       <Input
        type="tel"
        name="postCode"
        placeholder="Posta kodu seçiniz."
        cwidth="full"
        maxLength="5"
        label="Posta Kodunuz"
        rules={{ onlyNumber: true }}
       />

       <Button type="submit" disabled={isSubmitting}>
        Fibabanka Alışveriş Kredisi Başvurusunu Tamamla
       </Button>
       {isSubmitting && <PreLoader />}
      </Form>
     )}
    />
   </Fragment>
  )
 }
}

BHCSAddress.propTypes = {
 usualAddress: PropTypes.object.isRequired,
 save: PropTypes.func.isRequired
}

export default BHCSAddress