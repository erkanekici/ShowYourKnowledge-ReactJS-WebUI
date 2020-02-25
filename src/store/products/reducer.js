import { SET_SELECTED_PRODUCT_CODE, SET_PRODUCT_LIST } from '../actionTypes'

const initialState = {
 selectedProduct: '',
 list: []
}

export default function(state = initialState, action) {
 switch (action.type) {
  case SET_SELECTED_PRODUCT_CODE: {
   return {
    ...state,
    selectedProduct: action.payload
   }
  }
  case SET_PRODUCT_LIST: {
   return {
    ...state,
    list: action.payload
   }
  }
  default:
   return state
 }
}