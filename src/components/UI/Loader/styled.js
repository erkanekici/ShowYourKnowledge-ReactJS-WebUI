import styled from 'styled-components'

const Loader = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,0.90);
  z-index: 10001;
  & > div {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 200px !important;
    height: auto !important;
    margin: 0 !important;
  }
`

export default Loader