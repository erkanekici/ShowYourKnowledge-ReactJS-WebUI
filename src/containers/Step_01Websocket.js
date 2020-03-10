import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash-es'
import globalAction from '../store/global/actions'
//import '../main.css';
import SockJsClient from 'react-stomp';
//import { TalkBox } from 'react-talk';
//import { Formik, Form } from 'formik'
//import Button, { ButtonWrapper, ButtonItem } from '../components/styled/Button'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class StepFirst extends Component {

 constructor(props) {
  super(props);
  this.start = this.start.bind(this);
  this.onMessageReceive = this.onMessageReceive.bind(this);
  this.sendMessage = this.sendMessage.bind(this);
 }

 // componentDidMount() {
 //  this.getOTP();
 // }

 state = {
  connected: false,
  startConnection: false,
  msg: '',
  adres: '',
  messages: []
 }

 getOTP = (data = {}) => {
  return this.props
   .getOTP({
    ...data,
    ...pick(this.props, 'transactionId', 'channelCode', 'companyCode')
   })
   .then((resp) => {
    
    console.log(this.props.topic);
    this.setState({ adres: this.props.topic })
    this.setState({ startConnection: true })
   })
 }

 start() {
  var topic = {
   deger1: 'deger1',
   deger2: 'deger2'
  };
  this.getOTP(topic);
 }

 onConnected = (msg, topic) => {
  
  this.setState({ connected: true })
 }

 onMessageReceive = (mesaj, topic) => {
  
  this.setState({ messages: [mesaj.msg] })
 }

 onDisconnected = (msg, topic) => {
  
  this.setState({ connected: false })
  this.setState({ startConnection: false })
 }

 sendMessage = () => {
  
  try {
   var opt_headers = {
    login: 'optLog',
    sid: 'optsid1'
   };
   var mesaj = {
    msg: this.state.msg,
    user: 'optsid1'
   };
   //this.clientRef.sendMessage("/app/chat.sendMessage", JSON.stringify(this.state.msg), opt_headers);
   this.clientRef.sendMessage("/app/chat.sendMessage/room1", JSON.stringify(mesaj), opt_headers);
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
  const classes = makeStyles(theme => ({
   paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   },
   avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
   },
   form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
   },
   submit: {
    margin: theme.spacing(3, 0, 2),
   },
  }));

  var headers = {
   login: 'mylogin',
   sid: 'sid1'
  };

  return (
   <Container component="main" maxWidth="xs">
    <CssBaseline />
    {!this.state.startConnection && (
     <div className={classes.paper}>
      <Avatar className={classes.avatar}>
       <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
       Sign in
     </Typography>
      <form className={classes.form} noValidate>
       <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
       />
       <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
       />
       <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
       />
       <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={this.start}
       >
        Sign In
      </Button>  
      </form>
     </div>
    )}
    {this.state.startConnection && (
     <Fragment>
      <Box mt={8}>
       <TextareaAutosize
        aria-label="minimum height"
        rows={3}
        placeholder="Minimum 3 rows"
        onChange={this.handleChangeTextArea}
       />
       {/* <TextField
       placeholder="MultiLine with rows: 2 and rowsMax: 4"
       multiline={true}
       rows={2}
       rowsMax={4}
       onChange={this.handleChangeTextArea}
      /> */}

       <InputLabel>{this.state.messages}</InputLabel>
      </Box>

      <Button
       type="button"
       fullWidth
       variant="contained"
       color="primary"
       className={classes.submit}
       onClick={this.sendMessage}
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
    )}

    {/* <Box mt={8}>
     <Copyright />
    </Box> */}

   </Container>
  );
 }

 // render() {
 //  var headers = {
 //   login: 'mylogin',
 //   sid: 'sid1'
 //  };
 //  return (
 //   <Formik
 //    ref={this.setFibaKeyformRef}
 //    initialValues={{ ...this.state }}
 //    onSubmit={this.onSubmit}
 //    render={({ isSubmitting, errors, touched, values, setFieldValue }) => (
 //     <Fragment>
 //      <Form>
 //       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
 //       {this.addButtonValidate(isSubmitting)}
 //      </Form>
 //      {/* <TalkBox
 //      topic="react-websocket-template"
 //      currentUserId="123"
 //      currentUser="Ahmet"
 //      messages={this.state.messages}
 //      onSendMessage={this.sendMessage}
 //      connected={this.state.clientConnected}
 //     /> */}
 //      {this.state.startConnection && (
 //       <SockJsClient
 //        url='http://localhost:8091/ws'
 //        topics={['/topic/chat.sendMessage', '/topic/chat.addUser']}
 //        onMessage={this.onMessageReceive}
 //        ref={(client) => { this.clientRef = client }}
 //        onConnect={() => { this.setState({ connected: true }) }}
 //        onDisconnect={() => { this.setState({ connected: false }) }}
 //        onConnectFailure={(error) => { console.log("Conncet Hata" + error); }}
 //        headers={headers}
 //       //subscribeHeaders={headers}
 //       //heartbeatIncoming={10000}
 //       //heartbeatOutgoing={10000}
 //       />
 //      )}
 //     </Fragment>
 //    )}
 //   />
 //  )
 // }
}

const mapStateToProps = state => {
 return pick(state.global, [
  'transactionId',  
  'topic',
  'hasError',
  'errorMessage',
  'expiredTransaction'
 ])
}

const mapDispatchToProps = {
 getOTP: globalAction('GetOTP'),
 validateOTP: globalAction('ValidateOTP')
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(StepFirst)