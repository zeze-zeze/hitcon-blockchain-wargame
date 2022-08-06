"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4232],{54232:function(n,e,i){i.r(e);var t=i(74165),r=i(15861),o=i(70885),l=i(72791),s=i(91614),a=i(57621),d=i(20890),c=i(64554),u=i(95193),h=i(5289),v=i(65661),x=i(39157),g=i(51691),p=i(27391),Z=i(97123),f=i(36151),j=i(61889),m=i(68096),k=i(94925),b=i(65594),C=i(5022),w=i(16871),y=i(6907),S=i(66934),E=i(13967),B=i(89256),P=i(73094),I=i(95631),T=i(74569),z=i.n(T),D=i(80184),R=(0,S.ZP)(s.Z)((function(n){n.theme;return{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}})),W=(0,S.ZP)(a.Z)((function(n){return{padding:n.theme.spacing(10),borderRadius:"64px"}})),A=(0,S.ZP)(d.Z)((function(n){var e=n.theme;return{fontSize:e.typography.pxToRem(50),textAlign:"center",paddingBottom:e.spacing(5)}})),L=(0,S.ZP)(d.Z)((function(n){var e=n.theme;return{fontSize:e.typography.pxToRem(17),textAlign:"center",paddingBottom:e.spacing(4)}})),M=(0,S.ZP)(c.Z)((function(n){n.theme;return{display:"flex",justifyContent:"space-evenly",width:"100%"}}));e.default=function(){var n=(0,l.useState)(!1),e=(0,o.Z)(n,2),i=e[0],s=e[1],a=(0,l.useState)(!1),d=(0,o.Z)(a,2),S=d[0],H=d[1],q=(0,l.useState)(""),F=(0,o.Z)(q,2),U=F[0],_=F[1],G=(0,l.useContext)(B.Z),J=G.lang,Q=G.changeLang,K=G.multiLang,N=(0,E.Z)(),O=(0,u.Z)("(min-width:1100px)"),V=(0,w.s0)(),X=(0,l.useContext)(I.Z),Y=X.setShowBackDrop,$=X.setShowSnackBar,nn=X.setErrorMessage,en=X.setSuccessMessage,tn=(0,l.useCallback)(function(){var n=(0,r.Z)((0,t.Z)().mark((function n(e){var i,o,l,a,d;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:n.t0="production",n.next="development"===n.t0?3:"test"===n.t0?5:"production"===n.t0?7:9;break;case 3:case 5:return i="https://localhost:3001/api",n.abrupt("break",11);case 7:return i="https://localhost:31337/api",n.abrupt("break",11);case 9:return i="https://localhost:3001/api",n.abrupt("break",11);case 11:if(e?H(!1):s(!1),Y(!0),n.prev=13,!e){n.next=19;break}return n.next=17,z().post(i+"/login",{type:"anonymous"},{withCredentials:!0});case 17:n.next=21;break;case 19:return n.next=21,z().post(i+"/login",{type:"token",token:U},{withCredentials:!0});case 21:en(null===K||void 0===K?void 0:K.success.login),$(1),o=0,l=setInterval((function(){60===++o&&(clearInterval(l),nn(null===K||void 0===K?void 0:K.error.serverError),setTimeout((function(){Y(!1),$(2)}),4e3));try{(0,r.Z)((0,t.Z)().mark((function n(){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,z().post(i+"/ping",null,{withCredentials:!0});case 2:!1===n.sent.data.expired&&(clearInterval(l),Y(!1),$(0),V("/home"));case 4:case"end":return n.stop()}}),n)})))()}catch(n){}}),1e3),n.next=32;break;case 27:n.prev=27,n.t1=n.catch(13),n.t1 instanceof T.AxiosError?"ERR_BAD_REQUEST"===n.t1.code?(a=n.t1.response).data.ok||(d=a.data.message,nn("Invalid Token"===d?null===K||void 0===K?void 0:K.error.invalidToken:"Permission denied"===d?null===K||void 0===K?void 0:K.error.loginPermissionDenied:"Invalid login type"===d?null===K||void 0===K?void 0:K.error.invalidLoginType:null===K||void 0===K?void 0:K.error.serverError)):nn(null===K||void 0===K?void 0:K.error.serverError):nn(null===K||void 0===K?void 0:K.error.unexpectedError),$(2),Y(!1);case 32:case"end":return n.stop()}}),n,null,[[13,27]])})));return function(e){return n.apply(this,arguments)}}(),[U,K]);return(0,D.jsxs)(y.B6,{children:[(0,D.jsx)(y.ql,{children:(0,D.jsx)("title",{children:"Hitcon Wargame"})}),(0,D.jsx)(P.Z,{}),(0,D.jsxs)(h.Z,{open:i,onClose:function(){return s(!1)},children:[(0,D.jsx)(v.Z,{id:"dialog-title",children:null===K||void 0===K?void 0:K.landing.dialogs[0].title}),(0,D.jsxs)(x.Z,{children:[(0,D.jsx)(g.Z,{id:"dialog-content",children:null===K||void 0===K?void 0:K.landing.dialogs[0].content}),(0,D.jsx)(c.Z,{children:(0,D.jsx)(p.Z,{required:!0,id:"jwt",placeholder:"eyJhbGci...",value:U,onChange:function(n){return _(n.target.value)},fullWidth:!0,sx:{mt:N.spacing(2)}})})]}),(0,D.jsxs)(Z.Z,{children:[(0,D.jsx)(f.Z,{onClick:function(){return s(!1)},children:null===K||void 0===K?void 0:K.landing.dialogs[0].buttons.cancel}),(0,D.jsx)(f.Z,{onClick:function(){return tn(!1)},children:null===K||void 0===K?void 0:K.landing.dialogs[0].buttons.submit})]})]}),(0,D.jsxs)(h.Z,{open:S,onClose:function(){return H(!1)},children:[(0,D.jsx)(v.Z,{id:"dialog-title",children:null===K||void 0===K?void 0:K.landing.dialogs[1].title}),(0,D.jsx)(x.Z,{children:(0,D.jsx)(g.Z,{id:"dialog-content",children:null===K||void 0===K?void 0:K.landing.dialogs[1].content})}),(0,D.jsxs)(Z.Z,{children:[(0,D.jsx)(f.Z,{onClick:function(){return H(!1)},children:null===K||void 0===K?void 0:K.landing.dialogs[1].buttons.cancel}),(0,D.jsx)(f.Z,{onClick:function(){return tn(!0)},children:null===K||void 0===K?void 0:K.landing.dialogs[1].buttons.submit})]})]}),(0,D.jsx)(R,{sx:{width:O?"50%":"550px"},children:(0,D.jsx)(W,{children:(0,D.jsx)(j.ZP,{spacing:10,container:!0,children:(0,D.jsxs)(j.ZP,{item:!0,mx:"auto",children:[(0,D.jsx)(A,{variant:"h1",children:null===K||void 0===K?void 0:K.landing.title}),(0,D.jsx)(L,{sx:{lineHeight:1.5,pb:4},variant:"h4",color:"text.secondary",fontWeight:"normal",children:null===K||void 0===K?void 0:K.landing.subtitle}),(0,D.jsxs)(m.Z,{fullWidth:!0,children:[(0,D.jsx)(k.Z,{id:"lang-label",children:null===K||void 0===K?void 0:K.landing.lang}),(0,D.jsxs)(b.Z,{labelId:"lang-label",id:"lang-select",value:J,label:"Lang",onChange:function(n){var e=n.target.value;Q(e)},children:[(0,D.jsx)(C.Z,{value:"en-US",children:"English"}),(0,D.jsx)(C.Z,{value:"zh-TW",children:"\u7e41\u9ad4\u4e2d\u6587"})]})]}),(0,D.jsxs)(M,{children:[(0,D.jsx)(f.Z,{variant:"contained",size:"large",onClick:function(){s(!0)},sx:{margin:N.spacing(3)},children:null===K||void 0===K?void 0:K.landing.buttons[0].text}),(0,D.jsx)(f.Z,{color:"error",variant:"contained",size:"large",onClick:function(){H(!0)},sx:{margin:N.spacing(3)},children:null===K||void 0===K?void 0:K.landing.buttons[1].text})]})]})})})})]})}},73094:function(n,e,i){var t=i(72791),r=i(52739),o=i(13239),l=i(55646),s=i(19658),a=i(95631),d=i(80184);e.Z=function(){var n=(0,t.useContext)(a.Z),e=n.showSnackBar,i=n.showBackDrop,c=n.setShowSnackBar,u=n.successMessage,h=n.errorMessage;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(r.Z,{sx:{color:"#fff",zIndex:function(n){return n.zIndex.drawer+1}},open:i,children:(0,d.jsx)(o.Z,{color:"inherit"})}),(0,d.jsx)(l.Z,{open:0!=e,autoHideDuration:6e3,onClose:function(){c(0)},children:(0,d.jsx)(s.Z,{onClose:function(){c(0)},severity:1===e?"success":"error",sx:{width:"100%"},children:1===e?null!==u&&void 0!==u?u:"Success":null!==h&&void 0!==h?h:"Failed"})})]})}}}]);
//# sourceMappingURL=4232.16b0db5b.chunk.js.map