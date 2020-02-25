import React, { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'
import { get, set, isEmpty, words } from 'lodash-es'
import {
 Label,
 StyledField,
 ErrMsg,
 InputGroupPrepend,
 InputGroup as Group
} from '../../styled/FormElements'
import isInt from 'validator/lib/isInt'
import isAlpha from 'validator/lib/isAlpha'
import numeral from 'numeral'
import ReactTextMask from 'react-text-mask'

const handleOnChange = (
 e,
 setter,
 { onlyNumber, onlyText } = {},
 { money } = {},props

) => {
 const value = e.target.value
 const name = e.target.name

 const hasInputValue = !isEmpty(value)

 if (money && hasInputValue) {
  e.target.value = numeral(value).value()
  setter(e)
  props.updateState && props.updateState(value,name)
 } else if (onlyNumber && hasInputValue) {
  isInt(value) && setter(e)
  isInt(value) && props.updateState && props.updateState(value,name)
 } else if (onlyText && hasInputValue) {
  isAlpha(words(value).join(''), 'tr-TR') && setter(e)
  isAlpha(words(value).join(''), 'tr-TR') && props.updateState && props.updateState(value,name)
 } else {
  setter(e)
  props.updateState && props.updateState(value,name)
 }
}

export const Input = ({ rules = {}, format = {}, name, label,...props }) => (
 <Fragment>
  {label && <Label {...props} htmlFor={name}>{label}</Label>}

  <Field
   name={name}
   render={({ field, form }) => {
    return (
     <StyledField
      as="input"
      type="text"
      hasError={props.useCustomError ? props.hasError :
       get(form, `errors.${name}`) && get(form, `touched.${name}`)
      }
      {...field}
      {...props}
      value={
       format.money
        ? field.value && numeral(field.value).format('0,0')
        : field.value
      }
      onChange={e => handleOnChange(e, field.onChange, rules, format, props)}
     />
    )
   }}
  />

  <ErrMsg {...props} as={ErrorMessage} component="div" name={name} />
 </Fragment>
)

export const MaskedInput = ({
 name,
 label,
 mask = [
  /[1-9]/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/
 ],
 ...props
}) => {
 const handleChange = (e, form, field) => {
  let value = e.target.value
  value = value && value.replace(/\s/g, '')

  if (e.target.defaultValue !== value) {
   let values = { ...form.values }
   set(values, field.name, value)
   form.setValues(values)
  }
 }

 return (
  <Fragment>
   {label && <Label {...props} htmlFor={name}>{label}</Label>}

   <Field
    name={name}
    render={({ field, form }) => {
     return (
      <ReactTextMask
       mask={mask}
       guide={false}
       hasError={
        get(form, `errors.${name}`) && get(form, `touched.${name}`)
       }
       {...field}
       {...props}
       onChange={e => handleChange(e, form, field)}
       render={(ref, props) => (
        <StyledField ref={ref} as="input" {...props} />
       )}
      />
     )
    }}
   />

   <ErrMsg {...props} as={ErrorMessage} component="div" name={name} />
  </Fragment>
 )
}

export const InputGroup = ({ rules = {}, label, name, ...props }) => (
 <Fragment>
  {label && <Label htmlFor={name}>{label}</Label>}

  <Field
   name={name}
   render={({ field, form }) => {
    const hasError =
     get(form, `errors.${name}`) && get(form, `touched.${name}`)

    return (
     <Group cwidth={props.cwidth}>
      <InputGroupPrepend hasError={hasError}>+90</InputGroupPrepend>
      <StyledField
       as="input"
       type="text"
       hasError={hasError}
       {...field}
       {...props}
       onChange={e => handleOnChange(e, field.onChange, rules)}
      />
     </Group>
    )
   }}
  />

  <ErrMsg as={ErrorMessage} component="div" name={name} />
 </Fragment>
)