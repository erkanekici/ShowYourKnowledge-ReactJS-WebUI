import styled from 'styled-components'
import media from './Media'

const Button = styled.button`
 border-radius: 6px;
 background-color: #0057b8;
 border: none;
 color: #fff;
 width: 100%;
 margin-top: 30px;
 padding-top: 12px;
 padding-bottom: 12px;
 font-size: 14px;
 float: ${props => props.float};
 margin-bottom: 10px;
 outline: none;
 .icon-icons-16-px-input-check{
  :before{
   color: ${props => props.theme.text.main};
   font-size: 14px;
   position: relative;
   top: 2px;
  }
 }
 ${media.greaterThan('lg')`
  width: auto;
  padding: 16px 70px;
  border-radius: 12px;
  font-size: 16px;
 `}
 :after {
  content: '';
  display: block;
  clear: both;
 }
 &:disabled {
  background: ${props => props.theme.text.border};
  border-color: ${props => props.theme.text.border};
  color: ${props => props.theme.text.inputGray};
  cursor: wait;
 }
`

const RedButton = styled.button`
 border-radius: 6px;
 background-color: #ec2e20;
 border: none;
 color: #fff;
 width: 100%;
 margin-top: 30px;
 padding-top: 12px;
 padding-bottom: 12px;
 font-size: 14px;
 float: ${props => props.float};
 margin-bottom: 10px;
 outline: none;
 .icon-icons-16-px-input-check{
  :before{
   color: ${props => props.theme.text.main};
   font-size: 14px;
   position: relative;
   top: 2px;
  }
 }
 ${media.greaterThan('lg')`
  width: auto;
  padding: 16px 70px;
  border-radius: 12px;
  font-size: 16px;
 `}
 :after {
  content: '';
  display: block;
  clear: both;
 }
 &:disabled {
  background: ${props => props.theme.text.border};
  border-color: ${props => props.theme.text.border};
  color: ${props => props.theme.text.inputGray};
  cursor: wait;
 }
`

const CenterButton = styled.div`
 text-align: center;
 button{
  display: inline-block;
 }
`

const ButtonWrapper = styled.div`
 margin: 0 -5px;
 :after {
  content: '';
  display: block;
  clear: both;
 }
 ${media.greaterThan('lg')`
  margin: 0 -10px;
 `}
`
const ButtonItem = styled.div`
 width: 50%;
 float: left;
 padding: 0 5px;
 ${media.greaterThan('lg')`
  width: auto;
  padding: 0 10px;
 `}
`
const ButtonBack = styled(Button)`
 background-color: ${props => props.theme.text.btnBack};
`

const AgainSend = styled.button`
 font-size: 14px;
 font-weight: 600;
 margin-top: 8px;
 color: ${props => props.theme.text.placeHolder};
 background-color: transparent;
 border: none;
 outline: none;
 ${media.greaterThan('lg')`
  padding: 0;
  margin-left: 15px;
  margin-top: 15px;
  font-size: 14px;
 `}
 .icon-icons-16-px-refresh {
  font-size: 16px;
  position: relative;
  top: 2px;
 }
`

const FirstPaymentButton = styled(Button)`
 margin-top: 10px;
 font-size: 16px;
 font-weight: ${props => props.theme.fonts.proximanovaSemibold};
 border: 2px solid ${props => props.theme.text.blue};
 color: ${props => props.theme.text.blue};
 background-color: transparent;
 ${media.greaterThan('lg')`
  height: 50px;
  margin-top: 0;
  margin-left: 30px;
  padding-top: 0;
  padding-bottom: 0;
 `}
`

const LinkButton = styled(Button)`
 display: block;
 text-decoration: none;
 text-align: center;
`
const BackLinkButton = styled(ButtonBack)`
 display: block;
 text-decoration: none;
 text-align: center;
`

const PaymentPlain = styled.button`
 display: block;
 border: none;
 background-color: transparent;
 padding: 0;
 color: ${props => props.theme.text.blue};
 font-size: 14px;
 font-weight: ${props => props.theme.fonts.proximanovaSemibold};
 margin-top: 13px;
 margin-bottom: 20px;
 outline: none;
 ${media.greaterThan('lg')`
  font-size: 16px;

 `}
 .button-text{
  text-decoration: underline;
  top: 0;
 }
 span {
  position: relative;
  font-size: 16px;
  margin-right: 8px;
  top: 2px;
  :before {
   color: ${props => props.theme.text.blue} !important;
  }
 }

 &:disabled {
  color: ${props => props.theme.text.navGray};
  span {
   &:before {
    color: ${props => props.theme.text.navGray} !important;
   }
  }
 }
`


const DateButtons = styled.ul`
 display: table;
 width: 100%;
 margin: 0;
 padding: 0;
 list-style: none;
 border-top: 1px solid ${props => props.theme.text.inputGray};
`

const DateButtonList = styled.li`
 display: table-cell;
 position: relative;
 padding: 0 15px;
 :not(:first-child){
  :before{
   content: "";
   display: block;
   width: 4px;
   height: 4px;
   background-color: ${props => props.theme.text.inputGray};
   border-radius: 50%;
   position: absolute;
   top: 16px;
   left: -2px;
  }
 }
`

const DateButton = styled.button`
 background-color: transparent;
 border: 0;
 width: 100%;
 padding: 12px 0 14px 0;
 font-size: 13px;
 text-align: center;
 font-weight: ${props => props.theme.fonts.proximanovaSemibold};
 color: ${props => props.theme.text.blue};
 outline: none;
`
export default Button

export {
 ButtonWrapper,
 ButtonItem,
 ButtonBack,
 AgainSend,
 FirstPaymentButton,
 LinkButton,
 BackLinkButton,
 PaymentPlain,
 DateButtons,
 DateButton,
 DateButtonList,
 CenterButton,
 RedButton
}