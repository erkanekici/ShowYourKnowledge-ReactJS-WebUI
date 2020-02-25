import styled from 'styled-components'
import media from './Media'

const MainContent = styled.div`
 height: auto;
 overflow: hidden;
 text-align: center;
 background-color: #ff9100;
 min-height: calc(100vh - 210px);
 ${media.greaterThan('lg')`
  width: 500px;
  margin: 0 auto;
  // position: relative;
  overflow: visible;
  padding-bottom: 50px;
  padding-top: 50px;
 `}
 ${media.greaterThan('xl')`
  width: 1040px;
    margin: 0 auto;
  // position: relative;
  overflow: visible;
  padding-bottom: 50px;
  padding-top: 50px;
 `}
`

export default MainContent