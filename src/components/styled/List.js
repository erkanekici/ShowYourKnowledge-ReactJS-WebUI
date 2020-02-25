import styled from 'styled-components'

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const ListItem = styled.li`
 opacity: 0.8;
 font-size: 16px;
 line-height: 1.5;
 position: relative;
 padding-left: 20px;
 :before{
   content: "";
   display: block;
   position: absolute;
   left: 0;
   width: 7px;
   height: 7px;
   border: 1px solid ${props => props.theme.text.blue};
   transform: rotate(45deg);
   top: 8px;
 }
`

export {
  List,
  ListItem
}