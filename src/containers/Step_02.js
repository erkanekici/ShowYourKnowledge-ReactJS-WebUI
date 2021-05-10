import React, { Component, Fragment } from 'react'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import globalAction from '../store/global/actions'
import { routePathByName } from '../routes'
import { pick } from 'lodash-es'
import Button from '@material-ui/core/Button';
import { ErrMsg } from '../components/styled/FormElements'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { SetProductCode } from '../components/Products'
import { getOfferedProductList } from '../store/products/actions'
import TopMenu from '../components/TopMenu'
import Footer from '../components/Footer'
import ContentStyle from '../components/styled/ContentStyle'
import UserDashboard from '../components/UserDashboard'

class StepSecond extends Component {
  STEP_3_PATH = routePathByName('Step_03')

  state = {
    isErrorExist: false,
    errorMessageContent: '',
    isLoginSuccessful: true
  }

  componentDidMount() {
    this.props.setStep('dashboardStep')

    //GoogleTagManager Events
    this.addGTM()

    //Captcha badge gizleme
    document.getElementsByClassName("grecaptcha-badge")[0].style.visibility = "hidden"

    // this.props
    //   .offerProductList({
    //     transactionId: this.props.transactionId,
    //     applicationNo: this.props.applicationNo
    //   })
    //   .finally(() => this.setState({ isLoading: false }))
  }

  addGTM() {
    window.dataLayer.push({
      'event': 'virtualPageview',
      'virtualPageURL': '/vp/gosterBilgini/dashboard/',
      'userId': this.props.transactionId
    });
  }

  // setProduct = (data = {}) => {
  //   return Promise.resolve(data)
  // }

  // displayPaymentPlan = (val) => {
  //   if (val === '1') {
  //     this.setState({ productCodeSelected: true })
  //     window.scrollTo(0, document.body.scrollHeight)
  //   }
  //   else {
  //     this.setState({ productCodeSelected: false })
  //   }
  // }

  onSubmit = (values, actions) => {
    const request =
    {
      email: this.props.email,
    };
    //Bu setSubmitting kalkacak ve zaten submit button olmayacak ve button disabled durumunu state den yönet
    actions.setSubmitting(true)
    this.getTopic(request).then(() => {
      actions.setSubmitting(false)
    })
  }

  getTopic = (data = {}) => {
    return this.props
      .getTopic({
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
          if (this.props.gameStatus == 1) {
            //Oyun Sayfasina Gec
            this.props.history.replace(this.STEP_3_PATH)
          }
          else {
            //Oyuncu bekleniyor
            this.getGameStatus(this.props.topicId)
          }
        }
      })
  }

  getGameStatus = (topicId) => {
    return this.props
      .getGameStatus({
        topicId,
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
          if (this.props.gameStatus == 1) {
            //Oyun Sayfasina Gec
            this.props.history.replace(this.STEP_3_PATH)
          } else {
            //Oyuncu bekleniyor
            this.getGameStatus(this.props.topicId)
          }
        }
      })
  }

  render() {    
    return (
      <Fragment>
        <TopMenu
          {...this.state}
          setContent={this.setContent}
          changePage={this.changePage}
        />

        <UserDashboard
          {...this.props}
          {...this.state}
          clearErrors={this.clearErrors}
          changePage={this.changePage}
        />       

        <Footer
          setContent={this.setContent}
        />
      </Fragment>

    ); //return
  } //render
}

const mapStateToProps = state => {
  return {
    ...pick(state.global, [
      'transactionId',
      'gameStatus',
      'topicId',
      'hasError',
      'errorMessage'
    ]),
    //productList: state.products.list
  }
}

const mapDispatchToProps = {
  getTopic: globalAction('GetTopic'),
  getGameStatus: globalAction('GetGameStatus'),
  offerProductList: getOfferedProductList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepSecond)