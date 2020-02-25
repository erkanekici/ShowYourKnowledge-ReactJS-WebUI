import styled, { css } from 'styled-components'
import media from './Media'

const Table = styled.table`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0px 3px;
 margin-bottom: 12px;
`

const Tr = styled.tr`
 border-radius: 6px;
 cursor: pointer;
 ${media.greaterThan('lg')`
  border-radius: 12px;
 `}

 ${props =>
  props.checked &&
  css`
   & td{
    background-color: #84bd00;
   }
   color: ${props => props.theme.text.main};
   box-shadow: 0 5px 15px 0 rgba(105, 147, 8, 0.55);
  `}

  ${props =>
   props.hasError &&
   css`
    td {
     border-color: red !important;
    }
   `}
`

const Thead = styled.thead``

const Th = styled.th`
 font-size: 12px;
 font-weight: ${props => props.theme.fonts.proximanovaBold};
 color: #0057b8;
 padding: 0 10px 7px 10px;
 text-align: center;

 ${media.greaterThan('lg')`
  padding: 0 0 5px 0;
 `}

 ${props => props.hiddenXS && css`
  display: none;
  ${media.greaterThan('lg')`
   display: table-cell;
  `}
 `}

 &:nth-child(2) {
  text-align: left;
  ${media.greaterThan('lg')`
   width: 150px;
  `}
 }

 &:nth-child(3) {
  text-align: left;
  ${media.greaterThan('lg')`
   text-align: center;
  `}
 }

 &:last-child {
  text-align: right;
  ${media.greaterThan('lg')`
   text-align: center;
  `}
 }

 /* &:nth-child(2) {
  text-align: left;
  width: 150px;
  ${media.greaterThan('lg')`
   width: 100px;
  `}
  ${media.greaterThan('xl')`
   width: 200px;
  `}
 }
 &:nth-child(3) {
  text-align: right;
  ${media.greaterThan('lg')`
   text-align: center;
  `}
 } */
`

const Tbody = styled.tbody``

const Td = styled.td`
 font-size: 14px;
 border-top: solid 1px ${props => props.theme.text.inputGray};
 border-bottom: solid 1px ${props => props.theme.text.inputGray};
 vertical-align: top;
 text-align: center;

 ${media.greaterThan('lg')`
  vertical-align: middle;
 `}

 ${props => props.hiddenXS && css`
  display: none;
  ${media.greaterThan('lg')`
   display: table-cell;
  `}
 `}

 &:first-child {
  ${media.greaterThan('lg')`
   border-left: solid 1px ${props => props.theme.text.inputGray};
   border-top-left-radius: 12px;
   border-bottom-left-radius: 12px;
  `}
 }

 &:nth-child(2) {
  ${media.greaterThan('lg')`
   text-align: left;
  `}
 }

 &:nth-child(3) {
  text-align: left;
  border-left: solid 1px ${props => props.theme.text.inputGray};
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  padding-left: 10px;
  ${media.greaterThan('lg')`
   text-align: center;
   padding-left: auto;
   border-left: 0;
   border-radius: 0;
   padding-left: 0;
  `}
 }

 &:last-child {
  text-align: right;
  border-right: solid 1px ${props => props.theme.text.inputGray};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding-right: 10px;

  ${media.greaterThan('lg')`
   border-top-right-radius: 12px;
   border-bottom-right-radius: 12px;
   padding-right: 0;
   text-align:center;
  `}
 }
`

const ColumnText = styled.span`
 display: block;
 padding-top: 12px;
 padding-bottom: 12px;
 ${media.greaterThan('lg')`
  padding: 20px 0;
 `}
`

export { Table, Tr, Th, Td, Thead, Tbody, ColumnText }
