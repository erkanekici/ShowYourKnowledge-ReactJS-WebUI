import styled from 'styled-components'
import media from './Media'

const ListStyle = styled.div`
   text-align: center;
 ${media.greaterThan('lg')`
  //
 `}
 ${media.greaterThan('xl')`
  //
 `}
`

export default ListStyle