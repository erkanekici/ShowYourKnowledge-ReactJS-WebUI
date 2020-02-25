import React, { Component, Fragment } from 'react'
import css from 'dom-css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import ContentWrapper from '../styled/ContentWrapper'
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Logo } from '../styled/Layout'
import banner from '../../images/mainBanner.png'
import ContentStyle from '../styled/ContentStyle'
import Login from '../Login'
import Register from '../Register'
import ScoreList from '../ScoreList'
import CategoryList from '../CategoryList'

class TextContent extends Component {

  renderThumb({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "#0007C9",
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }

  renderView({ style, ...props }) {
    const viewStyle = {
      paddingRight: 15      
    };
    return (
      <div
        className="box"
        style={{ ...style, ...viewStyle }}
        {...props} />
    );
  }

  handleUpdate(values) {    
    //const { shadowTop, shadowBottom } = this.refs;
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    document.getElementById("shadowTop").style.opacity = shadowTopOpacity;
    document.getElementById("shadowBottom").style.opacity = shadowBottomOpacity;
    // css(shadowTop, { opacity: shadowTopOpacity });
    // css(shadowBottom, { opacity: shadowBottomOpacity });
  }

  render() {
    const inlineGridStyle = {
      margin: "20px"
    }
    const shadowTopStyle = {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      height: 10,
      background: 'linear-gradient(to bottom, rgba(0, 7, 201, 0.5) 0%, rgba(0, 0, 0, 0) 100%)'
    };
    const shadowBottomStyle = {
      position: 'sticky',
      //top: "690px",
      bottom: "0px",
      left: 0,
      right: 0,
      height: 10,
      background: 'linear-gradient(to top, rgba(0, 7, 201, 0.5) 0%, rgba(0, 0, 0, 0) 100%)'
    };
    return (
      <Fragment>
        <Grid style={inlineGridStyle}>
          <ContentWrapper
            style={{ 
              width: "500px", 
              maxHeight: "700px", 
              minHeight: "700px", 
              padding: "20px 20px 20px 20px"
            }}
          >

            <Scrollbars
              style={{ height: 700 }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              onUpdate={this.handleUpdate}
              renderView={this.renderView}
              //renderThumbHorizontal={this.renderThumb}
              renderThumbVertical={this.renderThumb}
            >
              <div
                id="shadowTop"
                style={shadowTopStyle}
              />
              {this.props.contentType === "rules" && (
                <Fragment>
                <Typography variant="h5" gutterBottom align="center">
                  Kurallar
                </Typography>
                <Typography variant="h6" gutterBottom align="left">
                  Kural 1
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  1-sizin alem dediğiniz bu bitirim dünyasının bütün rrrrrrraconlarını şu andan itibaren tedavülden kaldırıyorum, ayrıca rrracon kelimesinin telafuz edilmesini bile yasaklıyorum(ama bu kadarıda yetmior bakınız),dalga geçmek için bile olsa bu kelimeyi ağzınıza almayacaksınız.
                </Typography>
                <Typography variant="h6" gutterBottom align="left">
                  Kural 2
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  2-açlıktan nefesiniz koksa dahil benden başka hiçkimseden hiçbir şekil ve ad altında para is-te-miy-cek-siniiiiz.(whoaa)
                </Typography>
                <Typography variant="h6" gutterBottom align="left">
                  Kural 3
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  3-gazozuna tavla oynamak dahil, hiçbir zaman kumar oynamayacaksınız.
                </Typography>
                <Typography variant="h6" gutterBottom align="left">
                  Kural 4
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  4-nefs-i müdafa hariç hiçbir şekilde silah kullanmayacaksınız.
                </Typography>
                <Typography variant="h6" gutterBottom align="left">
                  Kural 5
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  5-uyuşturucu,kadın ticareti, tahsilatçılık, korumacılık(bodyguard??), pompacılık(??), değnekçilik, arabuluculuk, arazi yağması, park ağalığı, ihale tezgahı gibi işlere bulaşmış bütün tanıdıklarınızla şu andan itibaren selaaamı sabaaahı kesiceksiniz!.(allaah)
                </Typography>
                <Typography variant="h6" gutterBottom align="left">
                  Kural 6
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  6-bu alemde polis, asker, bürokrat ve siyasetçi dostunuzda olmayacak...(burda davul giriyor oraya dırıdıım! dramatize edior ortamı) düşmanınızda.....
                </Typography>
                <Typography variant="h6" gutterBottom align="left">
                  Kural 7
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  7- Kuralları ben koyarım
                </Typography>
                </Fragment>
              )}
              {this.props.contentType === "help" && (
                <Typography variant="h5" gutterBottom align="center">
                  Yardım
                </Typography>
              )}
              {this.props.contentType === "contact" && (
                <Typography variant="h5" gutterBottom align="center">
                  İletişim
                </Typography>
              )}              
              <div
                id="shadowBottom"
                style={shadowBottomStyle}
              />
            </Scrollbars>
          </ContentWrapper>
        </Grid>
      </Fragment>
    );
  }
}

export default TextContent
