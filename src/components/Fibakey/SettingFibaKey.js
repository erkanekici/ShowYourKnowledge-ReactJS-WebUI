import React, { Component, Fragment } from 'react'
import { isEmpty, words } from 'lodash-es'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import Button, {
 ButtonWrapper,
 ButtonItem,
 ButtonBack
} from '../styled/Button'
import { Paragraph } from '../styled/Layout'
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import isAlpha from 'validator/lib/isAlpha'
import { PasswordInput, ErrMsg } from '../styled/FormElements'
import MediaQuery from 'react-responsive'

class CreateFibaKeyInputs extends Component {

 constructor(props) {
  super(props)
  this.setFibaKeyformRef = React.createRef()
 }

 state = {
  isInputsValidated: false,
  isSubmitButtonDisabled: true,
  friendName: '',
  teacherName: '',
  cartoonHero: '',
  fibaKey: '',
  fibaKeyAgain: '',
  isFriendNameTypeText: false,
  isTeacherNameTypeText: false,
  isCartoonHeroTypeText: false,
  isFibaKeyTypeText: false,
  isFibaKeyAgainTypeText: false,
  invalidFriendName: false,
  invalidTeacherName: false,
  invalidCartoonHero: false,
  invalidFibaKey: false,
  invalidFibaKeyAgain: false,
  unequalFibaKeyAgain: false
 }

 componentDidMount() {
  //document.getElementById('tckn').focus()
  if (this.props.hasSaveFibaKeyError) {
   window.scrollTo(0, document.body.scrollHeight)
  }
 }

 onSubmit = (values, actions) => {
  actions.setSubmitting(false)
  if (!this.canBeSubmitted()) {
   return;
  }

  if (this.props.flag === '0') {
   const request =
   {
    nationalIdentityNo: this.props.nationalIdentityNo,
    transactionId: this.props.transactionId,
    fibaKey: this.state.fibaKey,
    questionAnswerTable: [
     {
      questionCode: '01',
      answer: this.state.friendName
     },
     {
      questionCode: '02',
      answer: this.state.cartoonHero
     },
     {
      questionCode: '03',
      answer: this.state.teacherName
     }
    ]
   };
   //this.setState({ ...this.state, ...values })
   actions.setSubmitting(true)
   this.props.setFibaKey(request).then(() => {
    actions.setSubmitting(false)
   })
  }
  else if (this.props.flag === '1') {
   const request =
   {
    nationalIdentityNo: this.props.nationalIdentityNo,
    transactionId: this.props.transactionId,
    fibaKey: this.state.fibaKey,
    questionAnswerTable: []
   };
   //this.setState({ ...this.state, ...values })
   actions.setSubmitting(true)
   this.props.setFibaKey(request).then(() => {
    actions.setSubmitting(false)
   })
  }


 }

 canBeSubmitted() {
  const errors = this.validateAllInputs(this.state.friendName, this.state.teacherName, this.state.cartoonHero, this.state.fibaKey, this.state.fibaKeyAgain);
  Object.keys(errors).map(item => {
   if (errors[item]) {
    this.setState({ [item]: true });
   }
  })

  return !Object.keys(errors).some(x => errors[x]);

 }

 handleBlur = field => event => {
  const { name, value } = event.target;

  if (value.length === 0) {
   if (name === 'friendName') {
    this.setState({ invalidFriendName: true });
    return;
   }
   if (name === 'teacherName') {
    this.setState({ invalidTeacherName: true });
    return;
   }
   if (name === 'cartoonHero') {
    this.setState({ invalidCartoonHero: true });
    return;
   }
  }
  if (value.length < 3) {
   if (name === 'fibaKey') {
    this.setState({ invalidFibaKey: true });
    return;
   }
   if (name === 'fibaKeyAgain') {
    this.setState({ invalidFibaKeyAgain: true });
    return;
   }
  }

  if (name === 'fibaKeyAgain') {
   if (value !== this.state.fibaKey) {
    this.setState({ unequalFibaKeyAgain: true });
    return;
   }
  }
 };

 validateAllInputs(friendName, teacherName, cartoonHero, fibaKey, fibaKeyAgain) {
  // true means invalid, so our conditions got reversed
  if (this.props.flag === '0') {
   const response =
   {
    invalidFriendName: friendName.length === 0,
    invalidTeacherName: teacherName.length === 0,
    invalidCartoonHero: cartoonHero.length === 0,
    invalidFibaKey: fibaKey.length < 3,
    invalidFibaKeyAgain: fibaKeyAgain.length < 3,
    unequalFibaKeyAgain: !(fibaKeyAgain === fibaKey)
   };
   return response
  }
  else {
   const response =
   {
    invalidFibaKey: fibaKey.length < 3,
    invalidFibaKeyAgain: fibaKeyAgain.length < 3,
    unequalFibaKeyAgain: !(fibaKeyAgain === fibaKey)
   };
   return response
  }
 }

 checkInputsValidated(value, name) {
  let errors = {}
  if (name === 'friendName') {
   errors = this.validateAllInputs(value, this.state.teacherName, this.state.cartoonHero, this.state.fibaKey, this.state.fibaKeyAgain);
  }
  else if (name === 'teacherName') {
   errors = this.validateAllInputs(this.state.friendName, value, this.state.cartoonHero, value, this.state.fibaKey, this.state.fibaKeyAgain);
  }
  else if (name === 'cartoonHero') {
   errors = this.validateAllInputs(this.state.friendName, this.state.teacherName, value, this.state.fibaKey, this.state.fibaKeyAgain);
  }
  else if (name === 'fibaKey') {
   errors = this.validateAllInputs(this.state.friendName, this.state.teacherName, this.state.cartoonHero, value, this.state.fibaKeyAgain);
  }
  else if (name === 'fibaKeyAgain') {
   errors = this.validateAllInputs(this.state.friendName, this.state.teacherName, this.state.cartoonHero, this.state.fibaKey, value);
  }

  if (errors.length !== 0 && !Object.keys(errors).some(x => errors[x])) {
   this.setState({ isInputsValidated: true });
  }
  else {
   this.setState({ isInputsValidated: false });
  }
 }


 handleChangePasswordInput = event => {
  const { name, value } = event.target;

  if (!isEmpty(value) && !isAlpha(words(value).join(''), 'tr-TR')) {
   return;
  }

  this.setState({ [name]: value });

  if (value.length !== 0) {
   if (name === 'friendName') {
    this.setState({ invalidFriendName: false });
   }
   if (name === 'teacherName') {
    this.setState({ invalidTeacherName: false });
   }
   if (name === 'cartoonHero') {
    this.setState({ invalidCartoonHero: false });
   }
   if (name === 'fibaKey') {
    if (value.length > 2) {
     this.setState({ invalidFibaKey: false });
    }
    if (value === this.state.fibaKeyAgain) {
     this.setState({ unequalFibaKeyAgain: false });
    }
   }
   if (name === 'fibaKeyAgain') {
    if (value.length > 2) {
     this.setState({ invalidFibaKeyAgain: false });
    }
    if (value === this.state.fibaKey) {
     this.setState({ unequalFibaKeyAgain: false });
    }
   }
  }

  this.checkInputsValidated(value, name)
 };

 handleClickIcon = (value) => {
  if (value === 'isFriendNameTypeText') {
   this.setState({ isFriendNameTypeText: !this.state.isFriendNameTypeText });
  }
  else if (value === 'isTeacherNameTypeText') {
   this.setState({ isTeacherNameTypeText: !this.state.isTeacherNameTypeText });
  }
  else if (value === 'isCartoonHeroTypeText') {
   this.setState({ isCartoonHeroTypeText: !this.state.isCartoonHeroTypeText });
  }
  else if (value === 'isFibaKeyTypeText') {
   this.setState({ isFibaKeyTypeText: !this.state.isFibaKeyTypeText });
  }
  else if (value === 'isFibaKeyAgainTypeText') {
   this.setState({ isFibaKeyAgainTypeText: !this.state.isFibaKeyAgainTypeText });
  }
 };

 handleMouseDownPassword = event => {
  event.preventDefault();
 };

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
     <Button type="submit" id="but" style={buttonValidateStyle} disabled={isSubmitting || !this.state.isInputsValidated}>
      Belirle
     </Button>
    </ButtonItem>
   </ButtonWrapper>
  )
 }

 getFibaKeyAgainErrorText = () => {
  if (this.state.invalidFibaKeyAgain) {
   return 'Lütfen minimum 3 harfli bir kelime giriniz.'
  }
  else if (this.state.unequalFibaKeyAgain) {
   return 'Girdiğiniz kelime FibaAnahtar alanında belirlediğiniz kelime ile aynı değildir.'
  }
 };

 render() {
  const mainParagraphStyles = {
   fontSize: "16px"
  };
  const inputLabelStyleWeb = {
   fontFamily: 'proximanova',
   color: '#21262C'
  };
  const inputLabelStyleMobile = {
   fontSize: "14px",
   fontFamily: 'proximanova',
   color: '#21262C'
  };

  return (
   <Formik
    ref={this.setFibaKeyformRef}
    initialValues={{ ...this.state }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, errors, touched, values, setFieldValue }) => (
     <Fragment>
      <Paragraph style={mainParagraphStyles}>
       FibaAnahtar’ınız sadece harflerden oluşan, minimum 3 harfli bir kelime olmalıdır.
       Lütfen kolay tahmin edilebilir bir kelime seçmeyiniz ve belirlediğiniz FibaAnahtar'ınızı
       kimseyle paylaşmayınız.
      </Paragraph>
      <Form>
       {this.props.flag === '0' && (
        <Fragment>
         <MediaQuery query={`(max-width:1149px)`}>
          <InputLabel style={inputLabelStyleMobile} htmlFor="friendName">En sevdiğiniz çocukluk arkadaşınızın ismi</InputLabel>
         </MediaQuery>
         <MediaQuery query={`(min-width:1150px)`}>
          <InputLabel style={inputLabelStyleWeb} htmlFor="friendName">En sevdiğiniz çocukluk arkadaşınızın ismi</InputLabel>
         </MediaQuery>
         <PasswordInput
          hasError={this.state.invalidFriendName}
          isSaveFibaKeyInput={true}
         >
          <TextField
           name='friendName'
           //style = {inputStyle}
           id="friendName"
           type={this.state.isFriendNameTypeText ? 'text' : 'password'}
           value={this.state.friendName}
           autoComplete="off"
           onChange={this.handleChangePasswordInput}
           onBlur={this.handleBlur("friendName")}
           onFocus={this.props.removeSaveFibaKeyError}
           margin="normal"
           variant="outlined"
           error={this.state.invalidFriendName}
           //required= {true}
           helperText={this.state.invalidFriendName ? 'Lütfen bu alanı doldurunuz.' : ''}
           inputProps={{ maxLength: 100 }}
           // eslint-disable-next-line react/jsx-no-duplicate-props
           InputProps={{
            endAdornment: (
             <InputAdornment position="end">
              <IconButton
               aria-label="toggle password visibility"
               onClick={(value) => this.handleClickIcon('isFriendNameTypeText')}
               onMouseDown={this.handleMouseDownPassword}
              >
               {this.state.isFriendNameTypeText ? <Visibility /> : <VisibilityOff />}
              </IconButton>
             </InputAdornment>
            )
           }}
          />
         </PasswordInput>

         <MediaQuery query={`(max-width:1149px)`}>
          <InputLabel style={inputLabelStyleMobile} htmlFor="teacherName">En sevdiğiniz öğretmeninizin adı</InputLabel>
         </MediaQuery>
         <MediaQuery query={`(min-width:1150px)`}>
          <InputLabel style={inputLabelStyleWeb} htmlFor="teacherName">En sevdiğiniz öğretmeninizin adı</InputLabel>
         </MediaQuery>
         <PasswordInput
          hasError={this.state.invalidTeacherName}
          isSaveFibaKeyInput={true}
         >
          <TextField
           name='teacherName'
           id="teacherName"
           type={this.state.isTeacherNameTypeText ? 'text' : 'password'}
           value={this.state.teacherName}
           autoComplete="off"
           onChange={this.handleChangePasswordInput}
           onBlur={this.handleBlur("teacherName")}
           onFocus={this.props.removeSaveFibaKeyError}
           margin="normal"
           variant="outlined"
           error={this.state.invalidTeacherName}
           helperText={this.state.invalidTeacherName ? 'Lütfen bu alanı doldurunuz.' : ''}
           inputProps={{ maxLength: 100 }}
           // eslint-disable-next-line react/jsx-no-duplicate-props
           InputProps={{
            endAdornment: (
             <InputAdornment position="end">
              <IconButton
               aria-label="toggle password visibility"
               onClick={(value) => this.handleClickIcon('isTeacherNameTypeText')}
               onMouseDown={this.handleMouseDownPassword}
              >
               {this.state.isTeacherNameTypeText ? <Visibility /> : <VisibilityOff />}
              </IconButton>
             </InputAdornment>
            )
           }}
          />
         </PasswordInput>

         <MediaQuery query={`(max-width:1149px)`}>
          <InputLabel style={inputLabelStyleMobile} htmlFor="cartoonHero">En sevdiğiniz çizgi film kahramanı</InputLabel>
         </MediaQuery>
         <MediaQuery query={`(min-width:1150px)`}>
          <InputLabel style={inputLabelStyleWeb} htmlFor="cartoonHero">En sevdiğiniz çizgi film kahramanı</InputLabel>
         </MediaQuery>
         <PasswordInput
          hasError={this.state.invalidCartoonHero}
          isSaveFibaKeyInput={true}
         >
          <TextField
           name='cartoonHero'
           id="cartoonHero"
           type={this.state.isCartoonHeroTypeText ? 'text' : 'password'}
           value={this.state.cartoonHero}
           autoComplete="off"
           onChange={this.handleChangePasswordInput}
           onBlur={this.handleBlur("cartoonHero")}
           onFocus={this.props.removeSaveFibaKeyError}
           margin="normal"
           variant="outlined"
           error={this.state.invalidCartoonHero}
           helperText={this.state.invalidCartoonHero ? 'Lütfen bu alanı doldurunuz.' : ''}
           inputProps={{ maxLength: 100 }}
           // eslint-disable-next-line react/jsx-no-duplicate-props
           InputProps={{
            endAdornment: (
             <InputAdornment position="end">
              <IconButton
               aria-label="toggle password visibility"
               onClick={(value) => this.handleClickIcon('isCartoonHeroTypeText')}
               onMouseDown={this.handleMouseDownPassword}
              >
               {this.state.isCartoonHeroTypeText ? <Visibility /> : <VisibilityOff />}
              </IconButton>
             </InputAdornment>
            )
           }}
          />
         </PasswordInput>
        </Fragment>
       )}

       <MediaQuery query={`(max-width:1149px)`}>
        <InputLabel style={inputLabelStyleMobile} htmlFor="fibaKey">FibaAnahtar</InputLabel>
       </MediaQuery>
       <MediaQuery query={`(min-width:1150px)`}>
        <InputLabel style={inputLabelStyleWeb} htmlFor="fibaKey">FibaAnahtar</InputLabel>
       </MediaQuery>
       <PasswordInput
        hasError={this.state.invalidFibaKey}
        isSaveFibaKeyInput={true}
       >
        <TextField
         name='fibaKey'
         id="fibaKey"
         type={this.state.isFibaKeyTypeText ? 'text' : 'password'}
         value={this.state.fibaKey}
         autoComplete="off"
         onChange={this.handleChangePasswordInput}
         onBlur={this.handleBlur("fibaKey")}
         onFocus={this.props.removeSaveFibaKeyError}
         margin="normal"
         variant="outlined"
         error={this.state.invalidFibaKey}
         helperText={this.state.invalidFibaKey ? 'Lütfen minimum 3 harfli bir kelime giriniz.' : ''}
         inputProps={{ maxLength: 50 }}
         // eslint-disable-next-line react/jsx-no-duplicate-props
         InputProps={{
          endAdornment: (
           <InputAdornment position="end">
            <IconButton
             aria-label="toggle password visibility"
             onClick={(value) => this.handleClickIcon('isFibaKeyTypeText')}
             onMouseDown={this.handleMouseDownPassword}
            >
             {this.state.isFibaKeyTypeText ? <Visibility /> : <VisibilityOff />}
            </IconButton>
           </InputAdornment>
          )
         }}
        />
       </PasswordInput>

       <MediaQuery query={`(max-width:1149px)`}>
        <InputLabel style={inputLabelStyleMobile} htmlFor="fibaKey">FibaAnahtar (Tekrar)</InputLabel>
       </MediaQuery>
       <MediaQuery query={`(min-width:1150px)`}>
        <InputLabel style={inputLabelStyleWeb} htmlFor="fibaKey">FibaAnahtar (Tekrar)</InputLabel>
       </MediaQuery>
       <PasswordInput
        hasError={this.state.invalidFibaKeyAgain || this.state.unequalFibaKeyAgain}
        isSaveFibaKeyInput={true}
       >
        <TextField
         name='fibaKeyAgain'
         id="fibaKeyAgain"
         type={this.state.isFibaKeyAgainTypeText ? 'text' : 'password'}
         value={this.state.fibaKeyAgain}
         autoComplete="off"
         onChange={this.handleChangePasswordInput}
         onBlur={this.handleBlur("fibaKeyAgain")}
         onFocus={this.props.removeSaveFibaKeyError}
         margin="normal"
         variant="outlined"
         error={this.state.invalidFibaKeyAgain || this.state.unequalFibaKeyAgain}
         helperText={this.getFibaKeyAgainErrorText()}
         inputProps={{ maxLength: 50 }}
         // eslint-disable-next-line react/jsx-no-duplicate-props
         InputProps={{
          endAdornment: (
           <InputAdornment position="end">
            <IconButton
             aria-label="toggle password visibility"
             onClick={(value) => this.handleClickIcon('isFibaKeyAgainTypeText')}
             onMouseDown={this.handleMouseDownPassword}
            >
             {this.state.isFibaKeyAgainTypeText ? <Visibility /> : <VisibilityOff />}
            </IconButton>
           </InputAdornment>
          )
         }}
        />
       </PasswordInput>

       {this.addButtonValidate(isSubmitting)}

       {this.props.hasSaveFibaKeyError && (
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