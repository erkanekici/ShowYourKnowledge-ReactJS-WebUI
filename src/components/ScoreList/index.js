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

class ScoreList extends Component {

  state = {
  }

  componentDidMount() { }

  addColor = (event) => {
    event.currentTarget.style.backgroundColor = "#ff9100"

  }
  removeColor = (event) => {
    event.currentTarget.style.backgroundColor = "#fff"

  }

  handleClick = event => {

  };

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
        <Typography color="inherit" align="center">{this.props.title}</Typography>
        <List style={listStyle}>
          <Divider style={dividerStyle} />
          {this.props.list.map((value,index) => {
            const labelId = `label${value.name}`;
            return (
              <Fragment key={value.name+index}> {/* key değişkenini React.Fragment bileşenine vererek unique list yapmalısın */}
                <ListItem
                  key={value.name+index}
                  button
                  onClick={this.handleClick}
                  onMouseEnter={(event) => this.addColor(event)}
                  onMouseLeave={(event) => this.removeColor(event)}
                  style={{height: "30px"}}
                >
                  <ListItemText primary={index+1+"."} style={{flex: "none",marginRight:"10px"}} />
                  <ListItemAvatar style={{ minWidth: "0px", width:"25px", marginRight:"10px"}}>
                    <Avatar
                      alt={`Avatar_${value.avatar}`}
                      src={require("../../images/" + `${value.avatar}` + ".png")}
                      style={{height: "auto", width: "auto"}}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId + "Name"} primary={`${value.name}`} />
                  <ListItemText 
                    id={labelId + "Score"} 
                    primary={
                      <Fragment>
                      <b>{`${value.score}`}</b>
                      {" puan"}
                      </Fragment>
                    } 
                    align="right" 
                  />
                  {/* <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction> */}
                </ListItem>
                <Divider style={dividerStyle} />
              </Fragment>
            );           
          })}
        </List>
        <Link
          style={linkButtonStyle}
          //color="inherit"
          //variant="h6"
          component="button"
          underline="always"
          onClick={() => { }}
        >
          Listenin devamı için tıklayınız.
        </Link>
        </ListStyle>
      </Fragment>
    );
  }
}

export default ScoreList
