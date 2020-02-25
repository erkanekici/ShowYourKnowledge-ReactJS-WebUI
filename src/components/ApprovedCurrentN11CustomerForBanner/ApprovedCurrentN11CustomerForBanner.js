import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash-es'
import { Paragraph } from '../styled/Layout'

const ApprovedCurrentN11CustomerForBanner = () =>
 (
  <Paragraph>
   İlginiz için teşekkürler!<br></br><br></br>
   Bankamız müşterisi olarak <b>faizsiz masrafsız</b> Fibabanka Alışveriş Kredisi
   fırsatından <u><b>hemen</b></u> faydalanabilirsiniz.<br></br><br></br>
   Alışverişinizi yaptıktan sonra ödeme adımında Fibabanka Alışveriş Kredisi’ni seçin,
   avantajlı ve taksitli alışverişin keyfini çıkarın. 50 TL indirim kupon kampanyamız
   mevcut müşterilerimiz için geçerli değildir.
  </Paragraph>
 )

const mapStateToProps = state => {
 return pick(state.global, [])
}

export default connect(
 mapStateToProps,
 null
)(ApprovedCurrentN11CustomerForBanner)