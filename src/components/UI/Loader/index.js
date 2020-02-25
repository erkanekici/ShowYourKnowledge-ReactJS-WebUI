import React from 'react'
import animationData from './data.json'
import Lottie from 'react-lottie'
import Loader from './styled'

const options = {
 loop: true,
 autoplay: true,
 animationData: animationData,
 rendererSettings: {
  preserveAspectRatio: 'xMidYMid slice'
 }
}

const PreLoader = () =>
   <Loader>
    <Lottie options={options} />
   </Loader>

export default PreLoader