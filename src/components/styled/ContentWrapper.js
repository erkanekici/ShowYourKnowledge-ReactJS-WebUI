import styled, {css}from 'styled-components'
import media from './Media'

const ContentWrapper = styled.div`
 padding: 20px 18px 111px 18px;
 background-color: #fff;
 min-height: calc(100vh - 100px);
 margin: auto;
 ${media.greaterThan('lg')`
  width: 400px;
  //margin-left: 0;
  padding: 30px 30px 30px 30px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-style: solid;
  border-color: #0007C9;
  min-height: 350px;
 `}
 ${media.greaterThan('xl')`
  //width: 800px;
  //margin-left: 0;
  padding: 30px 30px 30px 30px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  min-height: 350px;
 `}
`

export default ContentWrapper