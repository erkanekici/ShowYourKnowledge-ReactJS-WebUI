import React, { Component } from 'react'
import Count from './styled'

class Counter extends Component {
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
  return <Count>{this.state.time} sn</Count>
 }
}

export default Counter