import React, { Component } from 'react'
import CountDown from './styled'

class CountDownTimer extends Component {
 state = {
  time: 0,
  timer: null
 }

 componentDidMount() {
  this.startTimer()
 }

 componentWillUnmount() {
  this.stopTimer()
 }

 formatTime(time) {
  let seconds = time % 60;
  let minutes = Math.floor(time / 60);
  minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
  seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
  return minutes + ':' + seconds;
 }

 startTimer = () => {
  this.setState({ time: this.props.seconds })

  const timer = setInterval(() => {
   if (this.props.onChange) this.props.onChange(this.state.time)

   if (this.state.time <= 0) {
    this.props.onTimeEnded()
    this.stopTimer()
   } else {
    this.setState(state => {
     return { time: state.time - 1 }
    })
   }
  }, 1000)

  this.setState({ timer })
 }

 stopTimer = () => {
  clearInterval(this.state.timer)
 }

 restartTimer = () => {
  this.stopTimer()
  this.startTimer()
 }

 render() {
  return <CountDown>{this.formatTime(this.state.time)}</CountDown>
 }
}

export default CountDownTimer