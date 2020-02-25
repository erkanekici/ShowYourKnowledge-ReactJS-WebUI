import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import Button, {
 ButtonWrapper,
 ButtonItem,
 ButtonBack,
 AgainSend,
 CenterButton
} from '../styled/Button'
import { Validate } from '../../utils/validation'
import { CountDown } from '../styled/FormElements'
import { Paragraph, Clear, ParagraphUnsuccess } from '../styled/Layout'
import { Input } from '../UI/Input'
import Counter from '../UI/Counter'
import Modal from '../UI/Modal'
import { UnSuccess, UnSuccessTitle } from '../UI/Modal/styled'
import timeout from '../../images/timeout.png'

const MAX_COUNTER_TIME = 120

const validate = new Validate({
 otp: {
  required: true,
  minlength: [6]
 }
})

class ValidateOTP extends Component {

 constructor(props) {
  super(props)
  this.counterRef = React.createRef()
 }

 state = {
  otp: '',
  showTimerWarning: false,
  haveToReSendOTP: false,
  counterCurrentTime: MAX_COUNTER_TIME,
  againSendClicked: false
 }

 componentDidMount() {
  this.setState({ againSendClicked: true })
  //GoogleTagManager Events
  this.addGTM()

  if (this.props.companyCode === "N11" && this.props.banner === "1") {
   document.getElementById('root').getElementsByTagName("nav")[0].getElementsByClassName("selected")[0].className="";
   document.getElementById('root').getElementsByTagName("nav")[0].getElementsByTagName("li")[1].getElementsByTagName("span")[0].className="selected";
  }
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.banner === "1"){ //n11Banner
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step2_banner/',
    'userId': this.props.transactionId
   });
  }
  else if (this.props.companyCode === "N11" && this.props.basketType === "4"){ //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step2_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else{
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step2_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 handleTimeEnded = () => {
  this.setState({
   showTimerWarning: true,
   haveToReSendOTP: true
  })
 }

 restartTimer = () => {
  this.setState({ againSendClicked: true })
  this.props
   .reSendOtp({
    nationalIdentityNo: this.props.nationalIdentityNo,
    mobileNumber: this.props.mobileNumber
   })
   .finally(() => {
    //this.counterRef.current.restartTimer()
    this.setState({ haveToReSendOTP: false })
   })
 }

 onSubmit = (values, actions) => {
  if (this.props.basketType === "4"){
  }
  this.setState({ ...this.state, ...values })
  actions.setSubmitting(true)
  this.props.save(values).then(() => {
   actions.setSubmitting(false)
  })
 }

 addN11CarLoanComponents(type) {
  if (this.props.basketType === "4" && this.props.otpResult === "1" && !this.state.againSendClicked) {
   if (type === 'message') {
    return (
     <Paragraph>
      <br></br>
      {this.props.explanation}
     </Paragraph>
    )
   } if (type === 'button') {
    const buttonStyle={
     marginTop: "0px",
    }
    return (
     <ButtonWrapper>
      <ButtonItem>
       <ButtonBack style={buttonStyle} type="button" onClick={this.props.reject}>
        Hayır
      </ButtonBack>
      </ButtonItem>
      <ButtonItem>
       <Button style={buttonStyle} type="button" onClick={this.props.confirm}>
        Evet
      </Button>
      </ButtonItem>
     </ButtonWrapper>
    )
   }
  }
 }

 addValidateOTPButtons(isSubmitting) {
  const submitButtonStyle={
   marginTop: "5px"
  }
  if (!(this.props.basketType === "4" && this.props.otpResult === "1" && !this.state.againSendClicked)){
   return (
    <ButtonWrapper>
    <ButtonItem>
     <Button
      type="submit"
      style={submitButtonStyle}
      disabled={isSubmitting || this.state.haveToReSendOTP}
     >
      Başvur
     </Button>
    </ButtonItem>
   </ButtonWrapper>
   )
  }
 }

 addParagraph() {
  const smsParagraphStyle={
   marginBottom: "10px"
  }
  if (this.props.companyCode === "N11" && this.props.banner === "1") {
   return (
    <Paragraph style = {smsParagraphStyle} >
     50 TL indirim kuponu kazanmak için son adım! İşleminizi tamamlamak
     için lütfen cep telefonunuza SMS ile gönderdiğimiz doğrulama kodunu giriniz.
    </Paragraph>
   )
  }
  else{
   return (
    <Paragraph style = {smsParagraphStyle}>
     Lütfen cep telefonunuza SMS ile gönderdiğimiz doğrulama kodunu giriniz.
    </Paragraph>
   )
  }
 }

 timeUp() {
  this.setState({ showTimerWarning: false })
  this.props.timeUp()
 }

 setCounterCurrentTime(val) {
  this.setState({ counterCurrentTime: val })
  //this.props.setCounterCurrentTime(val)
 }

 render() {
  return (
   <Formik
    validate={validate}
    initialValues={{ ...this.state }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting }) => (
     <Fragment>

      {this.addParagraph()}

      <Form>
       <CountDown>
        <Counter
         seconds={MAX_COUNTER_TIME}
         onTimeEnded={this.handleTimeEnded}
         onChange={val => this.setCounterCurrentTime(val)}
         ref={this.counterRef}
        />
        <Input
         id="otp"
         name="otp"
         maxLength="6"
         rules={{ onlyNumber: true }}
         autoComplete="off"
        />
       </CountDown>

       <AgainSend
        type="button"
        onClick={() => this.restartTimer()}
        disabled={
         this.state.counterCurrentTime >= MAX_COUNTER_TIME - 5
        }
       >
        <span className="icon-icons-16-px-refresh" /> Tekrar Gönder
       </AgainSend>

       <Clear />

       { this.addN11CarLoanComponents('message')}

       { this.addValidateOTPButtons(isSubmitting)}

       { this.addN11CarLoanComponents('button')}

      </Form>

      <Modal show={this.state.showTimerWarning} unsuccess="true">
       <UnSuccess src={timeout} />
       <UnSuccessTitle>Geçerlilik Süresi Doldu</UnSuccessTitle>
       <ParagraphUnsuccess center mbclear unsuccess>
        Size iletilen doğrulama kodunun geçerlilik süresi dolduğu için
        işleminiz yapılamamaktadır. Kredi başvuru işleminize devam etmek
        için bir önceki adıma geri dönüp, cep telefonu numaranızı
        kontrol ederek tekrar deneyebilirsiniz.
       </ParagraphUnsuccess>
       <CenterButton>
        <Button
         type="button"
         onClick={() => this.timeUp()}
        >
         Tamam
        </Button>
       </CenterButton>
      </Modal>
     </Fragment>
    )}
   />
  )
 }
}

ValidateOTP.propTypes = {
 mobileNumber: PropTypes.string.isRequired,
 reSendOtp: PropTypes.func.isRequired,
 save: PropTypes.func.isRequired
}

export default ValidateOTP