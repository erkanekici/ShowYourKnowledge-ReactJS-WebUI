import axios from 'axios'

export const serviceStep1 = axios.create({
  baseURL: window.APP_CONFIG.ServiceStep1.service_base_url,
  headers: { 'Content-Type': 'application/json', ...window.APP_CONFIG.ServiceStep1.headers } })

export const serviceINSTANTCredit = axios.create({
  baseURL: window.APP_CONFIG.INSTANTCreditService.service_base_url,
  headers: { 'Content-Type': 'application/json', ...window.APP_CONFIG.INSTANTCreditService.headers } })

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + '/serviceCaller',
  headers: { 'Content-Type': 'application/json', } })
