import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 * {
  box-sizing: border-box;
 }

 body {
  background-color: #f4f5f9;
  font-family: 'calibri';
  font-weight: 400;
  color: #21262c;
  height: 100%;
 }

 #root {
  height: 100%;
 }

 button {
  cursor: pointer;
 }


`

export default GlobalStyle