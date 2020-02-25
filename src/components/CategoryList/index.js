import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListStyle from '../styled/ListStyle'
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

class CategoryList extends Component {

  state = {    
    openBilim: false,
    openSanat: false,
    openSpor: false,
  }

  componentDidMount() { }

  addColor = (event) => {
    event.currentTarget.style.backgroundColor = "#ff9100"

  }
  removeColor = (event) => {
    event.currentTarget.style.backgroundColor = "#fff"
  }

  render() {
    const listStyle = {
      //backgroundColor:"#0007C9",
      paddingBottom: "0px",
      marginBottom: "5px"
      //padding: "20px"
      //borderStyle: "solid",
      //borderColor: "#0007C9",
      //borderRadius: "20%",
    }
    const inlineListStyle = {
      //backgroundColor:"#0007C9",
      paddingBottom: "0px",
      //marginBottom: "5px",
      paddingTop: "0px"
      //padding: "20px"
      //borderStyle: "solid",
      //borderColor: "#0007C9",
      //borderRadius: "20%",
    }
    const listItemStyle = {
      height: "30px"      
    }
    const inlineListItemStyle = {
      height: "30px",
      paddingLeft: "30px" 
    }   
    const dividerStyle = {
      backgroundColor: "#e5e5e5"
    }
    const linkButtonStyle = {
      //marginTop: "10px"
      //marginRight: 10,
      //color: "#fff"
      fontSize: "0.875rem",
      fontFamily: '"Roboto", "Helvetica", "Arial" , "sans-serif"',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: "0.01071em"
    }

    return (
      <Fragment>
        <ListStyle>
          <Typography color="inherit" align="center">KATEGORİLER</Typography>
          <List style={listStyle}>
            <Divider style={dividerStyle} />
            <ListItem
              key="GK"
              button
              //onClick={(event) => this.handleClick("GK")}
              onMouseEnter={(event) => this.addColor(event)}
              onMouseLeave={(event) => this.removeColor(event)}
              style={listItemStyle}
            >
              <ListItemText id="labelIdGK" primary="Genel Kültür" />
            </ListItem>
            
            <Divider style={dividerStyle} />
            
            <ListItem
              key="BLM"
              button
              onClick={() => this.setState({ openBilim: !this.state.openBilim })}
              onMouseEnter={(event) => this.addColor(event)}
              onMouseLeave={(event) => this.removeColor(event)}
              style={listItemStyle}
            >
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText id="labelIdBLM" primary="Bilim" />
              {this.state.openBilim ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openBilim}
              timeout="auto"
              unmountOnExit
              style={{}}
            >
              <List style={inlineListStyle}>
              <Divider style={dividerStyle} />
                <ListItem 
                  key="FZ"
                  button
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={inlineListItemStyle}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary="Fizik" />
                </ListItem>
                <Divider style={dividerStyle} />
                <ListItem
                  key="KM"
                  button
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={inlineListItemStyle}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary="Kimya" />
                </ListItem>
                <Divider style={dividerStyle} />
                <ListItem
                  key="BY"
                  button
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={inlineListItemStyle}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary="Biyoloji" />
                </ListItem>
              </List>              
            </Collapse>

            <Divider style={dividerStyle} />
            
            <ListItem
              key="SNT"
              button
              onClick={() => this.setState({ openSanat: !this.state.openSanat })}
              onMouseEnter={(event) => this.addColor(event)}
              onMouseLeave={(event) => this.removeColor(event)}
              style={listItemStyle}
            >
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText id="labelIdSNT" primary="Sanat" />
              {this.state.openSanat ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openSanat}
              timeout="auto"
              unmountOnExit
              style={{}}
            >
              <List style={inlineListStyle}>
                <Divider style={dividerStyle} />
                <ListItem
                  key="MZ"
                  button                
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={inlineListItemStyle}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary="Müzik" />
                </ListItem>
                <Divider style={dividerStyle} />
                <ListItem
                  key="SN"
                  button                
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={inlineListItemStyle}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary="Sinema" />
                </ListItem>
              </List>                         
            </Collapse>
            
            <Divider style={dividerStyle} />

            <ListItem
              key="SPR"
              button
              onClick={() => this.setState({ openSpor: !this.state.openSpor })}
              onMouseEnter={(event) => this.addColor(event)}
              onMouseLeave={(event) => this.removeColor(event)}
              style={listItemStyle}
            >
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText id="labelIdSPR" primary="Spor" />
              {this.state.openSpor ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openSpor}
              timeout="auto"
              unmountOnExit
              style={{}}
            >
              <List style={inlineListStyle}>
                <Divider style={dividerStyle} />
                <ListItem
                  key="FTB"
                  button                
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={inlineListItemStyle}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary="Futbol" />
                </ListItem>
                <Divider style={dividerStyle} />
                <ListItem
                  key="BAS"
                  button                
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={inlineListItemStyle}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary="Basketbol" />
                </ListItem>
                <Divider style={dividerStyle} />
                <ListItem
                  key="TEN"
                  button                
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={inlineListItemStyle}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary="Tenis" />
                </ListItem>
              </List>                         
            </Collapse>
          </List>

        </ListStyle>
      </Fragment>
    );
  }
}

export default CategoryList
