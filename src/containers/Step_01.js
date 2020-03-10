import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash-es'
import globalAction from '../store/global/actions'
import { routePathByName } from '../routes'
import MainPageContent from '../components/MainPageContent'
import Footer from '../components/Footer'
import ContentWrapper from '../components/styled/ContentWrapper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { Logo } from '../components/styled/Layout'
import gameLogo from '../images/logom.png'
import Login from '../components/Login'
import Register from '../components/Register'
import TopMenu from '../components/TopMenu'

class StepFirst extends Component {
  STEP_2_PATH = routePathByName('Step_02')
  STEP_10_PATH = routePathByName('Step_10')
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setContent("mainContent");
  }

  state = {
    isLogin: true,
    mainContent: true,
    rules: false,
    help: false,
    contact: false,
    isErrorExist: false,
    errorMessageContent: ''    
  }

  setContent = (contentID) => {
    this.setState({ mainContent: false })
    this.setState({ rules: false })    
    this.setState({ help: false })
    this.setState({ contact: false })

    this.setState({[contentID]: true})
  }

  changePage = (value) => {
    this.clearErrors()
    if (value === 'login') {
      this.setState({ isLogin: true })
    }
    else {
      this.setState({ isLogin: false })
    }
  }

  login = (data = {}) => {
    return this.props
      .login({
        ...data,
        ...pick(this.props, 'transactionId')
      })
      .then((resp) => {
        if (this.props.hasError) {
          this.setState({ isErrorExist: true })
          this.setState({ errorMessageContent: resp.error })
        }
        else {
          this.setState({ isErrorExist: false })
          this.setState({ errorMessageContent: "" })
          this.props.history.replace(this.STEP_2_PATH)
        }
      })
  }

  register = (data = {}) => {
    return this.props
      .register({
        ...data,
        ...pick(this.props, 'transactionId')
      })
      .then((resp) => {
        if (this.props.hasError) {
          this.setState({ isErrorExist: true })
          this.setState({ errorMessageContent: resp.error })
        }
        else { //resp.payload
          this.setState({ isErrorExist: false })
          this.setState({ errorMessageContent: "" })
          this.redirectToSuccessPage();
        }
      })
  }

  redirectToSuccessPage = () => {
    this.props.history.replace(this.STEP_10_PATH, {
     message: "KAYIT BAŞARILI"
    })
  }

  clearErrors = () => {
    this.setState({ isErrorExist: false })
    this.setState({ errorMessageContent: '' })
  }

  render() {    
    return (
      <Fragment>

        <TopMenu
          setContent={this.setContent}
          changePage={this.changePage}
        />

        <MainPageContent
          {...this.props}
          {...this.state}
          login={this.login}
          register={this.register}
          clearErrors={this.clearErrors}
          changePage={this.changePage}
        />

        <Footer
          setContent={this.setContent}
        />

      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return pick(state.global, [
    'transactionId',
    'topic',
    'activation',
    'hasError',
    'errorMessage'
  ])
}

const mapDispatchToProps = {
  login: globalAction('Login'),
  register: globalAction('Register')
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepFirst)