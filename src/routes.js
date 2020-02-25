import loadable from '@loadable/component'
import StepFirst from './containers/Step_01'
import PreLoader from './components/UI/Loader'

const loadableOptions = {
 fallback: PreLoader
}

const StepSecond = loadable(() => import('./containers/Step_02'), loadableOptions)
const StepThird = loadable(() => import('./containers/Step_03'), loadableOptions)
const StepFourth = loadable(() => import('./containers/Step_04'), loadableOptions)
const StepFifth = loadable(() => import('./containers/Step_05'), loadableOptions)
const StepSixth = loadable(() => import('./containers/Step_06'), loadableOptions)
const StepSeventh = loadable(() => import('./containers/Step_07'), loadableOptions)
const StepEight = loadable(() => import('./containers/Step_08'), loadableOptions)
const StepNine = loadable(() => import('./containers/Step_09'), loadableOptions) // documents
const StepTen = loadable(() => import('./containers/Step_10'), loadableOptions) // error page
const StepEleven = loadable(() => import('./containers/Step_11'), loadableOptions) // new accepted n11 customer page
const StepThreeteen = loadable(() => import('./containers/Step_13'), loadableOptions) // current rejected n11 customer page

const routes = [
 { path: '/', component: StepFirst, name: 'Step_01', exact: true },
 { path: '/second', component: StepSecond, name: 'Step_02' },
 { path: '/third', component: StepThird, name: 'Step_03' },
 { path: '/fourth', component: StepFourth, name: 'Step_04' },
 { path: '/fifth', component: StepFifth, name: 'Step_05', UI: { basket: true, navigation: false }},
 { path: '/sixth', component: StepSixth, name: 'Step_06', UI: { basket: true, navigation: true }},
 { path: '/seventh', component: StepSeventh, name: 'Step_07', UI: { basket: true, navigation: false }},
 { path: '/eight', component: StepEight, name: 'Step_08', UI: { basket: true, navigation: true }},
 { path: '/nine', component: StepNine, name: 'Step_09', UI: { basket: false, navigation: false, largeLogo: true }},
 { path: '/ten', component: StepTen, name: 'Step_10', UI: { basket: false, navigation: false, largeLogo: true }},
 { path: '/eleven', component: StepEleven, name: 'Step_11', UI: { basket: false, navigation: false, largeLogo: true }},
 { path: '/threeteen', component: StepThreeteen, name: 'Step_13', UI: { basket: false, navigation: false, largeLogo: true }}
]

export default routes

export function routePathByName(name) {
 const route = routes.find(route => route.name === name)
 if (route) {
  return route.path
 }
 return '/'
}