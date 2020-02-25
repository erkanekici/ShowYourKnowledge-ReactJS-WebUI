import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Accordion from '../UI/Accordion'
import { AccTable } from '../UI/Accordion/styled'
import { formatMoney, formatRate } from '../../utils'

export const Information = ({ commissionAmount, product = {} }) => (
 <Fragment>
  <Accordion title="Kredi Taksit, Masraf ve Maliyet Oranları">
   <AccTable>
    <tbody>
     <tr>
      <td>Taksit Sayısı</td>
      <td>{product.term}</td>
     </tr>
     <tr>
      <td>Faiz Oranı</td>
      <td>{formatRate(product.creditInterest * 100)}</td>
     </tr>
     <tr>
      <td>Taksit Tutarı</td>
      <td>{formatMoney(product.installmentAmount)} TL</td>
     </tr>
     <tr>
      <td>Kredi Tahsis Ücreti</td>
      <td>{formatMoney(commissionAmount)} TL</td>
     </tr>
     <tr>
      <td>Sigorta Ücreti</td>
      <td>{formatMoney(product.insuranceAmount)} TL</td>
     </tr>
     <tr>
      <td>Toplam Geri Ödeme</td>
      <td>{formatMoney(product.totalPaymentAmount)} TL</td>
     </tr>
    </tbody>
   </AccTable>
  </Accordion>
 </Fragment>
)

Information.propTypes = {
 commissionAmount: PropTypes.any.isRequired,
 product: PropTypes.any.isRequired
}

export default Information