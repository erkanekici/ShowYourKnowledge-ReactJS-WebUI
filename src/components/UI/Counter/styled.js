import styled from 'styled-components'
import media from '../../styled/Media'

const Count = styled.span`
  color: ${props => props.theme.text.red};
  font-size: 14px;
  position: absolute;
  right: 13px;
  line-height: 40px;
  font-weight: ${props => props.theme.fonts.proximanovaMedium};
  ${media.greaterThan('lg')`
    line-height: 50px;
  `}
`

export default Count