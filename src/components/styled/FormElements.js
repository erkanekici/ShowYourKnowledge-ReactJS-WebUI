import styled, {css} from 'styled-components'
import media from './Media'

const Label = styled.label`
 display: block;
 margin-bottom: ${props => (props.isSmall ? '0px' : '4px')};
 font-size: ${props => (props.isSmall ? '13px' : '14px')};
 font-family: ${props => (props.isSmall ? 'calibri' : 'proximanova')};
 font-weight: normal;
 font-style: normal;
 font-stretch: normal;
 line-height: normal;
 letter-spacing: normal;
 ${media.greaterThan('lg')`
  font-size: 16px;
  margin-bottom: 10px;
 `}
`

const StyledField = styled.div`
 box-sizing: border-box;
 display: block;
 width: 100%;
 height: ${props => (props.isSmall ? '25px' : '40px')};
 padding: 0 13px;
 font-size: ${props => (props.isSmall ? '13px' : '14px')};
 font-weight: 400;
 line-height: 1.5;
 color: ${props => props.theme.text.darkGray};
 background-color: ${props => props.theme.text.main};
 background-clip: padding-box;
 &::-ms-clear{
  display: none;
 }
 border: solid 1px
  ${props =>
   props.hasError
    ? `${props.theme.text.red} !important`
    : props.theme.text.inputGray};
 border-radius: 6px;
 margin-bottom: ${props => (props.isSmall ? '5px' : '10px')};
 outline: none;
 :focus {
  background: linear-gradient(#fff, #fff) padding-box,
   /*this is your grey background*/
    linear-gradient(to right, #84bd00, #0057b8) border-box;
  border: 1px solid transparent;
 }
 :disabled{
  background-color: ${props => props.theme.text.disabled};
 }
 :-webkit-autofill:focus {
  border: 1px solid ${props => props.theme.text.inputGray};
 }
 ${media.greaterThan('lg')`
  height: 50px;
  border-radius: 12px;
  font-size: 16px;
  max-width: ${props => (props.cwidth === 'full' ? '100%' : '470px')};
 `}
 &::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: ${props => props.theme.text.placeHolder};
 }
 &::-moz-placeholder {
  /* Firefox 19+ */
  color: ${props => props.theme.text.placeHolder};
 }
 &:-ms-input-placeholder {
  /* IE 10+ */
  color: ${props => props.theme.text.placeHolder};
 }
 &:-moz-placeholder {
  /* Firefox 18- */
  color: ${props => props.theme.text.placeHolder};
 }
`

const InputGroupPrepend = styled.span`
 display: table-cell;
 padding: 0px 14px;
 font-size: 14px;
 height: 40px;
 text-align: center;
 border: solid 1px

  ${props =>
   props.hasError ? props.theme.text.red : props.theme.text.inputGray};
 border-right: 0;
 background-color: ${props => props.theme.text.navBg};
 border-bottom-left-radius: 6px;
 border-top-left-radius: 6px;
 vertical-align: middle;
 width: 2%;
 ${media.greaterThan('lg')`
   white-space: nowrap;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
 `}
`

const InputGroup = styled.div`
 position: relative;
 display: table;
 width: 100%;
 margin-bottom: 12px;
 ${media.greaterThan('lg')`
  max-width: ${props => (props.cwidth === 'full' ? '100%' : '470px')};
 `}
 ${StyledField} {
  display: table-cell;
  position: relative;
  z-index: 2;
  float: left;
  width: 100%;
  margin-bottom: 0;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  border-left-color: ${props =>
   props.hasError ? props.theme.text.inputGray : ''};
 }
`

const ErrMsg = styled.div`
  padding: 5px;  
  line-height:30px;
  color: white;
  background-color: ${props => props.theme.text.red};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-size: ${props => (props.isSmall ? '13px' : '14px')};
  font-family: "Roboto","Helvetica","Arial", sans-serif;
  position: relative;
  top: ${props => (props.marginclear ? '0px' : '-5px')};
  margin-bottom:'5px'; 
`

const InfoMsg = styled.div`
  padding: 5px;  
  line-height:30px;
  color: black;
  background-color: ${props => props.theme.text.blue};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-size: ${props => (props.isSmall ? '13px' : '14px')};
  font-family: "Roboto","Helvetica","Arial", sans-serif;
  position: relative;
  top: ${props => (props.marginclear ? '0px' : '-5px')};
  margin-bottom:'5px'; 
`

const PasswordInput = styled.div`
> div {
 width: 100%;
 margin-top: 4px;
 margin-bottom: 8px;
 ${media.greaterThan('lg')`
  margin-top: 10px;
  margin-bottom: ${props => (props.isSaveFibaKeyInput ? '10px' : '8px')};
 `}
 > div {
  padding-right: 0px;
  > div {
   margin-bottom: 0px;
   ${media.greaterThan('lg')`
    margin-bottom: 0px;
   `}
   margin-left: -50px;
  }
  > input {
   box-sizing: border-box;
   display: block;
   width: 100%;
   height: 40px;
   padding: 0 13px;
   font-size: 14px;
   font-weight: 400;
   line-height: 1.5;
   color: ${props => props.theme.text.darkGray};
   background-color: ${props => props.theme.text.main};
   background-clip: padding-box;
   margin-bottom: 0px !important;
   ${media.greaterThan('lg')`
    margin-bottom: 10px;
   `}
   &::-ms-clear{
    display: none;
   }
   border: solid 1px
   ${props =>
   props.hasError
    ? `${props.theme.text.red } !important`
    : props.theme.text.inputGray};
   border-radius: 6px;
   margin-bottom: 10px;
   outline: none;
   :focus {
   background: linear-gradient(#fff, #fff) padding-box,
    /*this is your grey background*/
    linear-gradient(to right, #84bd00, #0057b8) border-box;
   border: 1px solid transparent;
   }
   :disabled{
    background-color: ${props => props.theme.text.disabled};
   }
   :-webkit-autofill:focus {
    border: 1px solid ${props => props.theme.text.inputGray};
   }
   ${media.greaterThan('lg')`
   height: 50px;
   border-radius: 12px !important;
   font-size: 16px;
   max-width: ${props => (props.cwidth === 'full' ? '100%' : '470px')};
   `}
   &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: ${props => props.theme.text.placeHolder};
   }
   &::-moz-placeholder {
    /* Firefox 19+ */
    color: ${props => props.theme.text.placeHolder};
   }
   &:-ms-input-placeholder {
    /* IE 10+ */
    color: ${props => props.theme.text.placeHolder};
   }
   &:-moz-placeholder {
    /* Firefox 18- */
    color: ${props => props.theme.text.placeHolder};
   }
   &::placeholder {
    color: ${props => props.theme.text.placeHolder};
    opacity: 1;
    font-family: 'proximanova';
   }
  }
  > fieldset {
   border: none;
  }
 }
 > p {
  margin-top: 5px;
  margin-left: 0px;
  color: #ff0000 !important;
  font-family: 'proximanova';
  font-size: 14px;
  ${media.greaterThan('lg')`
   margin-top: 10px !important;
   margin: 0;
  `}
 }
}
`

const Checkbox = styled.div`
 display: inline-block;
 margin-right: 10px;
 ${media.greaterThan('lg')`
  margin-right: 20px;
 `}
 > input {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
  z-index: ${props => props.theme.stackOrder.low};
 }
 > input:disabled + label:before{
  background-color: ${props => props.theme.text.disabled};
 }
 > input:disabled + label{
  color: ${props => props.theme.text.inputGray};
 }
 > input + label {
  position: relative;
  display: block;
  padding-left: 34px;
  cursor: pointer;
  color: ${props => props.theme.text.darkGray};
  font-size: 13px;
  line-height: 16px;
  min-height: 20px;
  margin-bottom: 7px;
  padding-top: 3px;
  ${media.greaterThan('lg')`
   font-size: 16px;
  `}
  &:before {
   content: '';
   position: absolute;
   left: 0;
   top: 50%;
   width: 19px;
   height: 19px;
   border: 1px solid
    ${props =>
     props.hasError ? props.theme.text.red : props.theme.text.placeHolder};
   border-radius: 2px;
   transform: translateY(-50%);
   ${media.greaterThan('lg')`
   top: 0;
   transform: translateY(0%);
   `}
  }
  &:after {
   content: '';
   position: absolute;
   top: 50%;
   left: 5px;
   width: 9px;
   height: 4px;
   border: 2px solid ${props => props.theme.text.main};
   border-top: 0;
   border-right: 0;
   transform: rotate(-45deg) translateY(-50%) translateX(4px);
   ${media.greaterThan('lg')`
    top: 11px;
   `}
  }
  button {
   padding: 0;
   border: 0;
   background-color: transparent;
   display: contents;
   font-weight: ${props => props.theme.fonts.proximanovaSemibold};
   color: ${props => props.theme.text.blue};
   text-decoration: underline;
  }
 }
 > input:not(:checked) + label {
  &:after {
   opacity: 0;
  }
 }
 > input:checked + label {
  &:after {
   opacity: 1;
  }
  &:before {
   background-image: linear-gradient(135deg, #0057b8, #84bd00);
   background-color: #0057b8\0 !important;
   border: 0;
   width: 21px;
   height: 21px;
  }
 }

 > input[type=checkbox]:indeterminate + label {
  &:after {
   opacity: 1;
   transform: rotate(0) translateY(-50%) translateX(4px);
   left: 2px;
   width: 8px;
   height: 0;
  }
  &:before {
   background-image: linear-gradient(135deg, #0057b8, #84bd00);
   background-color: #0057b8\0 !important;
   border: 0;
   width: 22px;
   height: 22px;
  }
 }
`

const DocumentCheckbox = styled.div`
 display: inline-block;
 margin-right: 10px;
 ${media.greaterThan('lg')`
  margin-right: 20px;
 `}
 > input {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
  z-index: ${props => props.theme.stackOrder.low};
 }
 > input:disabled + label:before{
  background-color: ${props => props.theme.text.disabled};
 }
 > input:disabled + label{
  color: ${props => props.theme.text.inputGray};
 }
 > input + label {
  position: relative;
  display: block;
  padding-left: 34px;
  cursor: pointer;
  color: ${props => props.theme.text.darkGray};
  font-size: 13px;
  line-height: 16px;
  min-height: 20px;
  margin-bottom: 7px;
  padding-top: 3px;
  ${media.greaterThan('lg')`
   font-size: 16px;
  `}
  &:before {
   content: '';
   position: absolute;
   left: 0;
   top: 50%;
   width: 19px;
   height: 19px;
   border: 2px solid
    ${props =>
     props.hasError ? props.theme.text.red : props.theme.text.black};
   border-radius: 2px;
   transform: translateY(-50%);
   ${media.greaterThan('lg')`
   top: 0;
   transform: translateY(0%);
   `}
  }
  &:after {
   content: '';
   position: absolute;
   top: 50%;
   left: 5px;
   width: 9px;
   height: 4px;
   border: 2px solid ${props => props.theme.text.main};
   border-top: 0;
   border-right: 0;
   transform: rotate(-45deg) translateY(-50%) translateX(4px);
   ${media.greaterThan('lg')`
    top: 11px;
   `}
  }
  button {
   padding: 0;
   border: 0;
   background-color: transparent;
   display: contents;
   font-weight: ${props => props.theme.fonts.proximanovaSemibold};
   color: ${props => props.theme.text.blue};
   text-decoration: underline;
  }
 }
 > input:not(:checked) + label {
  &:after {
   opacity: 0;
  }
 }
 > input:checked + label {
  &:after {
   opacity: 1;
  }
  &:before {
   background-image: linear-gradient(135deg, #0057b8, #84bd00);
   background-color: #0057b8\0 !important;
   border: 0;
   width: 21px;
   height: 21px;
  }
 }

 > input[type=checkbox]:indeterminate + label {
  &:after {
   opacity: 1;
   transform: rotate(0) translateY(-50%) translateX(4px);
   left: 2px;
   width: 8px;
   height: 0;
  }
  &:before {
   background-image: linear-gradient(135deg, #0057b8, #84bd00);
   background-color: #0057b8\0 !important;
   border: 0;
   width: 22px;
   height: 22px;
  }
 }
`

const Radio = styled(Checkbox)`
 > input + label:before {
  border-radius: 50%;
 }
 ${props => props.permission && css`
  ${media.greaterThan('lg')`
   font-size: 18px;
  `}
  font-weight: ${props => props.theme.fonts.proximanovaBold};
 `}
`


const CountDown = styled.div`
 position: relative;
 ${media.greaterThan('lg')`
  max-width: 470px;
  width: 100%;
  float:left;
 `}
`

const Count = styled.span`
 color: ${props => props.theme.text.red};
 font-size: 14px;
 position: absolute;
 right: 13px;
 line-height: 40px;
 font-weight: ${props => props.theme.fonts.proximanovaMedium};
 ${media.greaterThan('lg')`
  line-height: 50px;
 `}
`

const CheckboxWrapper = styled.div`
 > input + label {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 auto;
  border: solid 1px ${props => props.theme.text.border};
  background-color: #f4f5f9;
  span {
   display: none;
  }
 }
 > input:checked + label {
  background-color: #fff;
  span {
   display: block;
   line-height: 20px;
   text-align: center;
  }
 }
 input {
  display: none;
 }
`

const CheckboxLabel = styled.label``

const FirstPaymentDate = styled.div`
 position: relative;
 .icon-icons-16-px-calendar {
  :before {
   ${props => props.colored ? css`
    color: ${props => props.theme.text.blue} !important;
   ` : css`
    color: ${props => props.focus ? props.theme.text.blue : props.theme.text.inputGray};
   `}


   color: ${props => props.focus ? props.theme.text.blue : props.theme.text.inputGray};
  }
 }
 .react-datepicker-wrapper {
  float: ${props => (props.fclear ? 'none !important' : 'left')};
 }
 .react-datepicker-popper {
  background-color: ${props => props.theme.text.main};
  z-index: ${props => props.theme.stackOrder.mid};
  border: 1px solid
   ${props =>
    props.hasError ? props.theme.text.red : props.theme.text.inputGray};
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transform: none !important;
  top: 35px !important;
  .react-datepicker {
   border: 0;
   background-color: transparent;
   .react-datepicker__month-container {
    float: none;
   }
   .react-datepicker__triangle {
    border-bottom-color: ${props => props.theme.text.main};
    left: 20px;
    :before {
     border-bottom-color: ${props => props.theme.text.inputGray};
    }
   }
   .react-datepicker__navigation--previous {
    border: 0;
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-indent: 0;
    width: 16px;
    height: 16px;
    color: transparent;
    font-size: 16px;
    margin-top: 12px;
    :before {
     content: '\\e90b';
     display: block;
     color: ${props => props.theme.text.darkGray};
    }
   }
   .react-datepicker__navigation--next {
    border: 0;
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-indent: 0;
    width: 16px;
    height: 16px;
    color: transparent;
    font-size: 16px;
    margin-top: 12px;
    :before {
     content: '\\e90e';
     color: ${props => props.theme.text.darkGray};
    }
   }
   .react-datepicker__header {
    background-color: ${props => props.theme.text.main};
    border-bottom: 0;
    border-radius: 12px;
    .react-datepicker__current-month {
     font-size: 16px;
     line-height: 1;
     color: ${props => props.theme.text.darkGray};
     font-weight: ${props => props.theme.fonts.proximanovaRegular};
     padding-top: 15px;
     padding-bottom: 15px;
    }
    .react-datepicker__day-names {
     border-top: 1px solid ${props => props.theme.text.inputGray};
     border-bottom: 1px solid ${props => props.theme.text.inputGray};
     .react-datepicker__day-name {
      font-size: 13px;
      color: ${props => props.theme.text.darkGray};
      opacity: 0.4;
      font-weight: ${props => props.theme.fonts.proximanovaSemibold};
     }
    }
   }

   .react-datepicker__month {
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
     width: 36px;
     line-height: 36px;
     font-size: 13px;
    }
    .react-datepicker__day--today {
     position: relative;
     :before {
      content: '';
      display: block;
      width: 26px;
      height: 26px;
      border: 1px solid ${props => props.theme.text.blue};
      position: absolute;
      border-radius: 50%;
      top: 3px;
      left: 4px;
      z-index: -1;
     }
    }
    .react-datepicker__day--selected {
     background-color: transparent;
     position: relative;
     color: ${props => props.theme.text.main};
     font-weight: ${props => props.theme.fonts.proximanovaMedium};
     :before {
      content: '';
      display: block;
      width: 26px;
      height: 26px;
      border: 1px solid ${props => props.theme.text.blue};
      background-color: ${props => props.theme.text.blue};
      position: absolute;
      border-radius: 50%;
      top: 3px;
      left: 4px;
      z-index: -1;
     }
    }
   }
  }
 }

 ${media.greaterThan('lg')`
  width: 100%;
 `}
 ${StyledField} {
  padding-left: 50px;
  ${media.greaterThan('lg')`
   ${StyledField}{
   width: ${props => (props.cwidth === 'full' ? '100%' : '200px')};
    float:left;
   }
  `}
 }
 .react-datepicker-wrapper {
  width: 100%;
  ${media.greaterThan('lg')`
  width: ${props => (props.cwidth === 'full' ? '100%' : 'auto')};
   float: left;
  `}
  .react-datepicker__input-container {
   width: 100%;
   input {
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 40px;
    ${props => props.colored && css`
     background: linear-gradient(#fff,#fff) padding-box, linear-gradient(to right,#84bd00,#0057b8) border-box !important;
     border: 1px solid transparent !important;
    `}

   }
   ${media.greaterThan('lg')`
    width: ${props => (props.cwidth === 'full' ? '100%' : 'auto')};
   `}
  }
 }
 span {
  position: absolute;
  top: 12px;
  left: 14px;
  z-index: 9;
  cursor: pointer;
  ${media.greaterThan('lg')`
   top: 17px;
  `}
 }
`


const HoverBox = styled.div`
 position: relative;
 display: inline-block;
 border-bottom: 1px dotted black;
 > span {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -30px;
  opacity: 0;
  transition: opacity 0.3s;
  :after{
   content: "";
   position: absolute;
   top: 100%;
   left: 50%;
   margin-left: -5px;
   border-width: 5px;
   border-style: solid;
   border-color: #555 transparent transparent transparent;
  }
 }
 :hover{
  > span {
   visibility: visible;
   opacity: 1;
  }
 }
`

export {
 Label,
 StyledField,
 InputGroup,
 ErrMsg,
 InfoMsg,
 InputGroupPrepend,
 Checkbox,
 DocumentCheckbox,
 CountDown,
 Count,
 CheckboxLabel,
 CheckboxWrapper,
 FirstPaymentDate,
 Radio,
 PasswordInput,
 HoverBox
}