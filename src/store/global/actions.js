import {
 GLOBAL_REQUEST_START,
 GLOBAL_REQUEST_SUCCESS,
 GLOBAL_REQUEST_ERROR
} from '../actionTypes'

export default service => payload => {
 return (dispatch, getState, { services }) => {
  dispatch({
   type: GLOBAL_REQUEST_START
  })

  return services[service](payload)
   .then(res => {
    return dispatch({
     type: GLOBAL_REQUEST_SUCCESS,
     payload: { ...payload, ...res }
    })
   })
   .catch(err => { 
    return dispatch({ type: GLOBAL_REQUEST_ERROR, error: err.message })
   })
 }
}