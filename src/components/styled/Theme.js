import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
 text: {
  main: 'white',
  navBg: '#f4f5f9',
  green: '#84bd00',
  blue: '#0057b8',
  red: '#ff0000',
  black: '#000000',
  navGray: '#d8d8d8',
  inputGray: '#cdd1d9',
  placeHolder: '#bbbfc6',
  darkGray: '#21262c',
  btnBack: '#949aa5',
  border: '#ecedf2',
  disabled: '#f2f2f2'
 },
 // z-index pre-defined values
 stackOrder: {
  lowest: 100,
  lower: 500,
  low: 1000,
  mid: 2500,
  high: 5000,
  higher: 7500,
  highest: 9999
 },

 fonts: {
  proximanovaLight: 300,
  proximanovaRegular: 400,
  proximanovaMedium: 500,
  proximanovaSemibold: 600,
  proximanovaBold: 700
 }
}

const Theme = ({ children }) => (
 <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme