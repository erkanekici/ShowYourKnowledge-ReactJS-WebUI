import styled, { css } from 'styled-components'
import media from './Media'

const Clear = styled.div`
 clear: both;
`

const Logo = styled.img`
 height: auto;

`

const N11Logo = styled.img`
 ${props =>
  props.banner &&
  css`
   position: absolute
 `};
 display: block;
 left: 67%;
 margin-top: -23px;
 height: 40px;
 ${props =>
  props.large &&
  css`
   left: 65%;
   margin-top: -25px;
   height: 45px;
 `};
 ${props =>
  !props.banner &&
  css`
  margin-top: 0px;
  height: 30px;
 `};
 ${media.greaterThan('msm')`
 left: 70%;
 margin-top: -27px;
 height: 45px;
 ${props =>
   props.large &&
   css`
   left: 67%;
   margin-top: -27px;
   height: 50px;
 `};
 ${props =>
   !props.banner &&
   css`
  margin-top: 0px;
  height: 30px;
 `};
 `}
 ${media.greaterThan('vsm')`
 left: 73%;
 margin-top: -30px;
 height: 50px;
 ${props =>
   props.large &&
   css`
   left: 67%;
   margin-top: -27px;
   height: 50px;
 `};
 ${props =>
   !props.banner &&
   css`
  margin-top: 0px;
  height: 30px;
 `};
 `}
 ${media.greaterThan('sm')`
 left: 78%;
 margin-top: -30px;
 height: 50px;
 ${props =>
   !props.banner &&
   css`
  margin-top: 0px;
  height: 30px;
 `};
 `}
 ${media.greaterThan('md')`
 left: 82%;
 margin-top: -30px;
 height: 50px;
 ${props =>
   !props.banner &&
   css`
  margin-top: 0px;
  height: 40px;
 `};
 `}
 ${media.greaterThan('lmd')`
 left: 87%;
 margin-top: -30px;
 height: 50px;
 ${props =>
   !props.banner &&
   css`
  margin-top: 0px;
  height: 40px;
 `};
 `}
 ${media.greaterThan('lg')`
 left: 83%;
 margin-top: -30px;
 height: 50px;
 ${props =>
   props.large &&
   css`
   left: 76%;
   margin-top: -36px;
   height: 70px;
 `};
 ${props =>
   !props.banner &&
   css`
  margin-top: 0px;
 `};
 `}
 ${media.greaterThan('xl')`
 left: 85%;
 margin-top: -30px;
 height: 50px;
 ${props =>
   props.large &&
   css`
   left: 76%;
   margin-top: -36px;
   height: 70px;
 `};
 ${props =>
   !props.banner &&
   css`
  margin-top: 0px;
 `};
 `}
`

const N11TrackerWeb = styled.img`
 margin-bottom: -50px;
 margin-top: 15px;
 ${media.greaterThan('sm')`
  margin-bottom: -25px;
  margin-top: 15px;
  width: 100%;
 `}
 ${media.greaterThan('md')`
 margin-bottom: -25px;
 margin-top: 15px;
 width: 80%;
 margin-left: 9%;
 `}
 ${media.greaterThan('lmd')`
 margin-bottom: -25px;
 margin-top: 15px;
 width: 70%;
 margin-right: 10%;
 margin-left: 15%;
 `}
 ${media.greaterThan('lg')`
 margin-bottom: -50px;
 margin-top: 15px;
 width: 100%;
 margin-right: 0%;
 margin-left: 0%;
 `}
 ${media.greaterThan('xl')`
 margin-bottom: -50px;
 margin-top: 15px;
 width: 100%;
 margin-right: 0%;
 margin-left: 0%;
 `}
`

const N11TrackerMobile = styled.img`
margin-bottom: -30px;
margin-top: 0px;
width: 100%;
 ${media.greaterThan('msm')`
  width: 94%;
  margin-left: 3%;
 `}
 ${media.greaterThan('vsm')`
  width: 85%;
  margin-left: 8%;
 `}
`

const Paragraph = styled.p`
 margin-top: 0;
 font-size: 17px;
 font-style: normal;
 font-stretch: normal;
 letter-spacing: normal;
 text-align: ${props => (props.center ? 'center' : 'left')};
 line-height: 1.41;
 margin-bottom: ${props => (props.mbclear ? '0px' : '')} !important;
 color: ${props => props.theme.text.darkGray};
 ${media.greaterThan('lg')`
  font-size: 21px;
  line-height: 1.33;
  margin-bottom: 30px;
 `}
`
const ParagraphUnsuccess = styled(Paragraph)`
 font-size: 16px;
 ${media.greaterThan('lg')`
  font-size: 16px;
 `};
`

const ParagraphKvkk = styled.p`
 margin-top: 0;
 font-size: 16px;
 font-style: normal;
 font-stretch: normal;
 letter-spacing: normal;
 line-height: 1.5;
 opacity: 0.8;
 color: ${props => props.theme.text.darkGray};
 ${media.greaterThan('lg')`
  font-size: 16px;
 `};
`

const ParagraphInfo = styled(Paragraph)`
 font-size: 12px;
 line-height: 1.25;
 position: relative;
 padding-left: 24px;
 margin-bottom: 10px;
 ${media.greaterThan('lg')`
  font-size: 13px;
  margin-bottom: 10px;
 `};
 span {
  position: absolute;
  font-size: 16px;
  left: 0;
 }
`

const Link = styled.a`
 text-decoration: underline;
 font-weight: ${props => props.theme.fonts.proximanovaSemibold};
`

const PageHr = styled.div`
 padding-top: 30px;
 padding-bottom: 5px;
 ${media.greaterThan('lg')`
  padding-bottom: 25px;
  padding-top: 50px;
 `}
 :before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  background-color: ${props => props.theme.text.navBg};
 }
`

const H1 = styled.h1`
 font-size: 16px;
 font-weight: ${props => props.theme.fonts.proximanovaBold};
 font-style: normal;
 font-stretch: normal;
 line-height: normal;
 letter-spacing: 0.7px;
 margin-top: 32px;
 color: ${props => props.theme.text.blue};
 ${media.greaterThan('lg')`
  font-size: 20px;
  margin-top: 58px;
  margin-bottom: 10px;
  letter-spacing: 0.9px;
 `};
`

const H2 = styled.h2`
 font-size: 17px;
 font-weight: ${props => props.theme.fonts.proximanovaMedium};
 font-style: normal;
 font-stretch: normal;
 line-height: normal;
 letter-spacing: 0.7px;
 margin-top: 32px;
 color: ${props => props.theme.text.darkGray};
 ${media.greaterThan('lg')`
  font-size: 21px;
 `};
`

const H3 = styled.h3`
 font-size: 16px;
 font-weight: ${props => props.theme.fonts.proximanovaMedium};
 font-style: normal;
 font-stretch: normal;
 line-height: normal;
 letter-spacing: 0.7px;
 margin-top: 32px;
 color: ${props => props.theme.text.darkGray};
 ${media.greaterThan('lg')`
  font-size: 18px;
 `};
`

const Congratulations = styled.div`
 font-size: 22px;
 font-weight: ${props => props.theme.fonts.proximanovaSemibold};
 line-height: 1.08;
 letter-spacing: -0.3px;
 text-align: center;
 color: ${props => props.theme.text.blue};
 margin-bottom: 10px;
 ${media.greaterThan('lg')`
  font-size: 26px;
 `};
`

const Strong = styled.strong`
 color: ${props => props.theme.text.blue};
`

const Success = styled.img`
 height: 100px;
 margin: 0 auto;
 display: block;
 margin-top: 30px;
 margin-bottom: 20px;
`

const ContentCapsule = styled.div`
 max-width: 565px;
 p {
  margin-bottom: 10px;
  ${media.greaterThan('lg')`
  margin-bottom: 20px;
  `}
 }
`

export {
 Paragraph,
 ParagraphInfo,
 ParagraphKvkk,
 H1,
 H2,
 H3,
 PageHr,
 Link,
 Clear,
 Logo,
 Strong,
 Congratulations,
 Success,
 ParagraphUnsuccess,
 ContentCapsule,
 N11Logo,
 N11TrackerWeb,
 N11TrackerMobile
}