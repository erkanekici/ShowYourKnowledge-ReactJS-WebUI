import styled from 'styled-components'
import media from './Media'

const SuccessBasket = styled.div`
  margin: 15px -10px 0 -15px;
  ${media.greaterThan('lg')`
    max-width: 620px;
    margin: 0 auto;
    margin-top: 70px;
  `}
`

const SuccessBasketItemWrapper = styled.div`
  padding: 0 10px;
  width: 50%;
  float: left;
  ${media.greaterThan('lg')`
    padding: 0 5px;
  `}
`

const SuccessBasketItem = styled.div`
  padding: 15px 0;
  background-image: linear-gradient(349deg,#84bd00,#0057b8 40%);
  background-color: #0057b8\0 !important;
  border-radius: 20px;
  text-align: center;
  ${media.greaterThan('lg')`
    padding: 30px 0 40px 0;

  `}
  h5{
    margin: 0;
    opacity: 0.45;
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.text.main};
    ${media.greaterThan('lg')`
      font-size: 16px;
    `}
  }

  p{
    font-size: 20px;
    font-weight: 600;
    color: ${props => props.theme.text.main};
    margin: 10px 0 0 0;
    ${media.greaterThan('lg')`
      font-size: 32px;
    `}
    sup{
      font-size: 11px;
      ${media.greaterThan('lg')`
        font-size: 18px;
      `}
    }
  }
`

export {
  SuccessBasket,
  SuccessBasketItem,
  SuccessBasketItemWrapper
}