import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Modal from '../UI/Modal'
import {ModalButton} from '../UI/Modal/styled'
import { Clear } from '../styled/Layout'
import { PaymentTypeList, PaymentTypeTable } from '../UI/Modal/styled'
import { formatMoney, formatDate } from '../../utils'

const SampleList = props => (
 <Fragment>
  <Modal
   title="Örnek Ödeme Planınız"
   show={props.show}
   onClose={props.onClose}
  >
   <PaymentTypeList>
    <li>
     <div>KREDİ TUTARI</div>
     <div>
      {formatMoney(props.creditAmount)} TL
     </div>
    </li>
    <li>
     <div>KREDİ VADESİ</div>
     <div>{props.term} Ay</div>
    </li>
    <li>
     <div>GERİ ÖDENECEK TOPLAM TUTAR</div>
     <div>{formatMoney(props.totalAmount)} TL</div>
    </li>
   </PaymentTypeList>
   <PaymentTypeTable>
    <thead>
     <tr>
      <th>
       TAKSİT <br />
       SAYISI
      </th>
      <th>
       TAKSİT <br />
       TARİHİ
      </th>
      <th>
       TAKSİT <br />
       TUTARI
      </th>
      <th>
       KALAN <br />
       ANAPARA TUTARI
      </th>
      <th>ANAPARA</th>
      <th>
       FAİZ <br />
       TUTARI
      </th>
      <th>KKDF</th>
      <th>BSMV</th>
     </tr>
    </thead>
    <tbody>
     {props.list.map(item => (
      <tr key={item.installmentNumber}>
       <td data-label="TAKSİT SAYISI">{item.installmentNumber}</td>
       <td data-label="TAKSİT TARİHİ">{formatDate(item.installmentDate)}</td>
       <td data-label="TAKSİT TUTARI">{formatMoney(item.installmentAmount)} TL</td>
       <td data-label="KALAN ANAPARA TUTARI">
        {formatMoney(item.remainingPrincipalAmount)} TL
       </td>
       <td data-label="ANAPARA">{formatMoney(item.principalAmount)} TL</td>
       <td data-label="FAİZ TUTARI">{formatMoney(item.interestAmount)} TL</td>
       <td data-label="KKDF">{formatMoney(item.kkdf)} TL</td>
       <td data-label="BSMV">{formatMoney(item.bsmv)} TL</td>
      </tr>
     ))}
    </tbody>
   </PaymentTypeTable>
   <ModalButton type="button" float="right" onClick={props.onClose}>
    <span className="icon-icons-16-px-input-check" /> Tamam
   </ModalButton>
   <Clear />
  </Modal>
 </Fragment>
)

SampleList.defaultProps = {
 list: []
}

SampleList.propTypes = {
 list: PropTypes.array,
 creditAmount: PropTypes.number.isRequired,
 term: PropTypes.number.isRequired,
 totalAmount: PropTypes.number.isRequired
}

export default SampleList