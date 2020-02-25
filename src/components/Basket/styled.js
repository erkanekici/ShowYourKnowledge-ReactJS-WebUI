import styled, { css } from 'styled-components'
import { Paragraph } from '../styled/Layout'
import media from '../styled/Media'

const BasketWrapper = styled.div`
 position: fixed;
 bottom: 0;
 background-image: linear-gradient(349deg, #0057b8, #84bd00);
 background-color: #0057b8\0 !important;
 width: 100%;
 padding: 10px 10px;
 border-top-left-radius: 20px;
 border-top-right-radius: 20px;
 z-index: ${props => props.theme.stackOrder.low};
 ${media.greaterThan('sm')`
  padding: 19px 20px;
 `}
 ${media.greaterThan('lg')`
  position: absolute;
  width: 280px;
  top: 0;
  bottom: auto;
  right: -140px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-image: linear-gradient(339deg,#84bd00 -10%,#0057B7 35%);
  padding: 15px 25px 125px 25px;
 `}
 ${media.greaterThan('xl')`
  width: 400px;
  right: -200px;
  padding: 30px 50px 200px 50px;
 `}
  &.open ul {
  display: block;
 }
`

const BasketTitle = styled.h2`
 font-size: 16px;
 margin: 0;
 font-weight: ${props => props.theme.fonts.proximanovaSemibold};
 color: ${props => props.theme.text.main};
 ${media.greaterThan('lg')`
  font-size: 18px;
 `}

 ${media.greaterThan('xl')`
  font-size: 22px;
 `}
`

const BasketParagraph = styled(Paragraph)`
 font-size: 13px;
 color: #fff;
 opacity: 0.7;
 margin-bottom: 0;
 margin-top: 4px;
 ${media.greaterThan('lg')`
  font-size: 14px;
  margin-bottom: 0;
 `}
 ${media.greaterThan('xl')`
  font-size: 16px;
 `}
`
const BasketLeft = styled.div`
 width: 60%;
 float: left;
 ${media.greaterThan('lg')`
  width: 100%;
 `}
`
const BasketRight = styled.div`
 width: 40%;
 float: left;
 text-align: right;
 opacity: 1;
 transition: opacity 0.3s linear;
 ${props => props.showContent && 'opacity: 0;'};
 ${media.greaterThan('lg')`
  width: 230px;
  text-align: left;
  position: absolute;
  bottom: 25px;
  ${props => props.showContent && 'opacity: 1;'};
 `}
 ${media.greaterThan('xl')`
  width: 300px;
  bottom: 50px;
 `}
`

const BasketAmountTitle = styled.div`
 font-size: 14px;
 font-weight: ${props => props.theme.fonts.proximanovaSemibold};
 color: ${props => props.theme.text.main};
 ${media.greaterThan('lg')`
  font-size: 14px;
  border-top: 1px solid rgba(255,255,255,0.2);
  margin-top: 20px;
  padding-top: 25px;
 `}
 ${media.greaterThan('xl')`
  font-size: 16px;
  margin-top: 30px;
  padding-top: 40px;
 `}
`
const BasketAmount = styled.div`
 font-size: 26px;
 font-weight: 700;
 margin-top: 4px;
 white-space: nowrap;
 color: ${props => props.theme.text.main};
 ${media.greaterThan('lg')`
  font-size: 32px;
  line-height: 1;
 `}
 ${media.greaterThan('xl')`
  font-size: 48px;
 `}
 ${media.lessThan('msm')`
  font-size: 20px;
 `}
`

const BasketSup = styled.sup`
 font-size: 16px;
 font-weight: ${props => props.theme.fonts.proximanovaSemibold};
 ${media.greaterThan('lg')`
  font-size: 18px;
 `}
 ${media.greaterThan('xl')`
  font-size: 26px;
 `}
 ${media.lessThan('msm')`
  font-size: 12px;
 `}
`

const BasketButton = styled.button`
 background: transparent;
 border: none;
 position: absolute;
 left: 50%;
 top: 6px;
 color: ${props => props.theme.text.main};
 transform: translateX(-50%);
 outline: none;
 ${media.greaterThan('lg')`
  display: none;
 `}
`

const BasketContent = styled.ul`
 list-style: none;
 margin: 0;
 height: 0px;
 padding-left: 0;
 transition: all 0.5s linear;
 overflow: hidden;
 ${media.greaterThan('lg')`
  margin: 0px 0 0 0;
 `}

 ${props =>
  props.showContent &&
  css`
   margin: 5px 0 5px 0;
   height: 183px;
   ${media.greaterThan('lg')`
    margin: 30px 0 0 0;
   `}
  `}
`
const BasketContentItem = styled.li`
 padding: 17px 0;
 border-top: 1px solid rgb(255, 255, 255, 0.13);
 &:first-child div:last-child{
  ${media.greaterThan('lg')`
   width: 150px;
  `}

  ${media.greaterThan('xl')`
   width: auto;
  `}
 }
 :after {
  content: '';
  display: block;
  clear: both;
 }
`
const ContentItemTitle = styled.div`
 float: left;
 font-size: 14px;
 color: ${props => props.theme.text.main};
 opacity: 0.5;
 font-weight: 700;
 line-height: 1.86;
 ${media.greaterThan('lg')`
  line-height: 1;
 `}
 ${media.greaterThan('xl')`
  line-height: 1.86;
 `}
`
const ContentItemValue = styled.div`
 float: right;
 text-align: right;
 font-size: 16px;
 line-height: 1.63;
 ${media.greaterThan('lg')`
  line-height: 1;
 `}
 ${media.greaterThan('xl')`
  line-height: 1.63;
 `}
 color: ${props => props.theme.text.main};

`
const ContentItemSup = styled.sup`
 font-size: 10px;
`

const BasketBottom = styled.div`
 text-align: right;
 transition: all 0.5s linear;
 opacity: 0;
 height: 0;
 border-top: 1px solid rgb(255,255,255,0.13);
 ${media.greaterThan('lg')`
  display: none;
 `}
 ${props =>
  props.showContent &&
  css`
   opacity: 1;
   height: 60px;
  `}
 ${BasketAmountTitle} {
  font-size: 16px;
  padding-top: 8px;
 }
 ${BasketAmount} {
  font-size: 20px;
 }
 ${BasketSup} {
  font-size: 12px;
 }
`

const BasketOverlay = styled.div`
 position: fixed;
 width: 100%;
 height: 100%;
 top: 0;
 background-color: ${props => props.theme.text.darkGray};
 z-index: 999;
 opacity: 0;
 display: none;
 transition: opacity 0.5s linear;
 ${props =>
  props.showContent &&
  css`
   opacity: 0.95;
   display: block;
   ${media.greaterThan('lg')`
    display: none;
   `}
  `}
`

export {
 BasketWrapper,
 BasketTitle,
 BasketParagraph,
 BasketLeft,
 BasketRight,
 BasketAmountTitle,
 BasketAmount,
 BasketSup,
 BasketButton,
 BasketContent,
 BasketContentItem,
 ContentItemTitle,
 ContentItemValue,
 ContentItemSup,
 BasketBottom,
 BasketOverlay
}