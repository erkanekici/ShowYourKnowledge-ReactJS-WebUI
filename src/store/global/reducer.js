import { toString } from 'lodash-es'
import {
 GLOBAL_REQUEST_START,
 GLOBAL_REQUEST_SUCCESS,
 GLOBAL_REQUEST_ERROR,
 GLOBAL_ERROR_CLEAR,
 SET_GLOBAL_PARAMS
} from '../actionTypes'

const initialState = {
 transactionId: '',
 activation:'',
 banner:'',
 redirect:'',
 basketType:'',
 finalMessage:'',
 applicationNo: '',
 channelCode: '',
 companyCode: '',
 successUrl: '',
 failUrl: '',
 nationalIdentityNo: '',
 mobileNumber: '',
 email:'',
 serialNumber:'',
 flag:'',
 questionTable: [],
 referenceCode: '',
 adkOid: '',
 otp: '',
 basketAmount: '',
 orderId: '',
 otpResult: '',
 approvalStatus: '',
 explanation: '',
 term: '',
 installmentAmount: '',
 totalPaymentAmount: '',
 insuranceAmount: '',
 creditInterest: '',
 commissionAmount: '',
 paymentTotalAmaount: '',
 limit: '',
 expireDate: '',
 isAvailableCustomer: '',
 firstApplication: '',
 expiredTransaction: '',
 postMethod: '',
 paymentPlan: [],
 result: '',
 topic: '',
 gameStatus: '',
 topicId: '',
 hasError: false,
 errorMessage: null
}

export default function(state = initialState, action) {
 switch (action.type) {
  case GLOBAL_REQUEST_START: {
   return {
    ...state,
    hasError: false,
    errorMessage: null
   }
  }
  case SET_GLOBAL_PARAMS:
  case GLOBAL_REQUEST_SUCCESS: {
   return {
    ...state,
    ...action.payload
   }
  }
  case GLOBAL_REQUEST_ERROR: { debugger;
   try {
    const {
     errorMessage
    //  payload: {
    //   result,
    //   expiredTransaction,
    //   approvalStatus,
    //   successUrl,
    //   failUrl
    //  }
    } = JSON.parse(action.error)

    return {
     ...state,
     hasError: true,
     //expiredTransaction,
     errorMessage
     //result: toString(result),
     //approvalStatus,
     //successUrl,
     //failUrl
    }
   } catch (error) { debugger;
    return {
     ...state,
     hasError: true,
     errorMessage: action.error,
     result: ''
    }
   }
  }
  case GLOBAL_ERROR_CLEAR: {
   return {
    ...state,
    hasError: false,
    errorMessage: null
   }
  }
  default:
   return state
 }
}