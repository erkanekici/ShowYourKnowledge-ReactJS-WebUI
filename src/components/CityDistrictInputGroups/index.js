import React, { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'
import { get } from 'lodash-es'
import PrmProvider from '../PrmProvider'
import { PrmDataProperties } from '../../utils/enums'
import { localeSortBy } from '../../utils'
import { Label, ErrMsg } from '../styled/FormElements'
import SelectBox from '../UI/SelectBox/index'
import MediaQuery from 'react-responsive'
import { ParagraphInfo } from '../styled/Layout'

const optionsDistricts = (districts = [], cityId) => {
 if (!cityId) return []
 return districts
  .filter(district => cityId === district.value3)
  .map(item => {
   return {
    value: item.value1,
    label: item.value2
   }
  })
}

const propsDistricts = (districts, { city, district }) => {
 const options = localeSortBy(optionsDistricts(districts, city), 'label')
 return {
  options,
  isDisabled: !city,
  value: options.find(option => option.value === district)
 }
}

const addInformation = (title) => {
 const footNoteWebStyle = {
  fontFamily: "calibri",
  fontSize: "12px",
  marginTop: "0px",
  marginBottom: "15px"
 }
 const footNoteMobileStyle = {
  fontFamily: "calibri",
  fontSize: "11px",
  marginBottom: "10px"

 }
 if(title === 'region'){
  return (
   <Fragment>
    <MediaQuery query={`(max-width:1149px)`}>
     <ParagraphInfo style={footNoteMobileStyle}>
      <span className="icon-icons-16-px-information" />
      Nüfus Müdürlüğü’ne kayıtlı ev adresinizin ilini giriniz.
    </ParagraphInfo>
    </MediaQuery>
    <MediaQuery query={`(min-width:1150px)`}>
     <ParagraphInfo style={footNoteWebStyle}>
      <span className="icon-icons-16-px-information" />
      Nüfus Müdürlüğü’ne kayıtlı ev adresinizin ilini giriniz.
    </ParagraphInfo>
    </MediaQuery>
   </Fragment>
  )
 }
 else if(title === 'district'){
  return (
   <Fragment>
    <MediaQuery query={`(max-width:1149px)`}>
     <ParagraphInfo style={footNoteMobileStyle}>
      <span className="icon-icons-16-px-information" />
      Nüfus Müdürlüğü’ne kayıtlı ev adresinizin ilçesini giriniz.
    </ParagraphInfo>
    </MediaQuery>
    <MediaQuery query={`(min-width:1150px)`}>
     <ParagraphInfo style={footNoteWebStyle}>
      <span className="icon-icons-16-px-information" />
      Nüfus Müdürlüğü’ne kayıtlı ev adresinizin ilçesini giriniz.
    </ParagraphInfo>
    </MediaQuery>
   </Fragment>
  )
 }

}

const CityDistrictInputGroups = ({
 cityProps = {},
 districtProps = {},
 values,
 errors,
 touched,
 hasMaxWidth,
 isFibaKey
}) => {
 const { name: cityName, cityLabel, ...cityFieldProps } = cityProps
 const { name: districtName, districtLabel, ...districtFieldProps } = districtProps

 return (
  <Fragment>
   <PrmProvider
    prmName={PrmDataProperties.REGION.prmName}
    render={prm => {
     return (
      <Fragment>
       <Label htmlFor={cityName}>{cityLabel}</Label>
       <Field
        component={SelectBox}
        options={localeSortBy(
         prm.map(item => {
          return {
           value: item.value1,
           label: item.value2
          }
         }),
         'label'
        )}
        name={cityName}
        placeholder="İl seçiniz."
        hasMaxWidth={hasMaxWidth}
        isFibaKey={isFibaKey}
        hasError={get(errors, cityName) && get(touched, cityName)}
        {...cityFieldProps}
       />
       <ErrMsg as={ErrorMessage} component="div" name={cityName} isFibaKey={isFibaKey} />
      </Fragment>
     )
    }}
   />
   {isFibaKey && addInformation("region")}


   <PrmProvider
    prmName={PrmDataProperties.DISTRICT.prmName}
    render={prm => {
     return (
      <Fragment>
       <Label htmlFor={districtName}>{districtLabel}</Label>
       <Field
        {...propsDistricts(prm, {
         city: get(values, cityName),
         district: get(values, districtName)
        })}
        component={SelectBox}
        name={districtName}
        placeholder="İlçe seçiniz."
        hasMaxWidth={hasMaxWidth}
        isFibaKey={isFibaKey}
        hasError={
         get(errors, districtName) && get(touched, districtName)
        }
        {...districtFieldProps}
       />
       <ErrMsg as={ErrorMessage} component="div" name={districtName} isFibaKey={isFibaKey}/>
      </Fragment>
     )
    }}
   />
   {isFibaKey && addInformation("district")}
  </Fragment>
 )
}

export default CityDistrictInputGroups