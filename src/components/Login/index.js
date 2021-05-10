import React, { Component, Fragment } from 'react'
import { Formik, Form } from 'formik'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ErrMsg, InfoMsg } from '../styled/FormElements'
import isEmail from 'validator/lib/isEmail'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class Login extends Component {

  state = {
    isInputsValidated: false,
    email: '',
    password: '',
    captcha: '',
    isPasswordTypeText: false,
    invalidEmail: false,
    invalidEmailFormat: false,
    invalidPassword: false,
    alert: true
  }

  componentDidMount() {
    this.addGTM()

    //recaptcha ekleme
    const sitekey = window.APP_CONFIG.grecaptcha_sitekey
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(sitekey, { action: 'login' }).then((token) => {
        this.setState({ captcha: token })
      })
    })
  }

  addGTM() {
    window.dataLayer.push({
      'event': 'virtualPageview',
      'virtualPageURL': '/vp/gosterBilgini/login/',
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
    // if (value === 'isUserNameTypeText') {
    //  this.setState({ isUserNameTypeText: !this.state.isUserNameTypeText });
    // }
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
        if (isEmail(value, [])) {
          this.setState({ invalidEmailFormat: false });
        }
      }
      if (name === 'password') {
        this.setState({ invalidPassword: false });
      }
    }
    //this.checkInputsValidated(value, name)
  };

  checkInputsValidated(value, name) {
    let errors = {}
    if (name === 'email') {
      errors = this.validateAllInputs(value, this.state.password);
    }
    else if (name === 'password') {
      errors = this.validateAllInputs(this.state.email, value);
    }

    //checkErrors
    if (errors.length !== 0 && !Object.keys(errors).some(x => errors[x])) {
      this.setState({ isInputsValidated: true });
    }
    else {
      this.setState({ isInputsValidated: false });
    }
  }

  validateAllInputs(email, password) {
    // true means invalid, so our conditions got reversed
    const response =
    {
      invalidEmail: email.length === 0,
      invalidEmailFormat: !isEmail(email, []),
      invalidPassword: password.length === 0
    };
    return response
  }

  canBeSubmitted() {
    const errors = this.validateAllInputs(this.state.email, this.state.password);
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

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ alert: false });
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
    this.props.login(request).then(() => {
      actions.setSubmitting(false)
    })
  }

  render() {
    const avatarStyle = {
      marginBottom: "5px",
      backgroundColor: "#dc004e",
    };
    const submitButtonStyle = {
      backgroundColor: "#27c007",
      height: "55px",
      marginTop: "16px"
    };
    const submitButtonDisabledStyle = {
      height: "55px",
      marginTop: "16px"
    };
    const gridStyle = {
      marginTop: "10px",
      marginBottom: "10px",
    };
    const pageStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };

    return (
      <Formik
        initialValues={{ ...this.state }}
        onSubmit={this.onSubmit}
        render={({ isSubmitting, errors, touched }) => (
          <Fragment>
            <div style={pageStyle}>
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{color:"#0007C9"}}>
                Giriş Yap
              </Typography>
              <Form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="userName"
                  label="E-Posta Adresi"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChangePasswordInput}
                  error={this.state.invalidEmail || this.state.invalidEmailFormat}
                  //helperText={this.state.invalidEmail ? 'Lütfen bu alanı doldurunuz.' : ''}
                  helperText={this.getEmailErrorText()}
                  inputProps={{ maxLength: 100 }}
                />
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
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Beni Unutma"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                  style={isSubmitting ? submitButtonDisabledStyle : submitButtonStyle}
                >
                  Giriş Yap
                </Button>
                <Grid container style={gridStyle}>
                  <Grid item xs>
                    <Link
                      style={{ float: "left", color: "black" }} href="#" variant="body2"
                      onClick={this.props.forgotPassword}
                    >
                      Şifremi Unuttum?
                    </Link>
                    <Link
                      style={{ float: "right", color: "black" }} href="#" variant="body2"
                      onClick={this.props.goRegisterPage}
                    >
                      Bir hesabın yok mu? <b><font color="#0007C9">Üye Ol</font></b>
                    </Link>
                  </Grid>
                </Grid>

                {/* <div>
         <hr
          style={{
           color: "black",
           backgroundColor: "#000005",
           height: 1,
           width: 180,
           float: "left"
          }}
         />
         <b>VEYA</b>
         <hr
          style={{
           color: "black",
           backgroundColor: "#000005",
           height: 1,
           width: 180,
           float: "right"
          }}
         />
        </div>
        <Button
         type="button"
         fullWidth
         variant="contained"
         color="primary"
         style={signUpButtonStyle}
         onClick={this.props.goRegisterPage}
        >
         Kayıt Ol
        </Button> */}
                {this.props.isErrorExist && (
                  <ErrMsg component="div" marginclear="true">
                    {this.props.errorMessageContent}
                  </ErrMsg>
                )}
                {/* {this.props.activation === "1" && (
                  <InfoMsg component="div" marginclear="true">
                    Hesabınız aktifleştirilmiştir. E-posta ve şifre bilgilerinizle giriş yapabilirsiniz.
                  </InfoMsg>
                )} */}

                {this.props.activation === "1" && (
                  <Snackbar 
                    style={{ display: 'contents' }} 
                    open={this.state.alert} 
                    autoHideDuration={3000} 
                    onClose={this.handleAlertClose} 
                  >
                    {/*Alert severity cesitleri :error,warning,info */}
                    <Alert variant="filled" severity="success" onClose={this.handleAlertClose}>
                      Hesabınız aktifleştirilmiştir. E-posta ve şifre bilgilerinizle giriş yapabilirsiniz.
                    </Alert>
                  </Snackbar>
                )}                
              </Form>
            </div>
          </Fragment>
        )} //Formik render
      /> //Formik
    ); //return
  } //render
}

export default Login
