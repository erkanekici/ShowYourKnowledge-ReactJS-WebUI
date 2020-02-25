import styled from 'styled-components'
import media from './Media'

const PersonelInfoNav = styled.nav`
 padding: 10px;
 background-color: ${props => props.theme.text.navBg};
 border-radius: 12px;
 margin-bottom: 20px;
 margin-top: 25px;
 ${media.greaterThan('lg')`padding: 20px;`}
 ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: table;
  table-layout: fixed;
  width: 100%;
  li {
   display: table-cell;
   text-align: center;
   position: relative;
   :not(:last-child) {
    :before {
     content: '';
     display: block;
     width: calc(100% - 50px);
     height: 1px;
     background-color: ${props => props.theme.text.navGray};
     position: absolute;
     left: calc(50% + 25px);
     bottom: 14px;
    }
   }
   > span {
    font-size: 14px;
    color: ${props => props.theme.text.placeHolder};
    font-weight: ${props => props.theme.fonts.proximanovaBold};
    padding-bottom: 30px;
    display: block;
    ${media.greaterThan('lg')`
     font-size: 16px;
     padding-bottom: 35px;
    `}
   }
   .selected {
    color: ${props => props.theme.text.darkGray};
    .nav-dot {
     border-color: ${props => props.theme.text.green};
     :before {
      background-color: ${props => props.theme.text.green};
     }
    }
   }
   .nav-dot {
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    padding: 2px;
    box-sizing: border-box;
    transform: rotate(45deg);
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 7px;
    left: 0;
    right: 0;
    bottom: 0;
    :before {
     content: '';
     display: block;
     width: 8px;
     height: 8px;
     background-color: ${props => props.theme.text.navGray};
    }
   }
  }
 }
`

export { PersonelInfoNav }