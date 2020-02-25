import styled from 'styled-components'
import media from '../../styled/Media'

const Wrapper = styled.nav`
 position: absolute;
 display: table;
 height: 100vh;
 top: 0;

 ul {
  list-style: none;
  padding: 0;
  width: 36px;
  display: table-cell;
  vertical-align: middle;
  ${media.greaterThan('lg')`width: 52px;`}
  a, span {
   display: block;
   width: 16px;
   height: 16px;
   border: 2px solid transparent;
   padding: 2px;
   box-sizing: border-box;
   transform: rotate(45deg);
   margin: 0 auto;
   margin-top: 7px;
   margin-bottom: 7px;

   &.passed {
    :before {
     background-color: ${props => props.theme.text.blue};
    }
   }

   &.selected {
    border: 2px solid ${props => props.theme.text.green};
    :before {
     background-color: ${props => props.theme.text.green};
    }
   }

   :before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.text.navGray};
   }
  }
 }
`

export default Wrapper