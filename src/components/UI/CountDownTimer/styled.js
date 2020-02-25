import styled from 'styled-components'
import media from '../../styled/Media'

const CountDown = styled.div`
  color: ${props => props.theme.text.blue};
  font-size: 24px;
  position: absolute;
  right: 18px;
  margin-top: -15px;
  font-weight: ${props => props.theme.fonts.ProximaNovaBold};
  ${media.greaterThan('lg')`
    right: 160px;
  `}
  ${media.greaterThan('xl')`
    right: 230px;
`}
`

export default CountDown