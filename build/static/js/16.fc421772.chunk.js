(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{799:function(e,a,t){"use strict";var n=t(29),r=t(30),i=t(32),o=t(31),s=t(33),c=t(0),u=t.n(c),p=t(178),l=t(290),v=t(41),d=function(e){function a(){return Object(n.a)(this,a),Object(i.a)(this,Object(o.a)(a).apply(this,arguments))}return Object(s.a)(a,e),Object(r.a)(a,[{key:"componentWillUnmount",value:function(){var e=this.props.clearGlobalError;(void 0===e||e)&&setTimeout(function(){l.a.dispatch({type:v.a})},400)}},{key:"render",value:function(){var e=this.props,a=e.hasError,t=void 0!==a&&a,n=e.errorMessage,r=void 0===n?"":n;return t&&r&&u.a.createElement(p.e,{component:"div",marginclear:!0},r)}}]),a}(c.Component);a.a=d},932:function(e,a,t){"use strict";t.r(a);var n=t(29),r=t(30),i=t(32),o=t(31),s=t(33),c=t(0),u=t.n(c),p=t(126),l=t(781),v=t(80),d=t(799),b=t(228),h=function(e){function a(){var e,t;Object(n.a)(this,a);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(t=Object(i.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(s)))).state={isLoading:!1},t}return Object(s.a)(a,e),Object(r.a)(a,[{key:"componentDidMount",value:function(){}},{key:"addGTM",value:function(){"N11"===this.props.companyCode&&"1"===this.props.banner?window.dataLayer.push({event:"virtualPageview",virtualPageURL:"/vp/fibabanka-alisveris-kredisi/step2olumlu_banner/",userId:this.props.transactionId}):"N11"===this.props.companyCode&&"4"===this.props.basketType?(window.dataLayer.push({event:"virtualPageview",virtualPageURL:"/vp/fibabanka-alisveris-kredisi/step2olumlu_n11oto/",userId:this.props.transactionId}),"1"===this.props.isAvailableCustomer&&window.dataLayer.push({event:"virtualPageview",virtualPageURL:"/vp/fibabanka-alisveris-kredisi/step2red_n11oto/",userId:this.props.transactionId})):window.dataLayer.push({event:"virtualPageview",virtualPageURL:"/vp/fibabanka-alisveris-kredisi/step2olumlu_checkout/",userId:this.props.transactionId})}},{key:"checkBanner",value:function(){if("1"!==this.props.banner)return u.a.createElement(v.c,null)}},{key:"render",value:function(){return u.a.createElement(c.Fragment,null,u.a.createElement(v.c,null),this.checkBanner(),u.a.createElement(d.a,this.props))}}]),a}(c.Component),f={informRedirection:Object(b.a)("InformRedirectionFail")};a.default=Object(p.b)(function(e){return Object(l.a)(e.global,["failUrl","errorMessage","banner","isAvailableCustomer","transactionId","basketType","companyCode"])},f)(h)}}]);
//# sourceMappingURL=16.fc421772.chunk.js.map