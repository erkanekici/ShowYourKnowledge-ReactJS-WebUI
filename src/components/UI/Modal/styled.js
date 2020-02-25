import styled from 'styled-components'
import media from '../../styled/Media'
import Button from '../../styled/Button'

const Wrapper = styled.div`
 background: ${props => props.theme.text.main};
 border-radius: 6px;
 overflow-x: hidden;
 display: inline-block;
 vertical-align: middle;
 text-align: left;
 width: ${props => props.smallModal ? "auto" : "100%"};
 ${media.greaterThan('lg')`
  max-width: ${props => props.unsuccess ? "615px" : "850px"};
  width: ${props => props.smallModal ? "auto" : "100%"};
  margin: 0 auto;
  border-radius: 12px;
 `}
`

const ModalOverlay = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 z-index: ${props => props.theme.stackOrder.mid};
 width: 100%;
 height: 100%;
 overflow-x: hidden;
 overflow-y: auto;
 background-color: rgba(33, 38, 44, 0.85);
 padding: 15px;
 display: ${props => (props.isActive ? 'block' : 'none')};
 text-align: center;
 :before{
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    margin-right: -4px;
 }
`

const ModalHead = styled.div`
 border-bottom: 1px solid ${props => props.theme.text.border};
 padding: 15px 40px 15px 15px;
 display: ${props => props.unsuccess ? "none" : "block" };
 ${media.greaterThan('lg')`
  padding: 20px 40px 20px 20px;
 `}
 position: relative;
 :after {
  content: '';
  display: block;
  clear: both;
 }
 h2 {
  font-size: 16px;
  line-height: 18px;
  font-weight: ${props => props.theme.fonts.proximanovaSemibold};
  letter-spacing: 0.3px;
  float: left;
  margin: 6px 0 0 0;
  ${media.greaterThan('lg')`
   font-size: 20px;
   line-height: 22px;
   margin-left: 15px;
  `}
 }
 button {
  float: right;
  border: 0;
  background-color: transparent;
  outline: none;
  padding: 0;
  position: absolute;
  top: 15px;
  right: 10px;
  ${media.greaterThan('lg')`
   top: 20px;
  `}
  span {
   font-size: 34px;
  }
 }
`
const ModalCloseButton = styled.div`
 display: block
 position: relative
 ${media.greaterThan('lg')`
  top: -40px
 `}
 :after {
  content: '';
  display: block;
  clear: both;
 }
 button {
  float: right;
  border: 0;
  background-color: transparent;
  outline: none;
  padding: 0;
  position: absolute;
  top: 15px;
  right: 10px;
  ${media.greaterThan('lg')`
   top: 20px;
  `}
  span {
   font-size: 40px;
  }
 }
`

const PaymentTypeList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  ${media.greaterThan('lg')`
   :after{
    content: "";
    display: block;
    clear: both;
   }
   margin: 0 -8px;
  `}
  li {
   padding: 20px 0;
   text-align: center;
   border: 2px solid ${props => props.theme.text.border};
   border-radius: 6px;
   ${media.greaterThan('lg')`
    width: calc(33.33336% - 16px);
    margin: 0 8px;
    float: left;
   `}
   div{
    sup{
     font-size: 16px;
    }
   }
   div:nth-child(1) {
    font-size: 12px;
    color: ${props => props.theme.text.btnBack};
    margin-bottom: 10px;
    font-weight: ${props => props.theme.fonts.proximanovaBold};
   }
   div:nth-child(2) {
    font-size: 26px;
    font-weight: ${props => props.theme.fonts.proximanovaMedium};
   }
   :not(:last-child) {
    margin-bottom: 10px;
   }
  }
`

const PaymentTypeTable = styled.table`

   border: 0;
   width: 100%;
   margin-top: 15px;
   ${media.greaterThan('lg')`
    border-spacing: 0;
    border-collapse: collapse;
   `}

  thead {
   border: none;
   height: 1px;
   margin: -1px;
   overflow: hidden;
   padding: 0;
   position: absolute;
   width: 1px;
   ${media.greaterThan('lg')`
    position: static;
   `}
  }

  tbody {
   ${media.greaterThan('lg')`
    box-shadow: 0 0 0 1px ${props => props.theme.text.border};
    border-radius: 12px;
   `}
  }

  th {
   ${media.greaterThan('lg')`
    font-size: 12px;
    color: ${props => props.theme.text.blue};
    text-align: center;
    padding-bottom: 8px;
   `}
  }

  tr {
   border: 1px solid ${props => props.theme.text.border};
   display: block;
   margin-bottom: 15px;
   ${media.greaterThan('lg')`
    display: table-row;
    border: none;
   `}
  }

  tr:first-child td:first-child {
   border-top-left-radius: 12px;
  }

  tr:first-child td:last-child {
   border-top-right-radius: 12px;
  }

  tr:last-child td:first-child {
   border-bottom-left-radius: 12px;
  }

  tr:last-child td:last-child {
   border-bottom-right-radius: 12px;
  }

  tr:nth-child(even) td {
   ${media.greaterThan('lg')`
    background-color: #f4f5f9;
   `}
  }

  tr:nth-child(odd) td {
   ${media.greaterThan('lg')`
    background-color: #fff;
   `}
  }

  td {
   display: block;
   font-size: 14px;
   text-align: right;
   padding: 10px;
   ${media.greaterThan('lg')`
    display: table-cell;
    line-height: 2;
    text-align: center;
   `}
  }

  td:nth-child(even) {
   background-color: #f4f5f9;
  }

  td::before {
   content: attr(data-label);
   float: left;
   font-weight: bold;
   font-size: 12px;
   color: ${props => props.theme.text.blue};
   ${media.greaterThan('lg')`
    display: none;
   `}
  }

  td:last-child {
   border-bottom: 0;
  }
`

const ModalBody = styled.div`
`

const ModalButton = styled(Button)`
  padding-left: 30px !important;
  padding-right: 40px !important;
  span{
   margin-right: 10px;
   position:relative;
   top: -1px;
  }
`

const UnSuccess = styled.img`
  display: block;
  height: 70px;
  margin: 0 auto;
`

const UnSuccessTitle =styled.div`
  font-size: 20px;
  font-weight: ${props => props.theme.fonts.proximanovaSemibold};
  color : ${props => props.theme.text.red};
  text-align: center;
  margin-top: 12px;
  margin-bottom: 20px;
`

export { Wrapper, ModalOverlay, ModalHead, ModalBody, PaymentTypeList, PaymentTypeTable, UnSuccess, UnSuccessTitle, ModalButton, ModalCloseButton }
