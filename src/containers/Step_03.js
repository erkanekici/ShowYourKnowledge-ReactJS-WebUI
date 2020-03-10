import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import globalAction from '../store/global/actions'
import { routePathByName } from '../routes'
import { pick } from 'lodash-es'
import SockJsClient from 'react-stomp';
import Button from '@material-ui/core/Button';
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

class StepThird extends Component {
  STEP_4_PATH = routePathByName('Step_04')

  state = {
    isErrorExist: false,
    errorMessageContent: '',
    connected: false,
    msg: '',
    adres: this.props.topic,
    messages: []
  }

  componentDidMount() {
    this.props.setStep('startGame')

    //GoogleTagManager Events
    this.addGTM()

    //Captcha badge gizleme
    //document.getElementsByClassName("grecaptcha-badge")[0].style.visibility = "hidden"

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
      'virtualPageURL': '/vp/gosterBilgini/startGame/',
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

  onConnected = (msg, topic) => {
    debugger;
    this.setState({ connected: true })
    // Oyuna başlamaya hazır mısın ekranı çıkart evet derse sendMessage ile statedeki isStarted true yap
    //veya
    // connected ok ise sendMessage ile userID ni gönder, rakip o userID ile servisten
    // bilgilerini alsın ve rakibe ait bilgiler ekranda görünsün sonra isStarted true yap ve 
    // 5 sn sonra yarışı başlat
    this.sendMessage()
  }

  onMessageReceive = (mesaj, topic) => {
    debugger;
    this.setState({ messages: [...this.state.messages,mesaj.msg] })
  }

  onDisconnected = (msg, topic) => {
    debugger;
    this.setState({ connected: false })    
  }

  sendMessage = () => {
    debugger;
    try {
      var opt_headers = {
        login: 'optLog',
        sid: 'optsid1'
      };
      var mesaj = {
        msg: this.state.msg,
        user: 'optsid1'
      };
      //this.clientRef.sendMessage("/app/sendMessage", JSON.stringify(this.state.msg), opt_headers);
      this.clientRef.sendMessage("/app/chat.sendMessage/"+this.props.topicId, JSON.stringify(mesaj), opt_headers);
      //this.clientRef.sendMessage("/app/chat.sendMessage/room1", JSON.stringify(mesaj), opt_headers);
      return true;
    }
    catch (e) {
      console.log('error')
      return false;
    }
  }

  handleChangeTextArea = event => {
    const { value } = event.target;
    this.setState({ msg: value });
  };

  render() {
    const submitButtonStyle = {
      backgroundColor: "#27c007",
      height: "55px",
      marginTop: "16px"
    };
    const submitButtonDisabledStyle = {
      height: "55px",
      marginTop: "16px"
    };
    var headers = {
      transactionId: this.props.transactionId,
      topic: this.props.topic
    };
    return (
      <Fragment>
        
          <TextareaAutosize
            style={{width:"100%", textAlign: "center"}}
            aria-label="minimum height"
            rows={5}
            placeholder="Mesajınızı giriniz"
            onChange={this.handleChangeTextArea}
          />
          {/* <TextField
          placeholder="MultiLine with rows: 2 and rowsMax: 4"
          multiline={true}
          rows={2}
          rowsMax={4}
          onChange={this.handleChangeTextArea}
         /> */}

          <InputLabel
            style={{width:"100%", textAlign: "center"}}
          >
            {this.state.messages}
          </InputLabel>
        

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.sendMessage}
          //disabled={isSubmitting}
          //style={isSubmitting ? submitButtonDisabledStyle : submitButtonStyle}
        >
          Mesajı Gönder
        </Button>

        <SockJsClient
          url='http://localhost:8091/ws'
          topics={[this.state.adres]} // '/topic/chat.sendMessage', '/topic/chat.addUser'
          onMessage={this.onMessageReceive}
          ref={(client) => { this.clientRef = client }}
          onConnect={() => { this.onConnected() }}
          onDisconnect={() => { this.onDisconnected() }}
          onConnectFailure={(error) => { console.log("Bağlantı Hatası" + error) }}
          headers={headers}
        //subscribeHeaders={headers}
        //heartbeatIncoming={10000}
        //heartbeatOutgoing={10000}
        />
      </Fragment>
    ); //return
  } //render
}

const mapStateToProps = state => {
  return {
    ...pick(state.global, [
      'transactionId',
      'topic',
      'topicId',
      'hasError',
      'errorMessage'
    ]),
    //productList: state.products.list
  }
}

const mapDispatchToProps = {
  offerProductList: getOfferedProductList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepThird)