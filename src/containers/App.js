import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { get } from 'lodash-es'
import routes from '../routes'
import ContentWrapper from '../components/styled/ContentWrapper'
import { SET_GLOBAL_PARAMS } from '../store/actionTypes'
import MainContent from '../components/styled/MainContent'
import { PrmDataProperties } from '../utils/enums'
import gameLogo from '../images/logom.png'
import { Logo } from '../components/styled/Layout'


class App extends Component {
 constructor(props) {
  super(props)

  const params = this.getUrlSearchParams()
  this.props.setParams(params)

  this.state = {
   URLParams: { ...params }
  }

  //sessionStorage kullanım:
  //Sekme kapatılıncaya kadar kullanılabilir. Kapatıldığında silinir.
  //setData(){
  // let obj = { name: Ali, age: 12}
  // sessionStorage.setItem('mySessionKey',JSON.stringify(obj))
  //}
  //getData(){
  // let data = sessionStorage.getItem('mySessionKey')
  // data= JSON.parse(data)
  // console.log(data.name)
  //}

  if (window.location.pathname !== '/' && window.location.pathname !== '/activation'){
   window.location.href = "/";
  }
 }

 getUrlSearchParams = () => {
  //let URLparams = new URLSearchParams(window.location.search)

   function guid() {
    function s4() {
     return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
   }
   
   let paramString = "?transactionId=" + guid();
   //if(URLparams.get("activation") === "1"){
   if (window.location.pathname === '/activation') {   
    paramString = paramString +"&activation=1";
   }   
   const params = new URLSearchParams(paramString)
  
  const paramProps = [
   'transactionId',
   'activation'
  ]
  return paramProps.reduce((acc, prop) => {
   acc[prop] = params.get(prop)
   return acc
  }, {})
 }

 renderRouteChild = ({ routeProps, route }) => { 
  return (
   <Fragment>
     {/*<MainContent> {/*Main Content Style*/}
     {/* <Logo src={gameLogo} /> */}
     {/* <Logo src={gameLogo} large={get(route, 'UI.largeLogo', false)} /> */}
     {/*background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'*/} 
      {/* <ContentWrapper 
        //large={get(route, 'UI.largeLogo', false)}
        //{...this.state.URLParams}
      >*/}
        <route.component
        {...routeProps}
        setStep={(val) => this.setState({ step: val })}
        />
     {/* </ContentWrapper>*/}
     {/*</MainContent>*/}
   </Fragment>
  )
 }

 render() {
  return (
   <Fragment>
    <Router>     
      <Switch>
       {routes.map(route => (
        <Route
         key={route.name}
         path={route.path}
         exact={route.exact}
         children={props =>
          this.renderRouteChild({ routeProps: props, route })
         }
        />
       ))}
       <Redirect from="/*" to="/" />
      </Switch>     
    </Router>
   </Fragment>
  )
 }

}

const mapDispatchToProps = dispatch => {
 return {
  //getPrmData: payload => dispatch(getPrmData(payload)),
  setParams: payload => dispatch({ type: SET_GLOBAL_PARAMS, payload })
 }
}

export default connect(
 null,
 mapDispatchToProps
)(App)