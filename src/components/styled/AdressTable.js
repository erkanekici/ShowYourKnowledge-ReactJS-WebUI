import styled from 'styled-components'
import media from './Media'


const AdressTable = styled.table`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 border-radius: 12px;
 overflow: hidden;
 border:1px solid ${props => props.theme.text.border};
 margin-bottom: 30px;
 tr{
  :not(:last-child){
   td{
    border-bottom-color: ${props => props.theme.text.border};
   }
  }
 }
 tr:last-child{
   td:first-child{
    border-bottom-left-radius: 12px;
   }
   td:last-child {
    border-bottom-right-radius: 12px;
   }
  }
 td {
  display: block;
  border:1px solid transparent;
  padding: 13px 20px;
  font-size: 16px;
  ${media.greaterThan('lg')`
   display: table-cell;
  `}
  :not(:last-child){
   border-right-color: ${props => props.theme.text.border};
  }
  span{
   display: block;
   font-size: 10px;
   font-weight: ${props => props.theme.fonts.proximanovaBold}
   letter-spacing: 0.7px;
   margin-bottom: 5px;
  }
 }
`

const AdressTableTitle = styled.h2`
 font-weight: ${props => props.theme.fonts.proximanovaBold};
 font-size: 14px;
 margin-top: 20px;
 margin-bottom: 16px;
 ${media.greaterThan('lg')`
  font-size: 16px;
 `};
`

export {AdressTable, AdressTableTitle}
