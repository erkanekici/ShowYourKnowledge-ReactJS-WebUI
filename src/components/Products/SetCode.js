import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import { Formik, Form, Field } from 'formik'
import { Validate } from '../../utils/validation'
import { formatMoney, formatRate } from '../../utils'
import { Table, Tr, Th, Td, Thead, Tbody, ColumnText } from '../styled/Table'
import { CheckboxLabel, CheckboxWrapper } from '../styled/FormElements'
import { Paragraph } from '../styled/Layout'
import CreditLimitInformation from '../CreditLimitInformation'
import store from '../../store'
import { SET_SELECTED_PRODUCT_CODE } from '../../store/actionTypes'
import { breakpoints } from '../styled/Media'

const validate = new Validate({
 productCode: {
  required: 'Lütfen bir kredi türü seçiniz.'
 }
})

class SetProductCode extends Component {
 state = {
  productCode: ''
 }

 constructor(props) {
  super(props)
  this.productListForm = React.createRef()
 }

 setProductCode = value => {
  store.dispatch({ type: SET_SELECTED_PRODUCT_CODE, payload: value })
  this.productListForm.current.setFieldValue('productCode', value)

  this.setState({ productCode: value })
  this.props.callPaymentPlan('0')

  const product = this.props.list.find(
   item => item.productCode === value
  )
  this.props.save(product).then(() => {
   this.props.callPaymentPlan('1')
  })
 }

 componentDidUpdate() {
  if (this.props.list.length === 1) {
   const productCode = this.props.list[0].productCode
   this.setProductCode(productCode)
  }
 }

 updateTextStyle(text,index) {
  if (text.indexOf("faizsiz, masrafsız") !== -1) {
   const prefix = text.substring(0,text.indexOf("faizsiz, masrafsız"))
   const suffix = text.substring(text.indexOf("faizsiz, masrafsız")+18,text.length)
   return (
    <ColumnText htmlFor={'credit' + index}>
    {prefix} <b>faizsiz, masrafsız</b> {suffix}
    </ColumnText>
   )
  }
  else if (text.indexOf("Faizsiz, masrafsız") !== -1) {
   const prefix = text.substring(0,text.indexOf("Faizsiz, masrafsız"))
   const suffix = text.substring(text.indexOf("Faizsiz, masrafsız")+18,text.length)
   return (
    <ColumnText htmlFor={'credit' + index}>
    {prefix} <b>Faizsiz, masrafsız</b> {suffix}
    </ColumnText>
   )
  }
  else if (text.indexOf("faizsiz") !== -1) {
   const prefix = text.substring(0,text.indexOf("faizsiz"))
   const suffix = text.substring(text.indexOf("faizsiz")+7,text.length)
   return (
    <ColumnText htmlFor={'credit' + index}>
    {prefix} <b>faizsiz</b> {suffix}
    </ColumnText>
   )
  }
  else{
   return (
    <ColumnText htmlFor={'credit' + index}>
     {text}
    </ColumnText>
   )
  }
 }

 checkZeroAmount(amount,index) {
  if (amount === "0") {
   return (
    <ColumnText htmlFor={'credit' + index}>
    <b>Yok</b>
    </ColumnText>
   )
  }
  else{
   return (
    <ColumnText htmlFor={'credit' + index}>
    <b>{formatMoney(amount)} TL</b>
   </ColumnText>
   )
  }
 }



 render() {
  const mainParagraphStyles = {
   marginBottom: "10px",
   fontSize: "16px"
  };
  return (
   <Formik
    ref={this.productListForm}
    validate={validate}
    initialValues={{ ...this.state }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, values, errors, touched }) => (
     <Fragment>
      <Paragraph style = {mainParagraphStyles}>
       Ödemenizde kullanabileceğiniz kredi seçeneklerini aşağıda
       görüntüleyebilirsiniz. Lütfen size en uygun kredi türünü seçiniz.
      </Paragraph>

      <CreditLimitInformation />

      <Form>
       <Table>
        <Thead>
         <Tr>
          <Th hiddenXS>&nbsp;</Th>
          <Th hiddenXS>
           KREDİ
           <br /> TÜRÜ
          </Th>

          <MediaQuery query={`(min-width: ${breakpoints.lg})`}>
           {matches =>
            matches ? (
             <Th>
              TAKSİT
              <br /> SAYISI
             </Th>
            ) : (
             <Th>
              VADE
              <br />
              <br />
             </Th>
            )
           }
          </MediaQuery>

          <Th>
           FAİZ <br />
           ORANI
          </Th>
          <Th>
           AYLIK <br />
           ÖDEME
          </Th>
          <Th hiddenXS>
           MASRAF
          </Th>
          <Th>
           TOPLAM <br />
           GERİ ÖDEME
          </Th>
         </Tr>
        </Thead>
        <Tbody>
         {this.props.list.map((item, index) => (
          <Tr
           key={item.productCode}
           checked={values.productCode === item.productCode}
           onClick={() =>
            !isSubmitting && this.setProductCode(item.productCode)
           }
           hasError={errors.productCode && touched.productCode}
          >
           <Td hiddenXS>
            <CheckboxWrapper>
             <Field
              id={'credit' + index}
              type="radio"
              name="productCode"
              value={item.productCode}
              checked={values.productCode === item.productCode}
              disabled={isSubmitting}
             />
             <CheckboxLabel htmlFor={'credit' + index}>
              <span className="icon-input-check" />
             </CheckboxLabel>
            </CheckboxWrapper>
           </Td>
           <Td hiddenXS>
            {this.updateTextStyle(item.productName,index)}
           </Td>
           <Td>
            <ColumnText htmlFor={'credit' + index}>
             {item.term}
            </ColumnText>
           </Td>
           <Td>
            <ColumnText htmlFor={'credit' + index}>
            <b>{formatRate(item.creditInterest * 100)}</b>
            </ColumnText>
           </Td>
           <Td>
            <ColumnText htmlFor={'credit' + index}>
             {formatMoney(item.installmentAmount)} TL
            </ColumnText>
           </Td>
           <Td hiddenXS>
            {this.checkZeroAmount(item.insuranceAmount,index)}
           </Td>
           <Td>
            <ColumnText htmlFor={'credit' + index}>
             {formatMoney(item.totalPaymentAmount)} TL
            </ColumnText>
           </Td>
          </Tr>
         ))}
        </Tbody>
       </Table>
      </Form>
     </Fragment>
    )}
   />
  )
 }
}

SetProductCode.defaultProps = {
 list: []
}

SetProductCode.propTypes = {
 list: PropTypes.array,
 save: PropTypes.func.isRequired
}

export default SetProductCode