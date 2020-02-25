import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import media from '../../styled/Media'

const CustomScroll = styled(Scrollbars)`
 width: 100%;
 height: 100%;
 min-height: ${props => (props.unsuccess ? '0' : '300px')};
 & > div {
  position: ${props => (props.unsuccess ? 'static' : 'absolute')} !important;
 }
 ${media.greaterThan('lg')`
  min-height: ${props => (props.unsuccess ? '0' : '400px')};
 `}
 ${media.greaterThan('xl')`
  min-height: ${props => (props.unsuccess ? '0' : '500px')};
 `}
 .scroll-content {
  padding: 15px;
  ${media.greaterThan('lg')`
    padding: 30px;
  `}
 }
`

export default CustomScroll