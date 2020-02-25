import styled from 'styled-components'
import media from '../../styled/Media'
import Select from 'react-select'

const CustomSelect = styled(Select)`

 .react-select__control {
  margin-bottom: ${props => props.isQuestionSelect ? '5px' : props.isFibaKey ? '8px !important' : '12px'};
  border-radius: 6px;
  height: 40px;
  cursor: pointer;
  border-color: ${props => props.hasError ? props.theme.text.red : props.theme.text.inputGray};
  :hover{
   border-color: ${props => props.hasError ? props.theme.text.red : props.theme.text.inputGray};
  }
  ${media.greaterThan('lg')`
   margin-bottom: 12px;
   height: 50px;
   border-radius: 12px;
   max-Width: ${props => props.hasMaxWidth ? '470px' : ''};
  `}
  .react-select__value-container{
    height: 38px;
   ${media.greaterThan('lg')`
    height: 48px;
   `};
  }
  .react-select__placeholder {
   color: ${props => props.theme.text.placeHolder};
   font-size: 14px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   overflow: hidden;
   width: calc(100% - 50px);
   ${media.greaterThan('lg')`
    font-size: 16px;
   `}
  }
  .react-select__single-value {
   font-size: 14px;
   ${media.greaterThan('lg')`
    font-size: 16px;
   `}
  }
  .react-select__indicators {
   .react-select__loading-indicator{
    margin-top: 5px;
     span{
      width: 5px;
      height: 5px;
     }
     :before{
      display:none;
     }
     & ~ .react-select__indicator{
      display:none;
     }
    }
   .react-select__indicator-separator {
    display: none;
   }
   .react-select__indicator {
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 12px;
    position: absolute;
    right: 0;
    top:0;
    ${media.greaterThan('lg')`
     padding: 16px;
    `}
    :before {
     content: '\\e901';
     color: ${props => props.theme.text.black};
    }
    svg {
     display: none;
    }

   }
  }
 }
 .react-select__control--is-focused {
  background:
  linear-gradient(#fff,#fff) padding-box, /*this is your grey background*/
  linear-gradient(to right, #84bd00, #0057b8) border-box;
  border-color:transparent;
  border-radius:12px;
  box-shadow: none;
  :hover{
   border-color:transparent;
  }
 }
 .react-select__menu {
  top: 25px;
  border-radius: 6px;
  z-index: ${props => props.theme.stackOrder.high};
  ${media.greaterThan('lg')`
   top: 33px;
   border-radius: 12px;
   max-Width: ${props => props.hasMaxWidth ? '470px' : ''};
  `}
  .react-select__menu-list {
   .react-select__option {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    cursor: pointer;
    background-color: ${props => props.theme.text.main};
    ${media.greaterThan('lg')`
     height: 50px;
     line-height: 50px;
    `}
   }
   .react-select__option:hover {
    background-color: ${props => props.theme.text.navBg};
   }
   .react-select__option--is-selected {
    background-color: rgba(0, 87, 184, 0.1) !important;
    color: ${props => props.theme.text.blue};
   }
  }
 }
`

export default CustomSelect