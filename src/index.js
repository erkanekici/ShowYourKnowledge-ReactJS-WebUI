import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'matchmedia-polyfill'
import 'matchmedia-polyfill/matchMedia.addListener'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css'
import * as serviceWorker from './serviceWorker'
import './appConfig'
import Fonts from './components/styled/Fonts'
import GlobalStyle from './components/styled/Global'
import Theme from './components/styled/Theme'
import App from './containers/App'
import store from './store'
import background from './images/login_background.png'
import {Logo} from './components/styled/Layout'

const rootElement = document.getElementById('root')

const mainStyle = {
  backgroundColor: "#ff9100",
  backgroundImage: `url(${background})`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
}

ReactDOM.render(
 <Provider store={store}>
  {/* <Fonts />
  <GlobalStyle /> */}
  <Theme>
   <div style = {mainStyle}>
    <App/>
   </div>
  </Theme>
 </Provider>,
 rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()