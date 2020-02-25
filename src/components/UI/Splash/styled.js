import styled, {css} from 'styled-components'
import media from '../../styled/Media'

const LottieWrapper = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: ${props => props.theme.text.blue};
 z-index: ${props => props.theme.stackOrder.highest};
 transition: height 0.5s linear;
 ${props => props.animationEnd && css`
  height: 0;
 `};
 & + div {
  position: fixed;
  z-index: ${props => props.theme.stackOrder.highest + 1};
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 200px !important;
  height: 200px !important;
  pointer-events: none;
  ${media.greaterThan('lg')`
   width: 400px !important;
   height: 400px !important;
  `};
 }
`

export { LottieWrapper }