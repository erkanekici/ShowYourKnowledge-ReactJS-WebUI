import styled from 'styled-components'

const Wrapper = styled.div`
  .icon-icons-16-px-calendar{
    :before{
    color: ${props => props.focus ? props.theme.text.blue : props.theme.text.inputGray};
    }

  }
`

export default Wrapper