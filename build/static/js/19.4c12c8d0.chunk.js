(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{927:function(e,t,n){"use strict";n.r(t);var a=n(20),s=n(796),o=n(29),r=n(30),i=n(32),c=n(31),l=n(33),d=n(0),u=n.n(d),p=n(126),g=(n(228),n(289)),h=n(781),f=n(869),m=n.n(f),v=n(766),b=n(784),M=n(761),w=(n(861),n(836)),j=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(i.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(r)))).STEP_4_PATH=Object(g.b)("Step_04"),n.state={isErrorExist:!1,errorMessageContent:"",connected:!1,msg:"",adres:n.props.topic,messages:[]},n.onConnected=function(e,t){n.setState({connected:!0}),n.sendMessage()},n.onMessageReceive=function(e,t){n.setState({messages:[].concat(Object(s.a)(n.state.messages),[e.msg])})},n.onDisconnected=function(e,t){n.setState({connected:!1})},n.sendMessage=function(){try{var e={msg:n.state.msg,user:"optsid1"};return n.clientRef.sendMessage("/app/chat.sendMessage/"+n.props.topicId,JSON.stringify(e),{login:"optLog",sid:"optsid1"}),!0}catch(t){return console.log("error"),!1}},n.handleChangeTextArea=function(e){var t=e.target.value;n.setState({msg:t})},n}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.props.setStep("startGame"),this.addGTM()}},{key:"addGTM",value:function(){window.dataLayer.push({event:"virtualPageview",virtualPageURL:"/vp/gosterBilgini/startGame/",userId:this.props.transactionId})}},{key:"render",value:function(){var e=this,t={transactionId:this.props.transactionId,topic:this.props.topic};return u.a.createElement(d.Fragment,null,u.a.createElement(M.a,{style:{width:"100%",textAlign:"center"},"aria-label":"minimum height",rows:5,placeholder:"Mesaj\u0131n\u0131z\u0131 giriniz",onChange:this.handleChangeTextArea}),u.a.createElement(b.a,{style:{width:"100%",textAlign:"center"}},this.state.messages),u.a.createElement(v.a,{type:"button",fullWidth:!0,variant:"contained",color:"primary",onClick:this.sendMessage},"Mesaj\u0131 G\xf6nder"),u.a.createElement(m.a,{url:"http://localhost:8091/ws",topics:[this.state.adres],onMessage:this.onMessageReceive,ref:function(t){e.clientRef=t},onConnect:function(){e.onConnected()},onDisconnect:function(){e.onDisconnected()},onConnectFailure:function(e){console.log("Ba\u011flant\u0131 Hatas\u0131"+e)},headers:t}))}}]),t}(d.Component),y={offerProductList:w.a};t.default=Object(p.b)(function(e){return Object(a.a)({},Object(h.a)(e.global,["transactionId","topic","topicId","hasError","errorMessage"]))},y)(j)}}]);
//# sourceMappingURL=19.4c12c8d0.chunk.js.map