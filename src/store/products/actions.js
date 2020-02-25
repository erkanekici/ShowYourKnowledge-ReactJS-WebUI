import {
 GLOBAL_REQUEST_START,
 SET_PRODUCT_LIST,
 GLOBAL_REQUEST_ERROR
} from '../actionTypes'

export const getOfferedProductList = payload => {
 return (dispatch, getState, { services }) => {
  dispatch({
   type: GLOBAL_REQUEST_START
  })

  return services['OfferProductList'](payload)
   .then(({ offerProductTable = [] }) => {
    return dispatch({
     type: SET_PRODUCT_LIST,
     payload: offerProductTable
    })
   })
   .catch(err => {
    return dispatch({ type: GLOBAL_REQUEST_ERROR, error: err.message })
   })
 }
}