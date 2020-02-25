import styled from 'styled-components'
import media from './Media'


const PleaseWait = styled.div`
  font-size: 16px;
  text-align: center;
  ${media.greaterThan('lg')`
    text-align: left;
    max-width: 380px;
    margin:0 auto;
    margin-top: 80px;
  `}
  span{
    ${media.greaterThan('lg')`
      display: block;
      padding-top: 4px;
      font-size: 20px;
    `}
  }
`

const CongratulationsCount = styled(PleaseWait)`
  margin-top: 35px;
  ${media.greaterThan('lg')`
    margin-top: 45px;
  `}
`

const PageCountDown = styled.div`
  position: relative;
  width: 54px;
  height: 54px;
  text-align: center;
  line-height: 54px;
  font-size: 20px;
  font-weight: ${props => props.theme.fonts.proximanovaBold};
  color: ${props => props.theme.text.blue};
  margin: 0 auto;
  margin-bottom: 20px;
  ${media.greaterThan('lg')`
    margin-left: 0;
    margin-bottom: 0;
    float: left;
    margin-right: 30px;
    display:inline-block;
  `}
  :before{
    content: "";
    display: block;
    width: 32px;
    height: 32px;
    border: solid 4px #84bd00;
    position: absolute;
    top: 7px;
    left: 7px;
    transform: rotate(45deg);
  }
  :after{
    content: "";
    display: block;
    width: 46px;
    height: 46px;
    border: solid 4px #0057b8;
    position: absolute;
    top: 0;
    transform: rotate(45deg);
  }
`

export {
  PleaseWait,
  PageCountDown,
  CongratulationsCount
}