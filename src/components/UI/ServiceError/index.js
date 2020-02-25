import React, { Component } from 'react'
import { ErrMsg } from '../../styled/FormElements'
import store from '../../../store'
import { GLOBAL_ERROR_CLEAR } from '../../../store/actionTypes'

class ServiceError extends Component {
 componentWillUnmount() {
  const { clearGlobalError = true } = this.props
  if (clearGlobalError) {
   setTimeout(() => {
    store.dispatch({ type: GLOBAL_ERROR_CLEAR })
   }, 400)
  }
 }

 render() {
  const { hasError = false, errorMessage = '' } = this.props

  return (
   hasError &&
   errorMessage && (
    <ErrMsg component="div" marginclear>
     {errorMessage}
    </ErrMsg>
   )
  )
 }
}

export default ServiceError