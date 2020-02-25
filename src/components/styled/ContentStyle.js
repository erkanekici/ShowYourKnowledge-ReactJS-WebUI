import styled from 'styled-components'
import media from './Media'

const ContentStyle = styled.div`
 min-height: calc(100vh - 110px);
 ${media.greaterThan('lg')`
  //min-height: calc(100vh - 110px);
 `}
 ${media.greaterThan('xl')`
  //min-height: calc(100vh - 110px);
 `}
`

export default ContentStyle