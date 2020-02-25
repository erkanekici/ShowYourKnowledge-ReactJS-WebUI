import styled, { css } from 'styled-components'
import media from '../styled/Media'

const List = styled.ul`
 margin: 0;
 margin-left: 20px;
 padding: 0;
`

const Item = styled.li`
 border: solid 1px ${props => props.theme.text.placeHolder};
 border-radius: 6px;
 font-size: 12px;
 letter-spacing: 0.3px;
 font-weight: ${props => props.theme.fonts.proximanovaMedium};
 position: relative;
 padding: 0 10px;
 >div{
  margin-top: 0;
  border: none;
  >div{
   ${media.greaterThan('lg')`
    padding: 0;
   `}
  }

 }
 >div h3{
  background-color: transparent;
  padding-left: ${props => (props.checked ? '30px' : '0')};

  span{
   position:absolute;
   top: 18px;
   right: 10px;
  }
 }
 a {
  display: block;
  padding: 10px 12px;
  text-decoration: none;
  color: ${props => props.theme.text.darkGray} ${media.greaterThan('lg')`
      padding: 13px 15px;
    `};
 }
 ${props =>
  props.checked
   ? css`
     -webkit-box-shadow: 0px 0px 10px 0px rgba(132, 189, 0, 0.8);
     -moz-box-shadow: 0px 0px 10px 0px rgba(132, 189, 0, 0.8);
     box-shadow: 0px 0px 10px 0px rgba(132, 189, 0, 0.8);
     border: 2px solid ${props => props.theme.text.green};
    `
   : css`
     -webkit-box-shadow: 0px 0px 4px 4px rgba(232, 233, 235, 1);
     -moz-box-shadow: 0px 0px 4px 4px rgba(232, 233, 235, 1);
     box-shadow: 0px 0px 4px 4px rgba(232, 233, 235, 1);
    `}
 ${media.greaterThan('lg')`
    font-size: 16px;
    border-radius: 12px;
  `}
  :not(:last-child) {
  margin-bottom: 12px;
  ${media.greaterThan('lg')`
      margin-bottom: 16px;
    `}
 }
 :before {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\\e909';
  color: #84bd00;
  display: ${props => (props.checked ? 'inline-block' : 'none')};
  width: 20px;
  height: 20px;
  background-color: ${props => props.theme.text.green};
  color: ${props => props.theme.text.main};
  border-radius: 50%;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
  position: absolute;
  left: 12px;
  top: 24px;
  margin-top: -10px;
  ${media.greaterThan('lg')`
   top: 27px;
    `}
 }
`

export { List, Item }