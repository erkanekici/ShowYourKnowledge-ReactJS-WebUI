import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Logo } from '../styled/Layout'
import gameLogo from '../../images/logom.png'
import FooterStyle from '../styled/FooterStyle'

class Footer extends Component {

  state = {
    openLangList: false,
    anchor: null,
    languageButtonEffect: "black"
  }

  componentDidMount() { }

  render() {
    const link = "http://localhost:3000";
    const dividerStyle = {
      borderStyle: "inset",
      borderWidth: "1px",
      height: "21px",
      marginBottom: 1
    }
    const linkButtonStyle = {
      marginLeft: 10,
      marginRight: 10,
      color: "#fff"
    }
    const gridStyle = {
      marginTop: "10px",
      marginBottom: "10px",
    };
    return (
      <Fragment>
        <FooterStyle>
          <Container maxWidth="lg">
            {/* <Grid container justify="flex-end" style={gridStyle}>
              <Grid item>
               
              </Grid>
            </Grid> */}
            <Toolbar variant="dense">
              <a href={link} style={{ flexGrow: 0, height: "70px", marginRight: "20px" }}>
                <Logo alt="footerLogo" src={gameLogo} />
              </a>
              {<Typography variant="h6" style={{ flexGrow: 1 }}></Typography>}
              <Link
                style={linkButtonStyle}
                href={link}
              >
                Ana Sayfa
              </Link>
              <Divider style={dividerStyle} />
              <Link
                style={linkButtonStyle}
                //color="inherit"
                //variant="h6"
                component="button"
                onClick={() => { }}
              >
                Gizlilik
              </Link>
              <Divider style={dividerStyle} />
              <Link
                style={linkButtonStyle}
                //color="inherit"
                //variant="h6"
                component="button"
                onClick={() => { }}
              >
                Kullanım Koşulları
              </Link>
              <Divider style={dividerStyle} />
              <Link
                style={linkButtonStyle}
                //color="inherit"
                //variant="h6"
                component="button"
                onClick={() => { }}
              >
                Sıkça Sorulan Sorular
              </Link>
              <Divider style={dividerStyle} />
              <Link
                style={linkButtonStyle}
                //color="inherit"
                //variant="h6"
                component="button"
                onClick={() => { }}
              >
                Kişisel Verilerin Korunması
              </Link>
              <Divider style={dividerStyle} />
              <Link
                style={linkButtonStyle}
                //color="inherit"
                //variant="h6"
                component="button"
                onClick={() => {this.props.setContent("contact")}}
              >
                İletişim
              </Link>

            </Toolbar>
            <Divider style={{ backgroundColor: "#fff", }} />
            <Toolbar variant="dense">
              {<Typography variant="h6" style={{ flexGrow: 1 }}></Typography>}
              <Typography variant="body2" style={linkButtonStyle} align="right">
                {'Copyright © '}
                {new Date().getFullYear()}
                {' '}
                <Link color="inherit" href={link}>
                  gosterbilgini.com
                </Link>
                  {' '} tüm hakları saklıdır.
              </Typography>
            </Toolbar>
          </Container>
        </FooterStyle>
      </Fragment>
    );
  }
}

export default Footer
