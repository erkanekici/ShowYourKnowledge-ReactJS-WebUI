import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import Content from './content'
import n11logo from '../../images/logoN11.png'
import { get } from 'lodash-es'
import {
 BasketWrapper,
 BasketParagraph,
 BasketTitle,
 BasketLeft,
 BasketRight,
 BasketAmountTitle,
 BasketAmount,
 BasketSup,
 BasketButton,
 BasketBottom,
 BasketOverlay
} from './styled'
import { Clear, N11Logo } from '../styled/Layout'
import { breakpoints } from '../styled/Media'
import { formatMoney } from '../../utils'

class Basket extends Component {
 state = {
  showBasketContent: false
 }

 addN11CarLoanBasketAmount(basketAmount) {
  if (this.props.basketType === "4" && this.props.otpResult === "1"){
   return (
    <Fragment>
     <BasketAmountTitle>Sepet Tutarı</BasketAmountTitle>
     <BasketAmount>
      {formatMoney(basketAmount)}
      <BasketSup> TL</BasketSup>
     </BasketAmount>
   </Fragment>
   )
  }
 }

 addN11CarLoanCreditAmount() {
  if (this.props.basketType === "4" && this.props.otpResult === "1"){
   return (
    <Fragment>
     <BasketAmountTitle>Kredi Tutarı</BasketAmountTitle>
     <BasketAmount>
      {formatMoney(this.props.limit)}
      <BasketSup> TL</BasketSup>
     </BasketAmount>
   </Fragment>
   )
  }
 }

 addN11CarLoanCreditAmountBottom() {
  if (this.props.basketType === "4" && this.props.otpResult === "1"){
   return (
    <Fragment>
     <BasketBottom showContent={this.state.showBasketContent} >
      <BasketAmountTitle>Kredi Tutarı</BasketAmountTitle>
      <BasketAmount>
       {formatMoney(this.props.limit)}
       <BasketSup> TL</BasketSup>
      </BasketAmount>
     </BasketBottom>
   </Fragment>
   )
  }
 }

 addBasketAmount(basketAmount) {
  if ((this.props.basketType !=='4') || (this.props.basketType ==='4' && this.props.otpResult !=='1')){
   return (
    <Fragment>
     <BasketAmountTitle>Sepet Tutarı</BasketAmountTitle>
     <BasketAmount>
      {formatMoney(basketAmount)}
      <BasketSup> TL</BasketSup>
     </BasketAmount>
    </Fragment>
   )
  }
 }

 render() {
  const { basketAmount, product } = this.props
  const hasProduct = !!product
  const creditAmountStyle = this.props.companyCode === 'N11' ? {
   marginTop: "10px"
  } : {};

  return (
   <Fragment>
    <BasketWrapper>
     {product && (
      <BasketButton
       onClick={e =>
        this.setState({
         showBasketContent: !this.state.showBasketContent
        })
       }
      >
       <span
        className={
         this.state.showBasketContent ? 'icon-down' : 'icon-up'
        }
       />
      </BasketButton>
     )}

     <MediaQuery query={`(min-width: ${breakpoints.lg})`}>
      <BasketLeft>

       {this.props.companyCode === 'N11' ? (
        <N11Logo banner={false} src={n11logo} large={get(this.props.getRoute, 'UI.largeLogo', false)} />
       ) : (
        <BasketTitle>
        {this.props.companyName}
        </BasketTitle>
       )}

       <BasketParagraph>
        üzerinden yaptığınız alışverişiniz için yönlendirildiniz.
       </BasketParagraph>

       {this.addN11CarLoanBasketAmount(basketAmount)}

      </BasketLeft>
     </MediaQuery>

     <MediaQuery query={`(max-width:1149px)`}>
      <BasketLeft>

       {this.props.companyCode === 'N11' ? (
        <N11Logo banner={false} src={n11logo} large={get(this.props.getRoute, 'UI.largeLogo', false)} />
       ) : (
        <BasketTitle>
        {this.props.companyName}
        </BasketTitle>
       )}

       <BasketParagraph>
        üzerinden yaptığınız alışverişiniz için yönlendirildiniz.
       </BasketParagraph>
      </BasketLeft>
     </MediaQuery>

     <BasketRight showContent={this.state.showBasketContent} style={creditAmountStyle}>
      {this.addN11CarLoanCreditAmount()}
      {this.addBasketAmount(basketAmount)}
     </BasketRight>

     <Clear />

     <MediaQuery query={`(min-width: ${breakpoints.lg})`}>
      <Content product={product} showContent={hasProduct} />
     </MediaQuery>

     <MediaQuery query={`(max-width: ${breakpoints.lg})`}>
      <Content
       showContent={this.state.showBasketContent}
       product={product}
      />

      <BasketBottom showContent={this.state.showBasketContent}>
       <BasketAmountTitle>Sepet Tutarı</BasketAmountTitle>
       <BasketAmount>
        {formatMoney(basketAmount)}
        <BasketSup> TL</BasketSup>
       </BasketAmount>
      </BasketBottom>

      {this.addN11CarLoanCreditAmountBottom()}

     </MediaQuery>
    </BasketWrapper>

    <BasketOverlay showContent={this.state.showBasketContent} />
   </Fragment>
  )
 }
}

const mapStateToProps = state => {
 const { list = [], selectedProduct} = state.products
 const product = list.find(item => item.productCode === selectedProduct)
 const otpResult = state.global.otpResult
 const limit = state.global.limit

 return {
  product,
  otpResult,
  limit
 }
}

export default connect(
 mapStateToProps,
 null
)(Basket)