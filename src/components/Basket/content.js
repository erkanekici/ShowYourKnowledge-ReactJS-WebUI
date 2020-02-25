import React, { Fragment } from 'react'
import {
 BasketContent,
 BasketContentItem,
 ContentItemTitle,
 ContentItemValue,
 ContentItemSup
} from './styled'
import { formatMoney } from '../../utils'

const Content = ({ showContent, product }) => (
 <BasketContent showContent={showContent}>
  {product && (
   <Fragment>
    <BasketContentItem>
     <ContentItemTitle>Kredi Türü</ContentItemTitle>
     <ContentItemValue>{product.productName}</ContentItemValue>
    </BasketContentItem>
    <BasketContentItem>
     <ContentItemTitle>Aylık Ödeme</ContentItemTitle>
     <ContentItemValue>
      {product.term} x {formatMoney(product.installmentAmount)}
      <ContentItemSup>TL</ContentItemSup>
     </ContentItemValue>
    </BasketContentItem>
    <BasketContentItem>
     <ContentItemTitle>Toplam Geri Ödeme</ContentItemTitle>
     <ContentItemValue>
      {formatMoney(product.totalPaymentAmount)}
      <ContentItemSup>TL</ContentItemSup>
     </ContentItemValue>
    </BasketContentItem>
   </Fragment>
  )}
 </BasketContent>
)

export default Content