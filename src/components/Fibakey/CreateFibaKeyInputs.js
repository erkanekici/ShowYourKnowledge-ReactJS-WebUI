import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import Button, {
 ButtonWrapper,
 ButtonItem,
 ButtonBack
} from '../styled/Button'
import { Validate } from '../../utils/validation'
import {
 Paragraph,
 ParagraphInfo,
 Clear
} from '../styled/Layout'
import { Input } from '../UI/Input'
import Modal from '../UI/Modal'
import MediaQuery from 'react-responsive'
import CityDistrictInputGroups from '../CityDistrictInputGroups'
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { PasswordInput, ErrMsg } from '../styled/FormElements'
import Info from '@material-ui/icons/Info';
import { Label } from '../styled/FormElements'
import SelectBox from '../UI/SelectBox/index'
import { Field } from 'formik'
import { localeSortBy } from '../../utils'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import eskiKimlik from '../../images/eskiKimlik.png'
import yeniKimlik from '../../images/yeniKimlik.png'
import CloseIcon from '@material-ui/icons/Close';

const validate = new Validate({
 'addressTable[0].region': { required: true },
 'addressTable[0].district': { required: true }
})

class CreateFibaKeyInputs extends Component {

 constructor(props) {
  super(props)
  this.fibaKeyformRef = React.createRef()
 }

 state = {
  isInputsValidated: false,
  showSample: false,
  nationalIdentityNo: '',
  serialNumber: '',
  code: '',
  answer: '',
  addressTable: [
   {
    region: '',
    district: '',
    address: '',
    addressType: 'RA'
   }
  ],
  invalidNationalIdentityNo: false,
  invalidSeriNo: false,
  invalidAnswer: false,
  invalidSelectQuestion: false,
  invalidDistrict: true,
  tabValue: 0
 }

 componentDidMount() {
  if (this.props.hasCheckedFibaKeyIdentityInfoError) {
   window.scrollTo(0, document.body.scrollHeight)
  }
  //document.getElementById('buttonSubmit').focus()
  //window.scrollTo(0,document.body.scrollHeight)
 }

 onSubmit = (values, actions) => {

  actions.setSubmitting(false)
  if (!this.canBeSubmitted()) {
   return;
  }

  const request =
  {
   nationalIdentityNo: this.state.nationalIdentityNo,
   transactionId: this.props.transactionId,
   serialNumber: this.state.serialNumber,
   cityCode: values.addressTable[0].region,
   countyCode: values.addressTable[0].district,
   flag: this.props.flag,
   code: this.state.code,
   answer: this.state.answer
  };

  //this.setState({ ...this.state, ...values })
  actions.setSubmitting(true)
  this.props.validateFibaKeyInputs(request).then(() => {
   actions.setSubmitting(false)
  })
 }

 canBeSubmitted() {
  const errors = this.validateAllInputs(this.state.code, this.state.answer, this.state.nationalIdentityNo, this.state.serialNumber);
  Object.keys(errors).map(item => {
   if (errors[item]) {
    this.setState({ [item]: true });
   }
  })
  return !Object.keys(errors).some(x => errors[x]);
 }

 validateAllInputs(code, answer, nationalIdentityNo, serialNumber) {
  // true means invalid, so our conditions got reversed
  if (this.props.flag === '1') {
   const response =
   {
    invalidQuestionSelectBox: code.length === 0,
    invalidAnswer: answer.length === 0,
    invalidNationalIdentityNo: nationalIdentityNo.length === 0 || !this.checkIsTCKN(nationalIdentityNo),
    invalidSeriNo: serialNumber.length === 0
   };
   return response
  }
  else {
   const response =
   {
    invalidNationalIdentityNo: nationalIdentityNo.length === 0 || !this.checkIsTCKN(nationalIdentityNo),
    invalidSeriNo: serialNumber.length === 0,
   };
   return response
  }

 }

 checkInputsValidated(value, name) {
  let errors = {}
  if (name === 'questionSelectBox') {
   errors = this.validateAllInputs(value, this.state.answer, this.state.nationalIdentityNo, this.state.serialNumber);
  }
  else if (name === 'answer') {
   errors = this.validateAllInputs(this.state.code, value, this.state.nationalIdentityNo, value, this.state.serialNumber);
  }
  else if (name === 'nationalIdentityNo') {
   errors = this.validateAllInputs(this.state.code, this.state.answer, value, this.state.serialNumber);
  }
  else if (name === 'serialNumber') {
   errors = this.validateAllInputs(this.state.code, this.state.answer, this.state.nationalIdentityNo, value);
  }
  else if (name === 'district') {
   errors = this.validateAllInputs(this.state.code, this.state.answer, this.state.nationalIdentityNo, this.state.serialNumber);
   if (errors.length !== 0 && !Object.keys(errors).some(x => errors[x]) && value !== null && value.length !== 0) {
    this.setState({ isInputsValidated: true });
    return;
   }
   else {
    this.setState({ isInputsValidated: false });
    return;
   }
  }

  if (errors.length !== 0 && !Object.keys(errors).some(x => errors[x]) && !this.state.invalidDistrict) {
   this.setState({ isInputsValidated: true });
  }
  else {
   this.setState({ isInputsValidated: false });
  }
 }

 checkIsTCKN = (value) => {
  value = value.toString()
  const isEleven = /^[0-9]{11}$/.test(value)
  let totalX = 0
  for (let i = 0; i < 10; i++) {
   totalX += Number(value.substr(i, 1))
  }
  // eslint-disable-next-line
  const isRuleX = totalX % 10 == value.substr(10, 1)
  let totalY1 = 0
  let totalY2 = 0
  for (let i = 0; i < 10; i += 2) {
   totalY1 += Number(value.substr(i, 1))
  }
  for (let i = 1; i < 10; i += 2) {
   totalY2 += Number(value.substr(i, 1))
  }
  // eslint-disable-next-line
  const isRuleY = (totalY1 * 7 - totalY2) % 10 == value.substr(9, 0)

  return isEleven && isRuleX && isRuleY
 }

 //BLUR METHOD
 handleBlur = field => event => {
  const { name, value } = event.target;

  if (name === 'answer') {
   if (value.length === 0) {
    this.setState({ invalidAnswer: true });
   }
  }
  else if (name === 'nationalIdentityNo') {
   if (value.length === 0 || !this.checkIsTCKN(value)) {
    this.setState({ invalidNationalIdentityNo: true });
   }
  }
  else if (name === 'serialNumber') {
   if (value.length === 0) {
    this.setState({ invalidSeriNo: true });
   }
  }

  // if(event.relatedTarget && event.relatedTarget.id === 'buttonSubmit' ){
  //  document.getElementById('buttonSubmit').click()
  // }

 };

 handleBlurQuestionSelectBox = field => event => {
  if (this.state.code.length === 0) {
   this.setState({ invalidQuestionSelectBox: true });
  }

  // if(event.relatedTarget && event.relatedTarget.id === 'buttonSubmit' ){
  //  document.getElementById('buttonSubmit').click()
  // }
 };

 questionSelectBox = (value) => {
  if (value !== undefined && value.length !== 0 && this.state.invalidQuestionSelectBox) {
   this.setState({ invalidQuestionSelectBox: false });
  }
 };

 //CHANGE methods
 handleChangeQuestionSelectBox = (value) => {

  this.setState({ code: value });
  if (value.length !== 0) {
   this.setState({ invalidQuestionSelectBox: false });
  }
  this.checkInputsValidated(value, 'questionSelectBox')
 };

 handleChangeAnswer = (value, name) => {
  this.setState({ [name]: value });
  if (value.length !== 0) {
   this.setState({ invalidAnswer: false });
  }
  this.checkInputsValidated(value, 'answer')
 };

 handleChangeNationalIdentityNo = (value, name) => {
  this.setState({ [name]: value });
  if (value.length !== 0 && this.checkIsTCKN(value)) {
   this.setState({ invalidNationalIdentityNo: false });
  }
  this.checkInputsValidated(value, 'nationalIdentityNo')
 };

 handleChangeSeriNo = event => {
  const { name, value } = event.target;
  this.setState({ serialNumber: value });
  if (value.length !== 0) {
   this.setState({ invalidSeriNo: false });
  }
  this.checkInputsValidated(value, 'serialNumber')
 };

 handleChangeDistrict = (value) => {
  if (value != null && value.length !== 0) {
   this.setState({ invalidDistrict: false });
  }
  else {
   this.setState({ invalidDistrict: true });
  }
  this.checkInputsValidated(value, 'district')
 };

 handleTabChange = (event, newValue) => {
  if (newValue === 2) {
   this.setState({ showSample: false });
  } else {
   this.setState({ tabValue: newValue });
  }
 };

 //ICON Methods
 handleInfoIconClick = () => {
  this.setState({ showSample: true })
 };

 // handleInfoIconMouseOver = event => {
 //  event.preventDefault();
 // };

 // handleInfoIconMouseLeave = event => {
 //  event.preventDefault();
 // };

 //RENDER Components
 addButtonValidate(isSubmitting) {
  const buttonValidateStyle = {
   marginTop: "5px",
  }
  return (
   <ButtonWrapper>
    <ButtonItem>
     <ButtonBack style={buttonValidateStyle} type="button" onClick={this.props.back}>
      Geri
     </ButtonBack>
    </ButtonItem>
    <ButtonItem>
     <Button type="submit" id="buttonSubmit" style={buttonValidateStyle} disabled={isSubmitting || !this.state.isInputsValidated}>
      Doğrula
     </Button>
    </ButtonItem>
   </ButtonWrapper>
  )
 }

 addInformation() {
  const footNoteWebStyle = {
   fontFamily: "calibri",
   fontSize: "12px",
   marginTop: "0px",
   marginBottom: "15px"
  }
  const footNoteMobileStyle = {
   fontFamily: "calibri",
   fontSize: "11px",
   marginBottom: "10px"

  }
  return (
   <Fragment>
    <MediaQuery query={`(max-width:1149px)`}>
     <ParagraphInfo style={footNoteMobileStyle}>
      <span className="icon-icons-16-px-information" />
      Kimliğinizin ön yüzünde bulunan seri no bilginizi giriniz. Örnek için "i" simgesine tıklayınız.
    </ParagraphInfo>
    </MediaQuery>
    <MediaQuery query={`(min-width:1150px)`}>
     <ParagraphInfo style={footNoteWebStyle}>
      <span className="icon-icons-16-px-information" />
      Kimliğinizin ön yüzünde bulunan seri no bilginizi giriniz. Örnek için "i" simgesine tıklayınız.
    </ParagraphInfo>
    </MediaQuery>
   </Fragment>
  )
 }

 render() {
  const mainParagraphStyles = {
   fontSize: "16px"
  };
  const paperStyle = {
   flexGrow: "1",
   width: "auto"
  };
  const seriNoLabelStyleWeb = {
   fontFamily: 'proximanova',
   color: '#21262C'
  };
  const seriNoLabelStyleMobile = {
   fontSize: "14px",
   fontFamily: 'proximanova',
   color: '#21262C'
  };

  return (
   <Formik
    ref={this.fibaKeyformRef}
    validate={validate}
    initialValues={{ ...this.state }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, errors, touched, values, setFieldValue }) => (
     <Fragment>
      <Paragraph style={mainParagraphStyles}>
       FibaAnahtar’ınızı güvenli bir şekilde belirlemek için
       lütfen aşağıdaki formu eksiksiz doldurunuz.
      </Paragraph>
      <Form>
       {this.props.flag === '1' && (
        <Fragment>
         <Label htmlFor="questionSelectBox">Bilgi Doğrulama</Label>
         <Field
          component={SelectBox}
          value={this.state.code}
          options={localeSortBy(
           this.props.questionTable.map(item => {
            return {
             value: item.questionCode,
             label: item.question
            }
           }),
           'label'
          )}
          placeholder="Doğrulama sorusu seçiniz."
          name="questionSelectBox"
          hasMaxWidth={true}
          isQuestionSelect={true}
          onChange={this.handleChangeQuestionSelectBox}
          onBlur={this.handleBlurQuestionSelectBox()}
          onFocus={this.props.removeCreateFibaKeyInputsError}
          hasError={this.state.invalidQuestionSelectBox}
          questionSelectBox={(value) => this.questionSelectBox(value)}
         />
         {this.state.invalidQuestionSelectBox && (
          <ErrMsg component="div" marginclear>
           Lütfen bir seçim yapınız.
          </ErrMsg>
         )}

         <Input
          type="text"
          name="answer"
          placeholder="Doğrulama sorusu cevabınızı giriniz."
          //maxLength="11"
          //label="Cevap"
          //rules={{ onlyNumber: true }}
          id="answer"
          updateState={(value, name) => this.handleChangeAnswer(value, name)}
          hasError={this.state.invalidAnswer}
          useCustomError={true}
          onBlur={this.handleBlur("answer")}
          onFocus={this.props.removeCreateFibaKeyInputsError}
          autoComplete="off"
         />
         {this.state.invalidAnswer && (
          <ErrMsg component="div" marginclear>
           Lütfen doğrulama sorusu cevabınızı giriniz.
          </ErrMsg>
         )}
        </Fragment>
       )}

       <Input
        type="tel"
        name="nationalIdentityNo"
        placeholder="11 haneli T.C. kimlik numaranızı giriniz."
        maxLength="11"
        label="T.C. Kimlik Numaranız"
        rules={{ onlyNumber: true }}
        id="tckn"
        updateState={(value, name) => this.handleChangeNationalIdentityNo(value, name)}
        hasError={this.state.invalidNationalIdentityNo}
        useCustomError={true}
        onBlur={this.handleBlur("nationalIdentityNo")}
        onFocus={this.props.removeCreateFibaKeyInputsError}
        autoComplete="off"
       />
       {this.state.invalidNationalIdentityNo && (
        <ErrMsg component="div" marginclear>
         Lütfen geçerli bir T.C. kimlik numarası giriniz.
        </ErrMsg>
       )}

       <Modal
        smallModal={true}
        show={this.state.showSample}
        onClose={() => this.setState({ showSample: false })}
       >

        <Paper style={paperStyle}>
         <Tabs
          value={this.state.tabValue}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
         >
          <Tab label="Eski Kimlik" />
          <Tab label="Yeni Kimlik" />
          <Tab icon={<CloseIcon />} />
         </Tabs>
        </Paper>
        <br></br>
        {this.state.tabValue === 0 && (
         <img src={eskiKimlik} alt="eskiKimlik" />
        )}
        {this.state.tabValue === 1 && (
         <img src={yeniKimlik} alt="yeniKimlik" />
        )}

        <Clear />
       </Modal>

       <MediaQuery query={`(max-width:1149px)`}>
        <InputLabel style={seriNoLabelStyleMobile} htmlFor="serialNumber">Nüfus Cüzdanı Seri No</InputLabel>
       </MediaQuery>

       <MediaQuery query={`(min-width:1150px)`}>
        <InputLabel style={seriNoLabelStyleWeb} htmlFor="serialNumber">Nüfus Cüzdanı Seri No</InputLabel>
       </MediaQuery>

       <PasswordInput
        hasError={this.state.invalidSeriNo}
       >
        <TextField
         name='serialNumber'
         id="serialNumber"
         type="text"
         value={this.state.serialNumber}
         onChange={this.handleChangeSeriNo}
         onBlur={this.handleBlur("serialNumber")}
         onFocus={this.props.removeCreateFibaKeyInputsError}
         margin="normal"
         variant="outlined"
         placeholder="Örn: Y07113223"
         autoComplete="off"
         error={this.state.invalidSeriNo}
         helperText={this.state.invalidSeriNo ? 'Lütfen geçerli bir nüfus cüzdanı seri no giriniz.' : ''}
         inputProps={{ maxLength: 15 }}
         // eslint-disable-next-line react/jsx-no-duplicate-props
         InputProps={{
          endAdornment: (
           <InputAdornment position="end">
            <IconButton
             aria-label="toggle password visibility"
             onClick={this.handleInfoIconClick}
             onMouseOver={this.handleInfoIconMouseOver}
             onMouseLeave={this.handleInfoIconMouseleave}
            >
             <Info color="primary" />
            </IconButton>
            {/* <HoverBox> SampleText
             <span>Hover enabled</span>
            </HoverBox> */}

           </InputAdornment>
          )
         }}
        />
       </PasswordInput>

       {this.addInformation()}

       <CityDistrictInputGroups
        hasMaxWidth={true}
        isFibaKey={true}
        values={values}
        errors={errors}
        touched={touched}
        cityProps={{
         // onChange : this.handleChangeQuestionSelectBox,
         // onBlur: this.handleBlurQuestionSelectBox(),
         cityLabel: 'İkametgah Adresi İliniz',
         name: 'addressTable[0].region',
         onFocus: this.props.removeCreateFibaKeyInputsError,
         onChange: val =>
          setFieldValue('addressTable[0].district', null, false)
        }}
        districtProps={{
         districtLabel: 'İkametgah Adresi İlçeniz',
         name: 'addressTable[0].district',
         onChange: this.handleChangeDistrict
        }}
       />

       {this.addButtonValidate(isSubmitting)}

       {this.props.hasCheckedFibaKeyIdentityInfoError && (
        <ErrMsg component="div" marginclear>
         Girdiğiniz bilgiler hatalıdır. Lütfen kontrol ederek tekrar deneyiniz.
        </ErrMsg>
       )}

      </Form>
     </Fragment>
    )}
   />
  )
 }
}

const mapDispatchToProps = {
}

export default connect(
 null,
 mapDispatchToProps
)(CreateFibaKeyInputs)