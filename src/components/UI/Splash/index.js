import React, { Fragment, Component } from 'react'
import { LottieWrapper } from './styled'
import Lottie from 'react-lottie'
import animationData from './data.json'

const options = {
 loop: false,
 autoplay: true,
 animationData: animationData,
 rendererSettings: {
  preserveAspectRatio: 'xMidYMid slice'
 }
}

const isProduction = process.env.NODE_ENV === 'production'


class Splash extends Component {
  state = {
   animationEnd : false
  }

  componentDidMount() {
   setTimeout(() => {
    this.setState({ animationEnd : true })
   }, 2600)
  }

  render(){
   return(
    isProduction && (
     <Fragment>
      <LottieWrapper animationEnd = {this.state.animationEnd}/>
      <Lottie options={options} />
     </Fragment>
    )
   )

  }
}

export default Splash