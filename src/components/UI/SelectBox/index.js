import React from 'react'
import CustomSelect from './styled'
import { toUpperCase } from '../../../utils'

const selectValueHandler = (options, value) => {
 if (options && value) {
  return {
   options,
   value: options.find(option => option.value === value)
  }
 }

 return {
  options
 }
}

const SelectBox = ({
 field, // { name, value, onChange, onBlur }
 form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
 ...props
}) => {
 if(field.name === "questionSelectBox"){
  props.questionSelectBox(field.value)
 }
 const handleChange = option => {
  const value = option && option.value
  if (props.onChange) props.onChange(value)
  form.setFieldValue(field.name, value)
 }

 const handleInputChange = (value, { action }) => {
  if (action === 'input-blur') {
   form.handleBlur(field.name)
   form.setFieldTouched(field.name)
  }
 }

 const handleSelectRef = ref => {
  if (ref && field.value == null && ref.select.hasValue()) {
   ref.select.clearValue()
  }
 }

 const filterOption = ({ label }, searchText) => {
  return toUpperCase(label).includes(toUpperCase(searchText))
 }

 return (
  <CustomSelect
   {...props}
   {...selectValueHandler(props.options, props.value)}
   classNamePrefix="react-select"
   noOptionsMessage={({ inputValue }) => ''}
   onChange={handleChange}
   onInputChange={handleInputChange}
   ref={handleSelectRef}
   filterOption={filterOption}
  />
 )
}

export default SelectBox