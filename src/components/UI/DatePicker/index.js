import React, { Component } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
 format,
 addMonths,
 addWeeks,
 endOfMonth,
 isValid,
 parse
} from 'date-fns'
import tr from '../../../locale/date-fns/tr'
import { DateButtons, DateButton, DateButtonList } from '../../styled/Button'
import { SERVICE_DATE_FORMAT, UI_DATE_FORMAT } from '../../../utils/enums'
import Wrapper from './styled'

class DatePicker extends Component {
 state = {
  isFocus: false
 }

 pickerRef = React.createRef()

 render() {
  const { field, form, ...props } = this.props

  const selectedDate = parse(
   field.value.toString(),
   SERVICE_DATE_FORMAT,
   new Date()
  )

  const isSelectedDateValid = isValid(selectedDate)

  const handleChange = date => {
   const newDate = isValid(date) ? format(date, SERVICE_DATE_FORMAT) : null
   form.setFieldValue(field.name, newDate)

   this.pickerRef.current &&
    this.pickerRef.current.handleCalendarClickOutside()

   if (props.onChange) props.onChange(newDate)
  }

  const { showCustomButtons = false, ...calenderProps } = props

  return (
   <Wrapper focus={this.state.isFocus}>
    <span className="icon-icons-16-px-calendar" />

    <ReactDatePicker
     {...calenderProps}
     {...field}
     value={
      isSelectedDateValid ? format(selectedDate, UI_DATE_FORMAT) : null
     }
     locale={tr}
     selected={isSelectedDateValid ? selectedDate : null}
     onChange={handleChange}
     ref={this.pickerRef}
     onFocus={() => this.setState({ isFocus: true })}
     onBlur={() => this.setState({ isFocus: false })}
    >
     {showCustomButtons && (
      <DateButtons>
       <DateButtonList>
        <DateButton
         type="button"
         onClick={() => handleChange(endOfMonth(new Date()))}
        >
         Ay Sonu
        </DateButton>
       </DateButtonList>
       <DateButtonList>
        <DateButton
         type="button"
         onClick={() => handleChange(addWeeks(new Date(), 1))}
        >
         7 Gün Sonra
        </DateButton>
       </DateButtonList>
       <DateButtonList>
        <DateButton
         type="button"
         onClick={() => handleChange(addMonths(new Date(), 1))}
        >
         1 Ay Sonra
        </DateButton>
       </DateButtonList>
      </DateButtons>
     )}
    </ReactDatePicker>
   </Wrapper>
  )
 }
}

export default DatePicker