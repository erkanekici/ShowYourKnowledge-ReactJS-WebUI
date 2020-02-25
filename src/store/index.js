import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as services from '../services'
import global from './global/reducer'
import products from './products/reducer'

const reducers = combineReducers({ global, products })

export default createStore(
 reducers,
 compose(applyMiddleware(thunk.withExtraArgument({ services })))
)