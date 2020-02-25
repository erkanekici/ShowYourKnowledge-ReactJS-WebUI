import styled from 'styled-components'
import media from './Media'

const FooterStyle = styled.div`
    padding: 10px;
    margin-top: auto;
    background-color: black;
    font-size: 0.875rem;
    font-family: "Roboto", "Helvetica", "Arial" , "sans-serif";
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: 0.01071em;
 ${media.greaterThan('lg')`
  //
 `}
 ${media.greaterThan('xl')`
  //
 `}
`

export default FooterStyle