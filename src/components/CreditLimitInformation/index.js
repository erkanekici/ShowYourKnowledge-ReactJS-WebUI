import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash-es'
import { ParagraphInfo } from '../styled/Layout'
import { formatMoney, formatDate } from '../../utils'

const CreditLimitInformation = ({ expireDate, limit }) =>
 expireDate &&
 limit && (
  <ParagraphInfo>
   <span className="icon-icons-16-px-information" />
   Alışverişlerinizde kullanabileceğiniz {formatDate(expireDate)} tarihine
   kadar geçerli kredi limitiniz {formatMoney(limit)} TL'dir. Keyifli
   alışverişler dileriz.
  </ParagraphInfo>
 )

const mapStateToProps = state => {
 return pick(state.global, ['expireDate', 'limit'])
}

export default connect(
 mapStateToProps,
 null
)(CreditLimitInformation)