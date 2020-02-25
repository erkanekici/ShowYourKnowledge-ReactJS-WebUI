import React from 'react'
import animationData from './data.json'
import Lottie from 'react-lottie'
import PageCounterWrapper from './styled'

const options = {
 loop: false,
 autoplay: true,
 animationData: animationData,
 rendererSettings: {
  preserveAspectRatio: 'xMidYMid slice'
 }
}

const PageCounter = () =>
   <PageCounterWrapper>
    <Lottie options={options} />
   </PageCounterWrapper>

export default PageCounter