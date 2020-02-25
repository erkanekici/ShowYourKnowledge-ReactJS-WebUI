import styled, { css } from 'styled-components'
import media from '../../styled/Media'

const Accordion = styled.div`
 border: 1px solid ${props => props.theme.text.border};
 border-radius: 6px 6px 6px 6px;
 margin-top: 20px;
 overflow: hidden;
 .open{
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
 }
 ${media.greaterThan('lg')`
  border: none;
 `}
`

const H3 = styled.h3`
 font-size: 13px;
 font-weight: ${props => props.theme.fonts.proximanovaBold};
 color: ${props => props.theme.text.darkGray};
 background-color: ${props => props.theme.text.navBg};
 padding: 18px 16px;
 margin: 0;
 cursor: pointer;
 ${media.greaterThan('lg')`
 background-color: ${props => props.theme.text.border};
 border-radius: 12px;
 font-size: 16px;
 `}
 span {
  font-size: 16px;
  position: relative;
  top: 0px;
  float: right;
  ${media.greaterThan('lg')`
   top: 2px;
  `}
 }
`

const AccordionContent = styled.div`
 ${props => props.scroll && css`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
 `}

 ${media.greaterThan('lg')`
  padding: 10px;
 `}
`

const AccTable = styled.table`
 width: 100%;
 border-spacing: 0px;

 tr {
  :last-child{
   td{
    border-bottom: 1px solid ${props => props.theme.text.border};
   }
   td:first-child{
    ${media.greaterThan('lg')`
     border-bottom-left-radius: 12px;
    `}
   }
   td:last-child{
    ${media.greaterThan('lg')`
     border-bottom-right-radius: 12px;
    `}
   }
  }
  td {
   padding: 15px;
   border-top: 1px solid ${props => props.theme.text.border};
   font-size: 14px;
  }
  td:first-child {
   text-align: left;
   ${media.greaterThan('lg')`
    border-left: 1px solid ${props => props.theme.text.border};
   `}
  }
  td:last-child {
   text-align: right;
   ${media.greaterThan('lg')`
    border-right: 1px solid ${props => props.theme.text.border};
   `}
  }
 }
`

export { Accordion, H3, AccordionContent, AccTable }