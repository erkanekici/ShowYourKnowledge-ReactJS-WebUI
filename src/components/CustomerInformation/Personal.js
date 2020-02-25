import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { trim, toNumber } from 'lodash-es'
import { Validate } from '../../utils/validation'
import { PrmDataProperties } from '../../utils/enums'
import { toUpperCase } from '../../utils'
import PrmProvider from '../PrmProvider'
import Button from '../styled/Button'
import { Label, ErrMsg } from '../styled/FormElements'
import { Input } from '../UI/Input'
import SelectBox from '../UI/SelectBox'
import PreLoader from '../../components/UI/Loader'

const optionsRiskySectorCode =
[
     {
      "value": 1,
      "label": "DÖVİZ BÜROSU"
     },
     {
      "value": 2,
      "label": "TALİH OYUNLARI, KUMARHANE"
     },
     {
      "value": 3,
      "label": "KUYUMCU, ALTIN VE ELMAS GİBİ DEĞERLİ TAŞ VE MADEN TİCARETİ"
     },
     {
      "value": 4,
      "label": "ARAÇ SATAN GALERİ"
     },
     {
      "value": 5,
      "label": "ANTİKACI, SANAT GALERİSİ"
     },
     {
      "value": 6,
      "label": "RESTORAN"
     },
     {
      "value": 7,
      "label": "AKARYAKIT ISTASYONU"
     },
     {
      "value": 8,
      "label": "SİLAH VE DİĞER ASERİ ÜRÜN VE MALZEMELERİN DAĞITIM VE ÜRETİMİ"
     },
     {
      "value": 9,
      "label": "VAKIF VEYA DERNEK"
     },
     {
      "value": 11,
      "label": "HİÇBİRİ"
     }
    ];

const validate = new Validate({
 profession: { required: true },
 workingType: { required: true },
 educationState: { required: true },
 workPlaceName: { required: true },
 riskySectorCode: { required: true },
 homeState: { required: true }
})

class CustomerInformation extends Component {
 state = {
  profession: '',
  workingType: '',
  educationState: '',
  workPlaceName: '',
  riskySectorCode: '',
  homeState: ''
 }

 componentDidMount() {
  //GoogleTagManager Events
  this.addGTM()
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.basketType === "4"){ //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step5_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else{
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step5_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 isProfessionActive = value => {
  return [3, 4, 5, 6, 7].includes(toNumber(trim(value)))
 }

 isRiskySectorCodeActive = value => {
  return toNumber(trim(value)) === 2
 }

 isWorkPlaceNameActive = value => {
  return [1, 2, 7].includes(toNumber(trim(value)))
 }

 handleWorkingType = (val, setFieldValue) => {
  if (this.isRiskySectorCodeActive(val)) {
   setFieldValue('riskySectorCode', '', false)
  }

  if (this.isProfessionActive(val)) {
   setFieldValue('profession', '', false)
  }

  if (!this.isWorkPlaceNameActive(val)) {
   setFieldValue('workPlaceName', '', false)
  }
 }

 onSubmit = (values, actions) => {
  this.setState({ ...this.state, ...values })
  actions.setSubmitting(true)
  this.props.save(values).then(() => {
   actions.setSubmitting(false)
  })
 }

 render() {
  return (
   <Formik
    validate={values =>
     validate(values, {
      profession: this.isProfessionActive(values.workingType),
      riskySectorCode: !this.isRiskySectorCodeActive(values.workingType),
      workPlaceName: !this.isWorkPlaceNameActive(values.workingType)
     })
    }
    initialValues={{ ...this.state, ...this.props.personalInitialValue }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, values, setFieldValue, errors, touched }) => (
     <Form>
      <PrmProvider
       prmName={PrmDataProperties.WORKING_TYPE.prmName}
       render={prm => {
        return (
         <Fragment>
          <Label htmlFor="workingType">Çalışma Şekliniz</Label>
          <Field
           component={SelectBox}
           options={prm.map(item => {
            return {
             value: item.value1,
             label: toUpperCase(item.value2)
            }
           })}
           value={values.workingType}
           name="workingType"
           placeholder="Çalışma şeklinizi seçiniz."
           hasError={errors.workingType && touched.workingType}
           onChange={val =>
            this.handleWorkingType(val, setFieldValue)
           }
          />
          <ErrMsg
           as={ErrorMessage}
           component="div"
           name="workingType"
          />
         </Fragment>
        )
       }}
      />

      {this.isRiskySectorCodeActive(values.workingType) && (
       <Fragment>
        <Label htmlFor="riskySectorCode">
         Aşağıdaki işkollarından birisinde faaliyet gösteriyor musunuz?
        </Label>
        <Field
         component={SelectBox}
         options={optionsRiskySectorCode}
         value={values.riskySectorCode}
         name="riskySectorCode"
         placeholder="Faaliyet gösterdiğiniz işkolunu seçiniz."
         hasError={errors.riskySectorCode && touched.riskySectorCode}
        />
        <ErrMsg
         as={ErrorMessage}
         component="div"
         name="riskySectorCode"
        />
       </Fragment>
      )}

      <PrmProvider
       prmName={PrmDataProperties.PROFESSION.prmName}
       render={prm => {
        return (
         <Fragment>
          <Label htmlFor="profession">Mesleğiniz</Label>
          <Field
           component={SelectBox}
           options={prm.map(item => {
            return {
             value: item.value1,
             label: toUpperCase(item.value2)
            }
           })}
           value={values.profession}
           name="profession"
           placeholder="Mesleğinizi seçiniz."
           hasError={errors.profession && touched.profession}
           isDisabled={this.isProfessionActive(values.workingType)}
          />
          <ErrMsg
           as={ErrorMessage}
           component="div"
           name="profession"
          />
         </Fragment>
        )
       }}
      />

      <PrmProvider
       prmName={PrmDataProperties.EDUCATION_STATE.prmName}
       render={prm => {
        return (
         <Fragment>
          <Label htmlFor="educationState">Öğrenim Durumunuz</Label>
          <Field
           component={SelectBox}
           options={prm.map(item => {
            return {
             value: item.value1,
             label: toUpperCase(item.value2)
            }
           })}
           value={values.educationState}
           name="educationState"
           placeholder="Öğrenim durumunuzu seçiniz."
           hasError={errors.educationState && touched.educationState}
          />
          <ErrMsg
           as={ErrorMessage}
           component="div"
           name="educationState"
          />
         </Fragment>
        )
       }}
      />

      <PrmProvider
       prmName={PrmDataProperties.HOME_STATE.prmName}
       render={prm => {
        return (
         <Fragment>
          <Label htmlFor="homeState">
           Oturduğunuz Evin İkametgah Tipi
          </Label>
          <Field
           component={SelectBox}
           options={prm.map(item => {
            return {
             value: item.value1,
             label: toUpperCase(item.value2)
            }
           })}
           value={values.homeState}
           name="homeState"
           placeholder="Oturduğunuz evin ikametgah tipini seçiniz."
           hasError={errors.homeState && touched.homeState}
          />
          <ErrMsg
           as={ErrorMessage}
           component="div"
           name="homeState"
          />
         </Fragment>
        )
       }}
      />

      <Input
       name="workPlaceName"
       placeholder="İş Yeri Adı giriniz."
       cwidth="full"
       maxLength="155"
       label="İş Yeri Adı"
       disabled={
        values.workingType &&
        !this.isWorkPlaceNameActive(values.workingType)
       }
      />

      <Button type="submit" disabled={isSubmitting}>
       Devam
      </Button>
      {isSubmitting && <PreLoader />}
     </Form>
    )}
   />
  )
 }
}

CustomerInformation.propTypes = {
 personalInitialValue: PropTypes.object,
 save: PropTypes.func.isRequired,
}

export default CustomerInformation