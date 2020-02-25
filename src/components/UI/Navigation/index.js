import React from 'react'
import Wrapper from './styled'
import WrapperN11Banner from './styledN11Banner'
import routes from '../../../routes'
import { Route } from 'react-router-dom'

const SELECTED_CLASS = 'selected'
const PASSED_CLASS = 'passed'

const Navigation = props => {
 let value = ''
 const isMatched = val => {
  if (value) return ''
  if (val) value = PASSED_CLASS
  return val ? SELECTED_CLASS : PASSED_CLASS
 }

 const checkBanner = routes =>{
  const bannerRoutes = [
   'Step_01','Step_11'
  ]
  const fibaCreditRoutes = [
   'Step_01','Step_02','Step_06','Step_08'
  ]
  if(props.banner === "1"){
   return(
    routes.filter((route) => {
     if(bannerRoutes.indexOf(route.name) !== -1){
      return route;
     }
     else{
      return '';
     }
    })
   )
  }
  else{
   return(
    routes.filter((route) => {
     if(fibaCreditRoutes.indexOf(route.name) !== -1){
      return route;
     }
     else{
      return '';
     }
    })
   )
  }
 }

 if(props.banner === "1"){
  return (
   <WrapperN11Banner>
    <ul>
     {checkBanner(routes).map(route => (
      <li key={route.name}>
       <Route
        path={route.path}
        exact={route.exact}
        children={({ match }) => <span className={isMatched(match)} />}
       />
      </li>
     ))}
    </ul>
   </WrapperN11Banner>
  )
 }
 else{
  return (
   <Wrapper>
    <ul>
     {checkBanner(routes).map(route => (
      <li key={route.name}>
       <Route
        path={route.path}
        exact={route.exact}
        children={({ match }) => <span className={isMatched(match)} />}
       />
      </li>
     ))}
    </ul>
   </Wrapper>
  )
 }
}

export default Navigation