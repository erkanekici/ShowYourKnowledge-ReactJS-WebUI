import React, { Component, Fragment } from 'react'
import { pick } from 'lodash-es'
import { Formik, Form } from 'formik'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ErrMsg } from '../styled/FormElements'
import isEmail from 'validator/lib/isEmail'

class Register extends Component {

  // constructor(props) {
  //  super(props);
  //  this.loginFormRef = React.createRef()
  // }

  state = {
    isInputsValidated: false,
    email: '',
    password: '',
    captcha:'',
    passwordRepeat: '',
    isPasswordTypeText: false,
    isPasswordRepeatTypeText: false,
    invalidEmail: false,
    invalidEmailFormat: false,
    invalidPassword: false,
    invalidPasswordRepeat: false,
    unequalPassword: false
  }

  componentDidMount() {
    this.addGTM()

    //recaptcha ekleme
    const sitekey = window.APP_CONFIG.grecaptcha_sitekey
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(sitekey, {action:'register'}).then((token) => {
        this.setState({captcha:token})        
      })
    })
  }

  addGTM() {
    window.dataLayer.push({
      'event': 'virtualPageview',
      'virtualPageURL': '/vp/gosterBilgini/register/',
      'userId': this.props.transactionId
    });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickIcon = (value) => {
    if (value === 'isPasswordTypeText') {
      this.setState({ isPasswordTypeText: !this.state.isPasswordTypeText });
    }
    else if (value === 'isPasswordRepeatTypeText') {
      this.setState({ isPasswordRepeatTypeText: !this.state.isPasswordRepeatTypeText });
    }
  };

  handleChangePasswordInput = event => {
    const { name, value } = event.target;

    // if (!isEmpty(value) && !isAlpha(words(value).join(''), 'tr-TR')) {
    //  return;
    // }

    this.setState({ [name]: value });

    if (value.length !== 0) {
      if (name === 'email') {
        this.setState({ invalidEmail: false });
        if(isEmail(value,[])){
          this.setState({ invalidEmailFormat: false });
        }
      }
      if (name === 'password') {
        this.setState({ invalidPassword: false });
        if (value === this.state.passwordRepeat) {
          this.setState({ unequalPassword: false });
        }
      }
      if (name === 'passwordRepeat') {
        this.setState({ invalidPasswordRepeat: false });
        if (value === this.state.password) {
          this.setState({ unequalPassword: false });
        }
      }
    }
    this.checkInputsValidated(value, name)
  };

  checkInputsValidated(value, name) {
    let errors = {}
    if (name === 'email') {
      errors = this.validateAllInputs(value, this.state.password, this.state.passwordRepeat);
    }
    else if (name === 'password') {
      errors = this.validateAllInputs(this.state.email, value, this.state.passwordRepeat);
    }
    else if (name === 'passwordRepeat') {
      errors = this.validateAllInputs(this.state.email, this.state.password, value);
    }

    //checkErrors
    if (errors.length !== 0 && !Object.keys(errors).some(x => errors[x])) {
      this.setState({ isInputsValidated: true });
    }
    else {
      this.setState({ isInputsValidated: false });
    }
  }

  validateAllInputs(email, password, passwordRepeat) {
    // true means invalid, so our conditions got reversed
    const response =
    {
      invalidEmail: email.length === 0,
      invalidEmailFormat: !isEmail(email,[]),
      invalidPassword: password.length === 0,
      invalidPasswordRepeat: passwordRepeat.length === 0,
      unequalPassword: !(password === passwordRepeat)
    };
    return response
  }

  canBeSubmitted() {
    const errors = this.validateAllInputs(this.state.email, this.state.password, this.state.passwordRepeat);
    // eslint-disable-next-line array-callback-return
    Object.keys(errors).map(item => {
      if (errors[item]) {
        this.setState({ [item]: true });
      }
    })
    return !Object.keys(errors).some(x => errors[x]);
  }

  getEmailErrorText = () => {
    if (this.state.invalidEmail) {
      return 'Lütfen bu alanı doldurunuz.'
    }
    else if (this.state.invalidEmailFormat) {
      return 'Lütfen geçerli bir email adresi giriniz.'
    }
  };

  getFibaKeyAgainErrorText = () => {
    if (this.state.invalidPasswordRepeat) {
      return 'Lütfen bu alanı doldurunuz.'
    }
    else if (this.state.unequalPassword) {
      return 'Girdiğiniz kelime Şifre alanında belirlediğiniz kelime ile aynı değildir.'
    }
  };

  onSubmit = (values, actions) => {    
    actions.setSubmitting(false)
    if (!this.canBeSubmitted()) {
      return;
    }
    const request =
    {
      email: this.state.email,
      password: this.state.password,
      captcha: this.state.captcha
      // questionAnswerTable: [
      //   {
      //     questionCode: '01',
      //     answer: this.state.friendName
      //   },
      //   {
      //     questionCode: '02',
      //     answer: this.state.cartoonHero
      //   },
      //   {
      //     questionCode: '03',
      //     answer: this.state.teacherName
      //   }
      // ]
    };
    actions.setSubmitting(true)
    this.props.register(request).then(() => {
      actions.setSubmitting(false)
    })
  }

  render() {
    const avatarStyle = {
      marginBottom: "5px",
      backgroundColor: "#0007C9",
    };
    const signUpButtonStyle = {
      height: "55px",
      marginTop: "16px",
      backgroundColor:"#0007C9"
    };
    const pageStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };
    const gridStyle = {
      marginTop: "10px",
      marginBottom: "10px",
    };

    return (
      <Formik
        initialValues={{ ...this.state }}
        onSubmit={this.onSubmit}
        render={({ isSubmitting, errors, touched }) => (
          <Fragment>
            <div style={pageStyle}>
              <Avatar style={avatarStyle}>
                <PersonAdd />
              </Avatar>
              <Typography component="h1" variant="h5" style={{color: "#0007C9"}}>
                Kayıt Ol
             </Typography>
              <Form>
                {/* <Grid container spacing={2}> */}
                {/* <Grid item xs={12} sm={6}>
          <TextField
           autoComplete="fname"
           name="firstName"
           variant="outlined"
           required
           fullWidth
           id="firstName"
           label="First Name"
           autoFocus
          />
         </Grid>
         <Grid item xs={12} sm={6}>
          <TextField
           variant="outlined"
           required
           fullWidth
           id="lastName"
           label="Last Name"
           name="lastName"
           autoComplete="lname"
          />
         </Grid> */}
                {/* <Grid item xs={12}> */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="E-Posta Adresi"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChangePasswordInput}
                  error={this.state.invalidEmail || this.state.invalidEmailFormat}
                  helperText={this.getEmailErrorText()}
                  //helperText={this.state.invalidEmail ? 'Lütfen bu alanı doldurunuz.' : ''}
                  inputProps={{ maxLength: 100 }}
                />
                {/* </Grid> */}
                {/* <Grid item xs={12}> */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Şifre"
                  type={this.state.isPasswordTypeText ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChangePasswordInput}
                  error={this.state.invalidPassword}
                  helperText={this.state.invalidPassword ? 'Lütfen bu alanı doldurunuz.' : ''}
                  inputProps={{ maxLength: 10 }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(value) => this.handleClickIcon('isPasswordTypeText')}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.isPasswordTypeText ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="passwordRepeat"
                  label="Şifre Tekrar"
                  type={this.state.isPasswordRepeatTypeText ? 'text' : 'password'}
                  id="passwordRepeat"
                  autoComplete="current-password"
                  value={this.state.passwordRepeat}
                  onChange={this.handleChangePasswordInput}
                  error={this.state.invalidPasswordRepeat || this.state.unequalPassword}
                  helperText={this.getFibaKeyAgainErrorText()}
                  inputProps={{ maxLength: 10 }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(value) => this.handleClickIcon('isPasswordRepeatTypeText')}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.isPasswordRepeatTypeText ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {/* <Grid>
                  <Grid item xs={12}>
                    <FormControlLabel                     
                      control={<Checkbox value="allowExtraEmails" color="primary"/>}
                      label={<Typography style={{fontSize: "14px"}}>Kampanyalardan ve haberlerden e-posta aracılığıyla haberdar olmak istiyorum.</Typography>}
                    /> 
                 </Grid>
                </Grid>  */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  style={signUpButtonStyle}
                >
                  Kayıt Ol
                </Button>
                <Grid container justify="flex-end" style={gridStyle}>
                  <Grid item>
                    <Link
                      style={{ color: "black" }}
                      href="#" variant="body2"
                      onClick={this.props.goLoginPage}
                    >
                      Bir Hesabın var mı? <b><font color="#27c007">Giriş yap</font></b>
                    </Link>
                  </Grid>
                </Grid>
                {this.props.isErrorExist && (
                  <ErrMsg component="div" marginclear="true">
                    {this.props.errorMessageContent}
                  </ErrMsg>
                )}
              </Form>
            </div>
          </Fragment>
        )} //Formik render
      /> //Formik
    ); //return
  } //render
}

export default Register
