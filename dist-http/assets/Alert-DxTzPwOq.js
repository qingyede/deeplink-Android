import{I as d,aa as t,a9 as u,av as H,H as j,d as M,K as F,N as z,aW as N,ax as O,k as p,ag as W,af as i,P as V,r as K,l as r,a4 as D,a7 as X,aX as Y,ah as Z,az as q,a5 as G,aY as J,aZ as Q,a_ as U,a$ as ee}from"./index-ChhltHVQ.js";const oe=d("alert",`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[t("border",`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),u("closable",[d("alert-body",[t("title",`
 padding-right: 24px;
 `)])]),t("icon",{color:"var(--n-icon-color)"}),d("alert-body",{padding:"var(--n-padding)"},[t("title",{color:"var(--n-title-text-color)"}),t("content",{color:"var(--n-content-text-color)"})]),H({originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.9)"}}),t("icon",`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),t("close",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),u("show-icon",[d("alert-body",{paddingLeft:"calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))"})]),u("right-adjust",[d("alert-body",{paddingRight:"calc(var(--n-close-size) + var(--n-padding) + 2px)"})]),d("alert-body",`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[t("title",`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[j("& +",[t("content",{marginTop:"9px"})])]),t("content",{transition:"color .3s var(--n-bezier)",fontSize:"var(--n-font-size)"})]),t("icon",{transition:"color .3s var(--n-bezier)"})]),re=Object.assign(Object.assign({},z.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:"default"},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),ie=M({name:"Alert",inheritAttrs:!1,props:re,setup(n){const{mergedClsPrefixRef:e,mergedBorderedRef:l,inlineThemeDisabled:g,mergedRtlRef:v}=F(n),h=z("Alert","-alert",oe,N,n,e),C=O("Alert",v,e),b=p(()=>{const{common:{cubicBezierEaseInOut:a},self:o}=h.value,{fontSize:y,borderRadius:_,titleFontWeight:I,lineHeight:R,iconSize:$,iconMargin:m,iconMarginRtl:w,closeIconSize:A,closeBorderRadius:P,closeSize:T,closeMargin:B,closeMarginRtl:k,padding:S}=o,{type:s}=n,{left:L,right:E}=W(m);return{"--n-bezier":a,"--n-color":o[i("color",s)],"--n-close-icon-size":A,"--n-close-border-radius":P,"--n-close-color-hover":o[i("closeColorHover",s)],"--n-close-color-pressed":o[i("closeColorPressed",s)],"--n-close-icon-color":o[i("closeIconColor",s)],"--n-close-icon-color-hover":o[i("closeIconColorHover",s)],"--n-close-icon-color-pressed":o[i("closeIconColorPressed",s)],"--n-icon-color":o[i("iconColor",s)],"--n-border":o[i("border",s)],"--n-title-text-color":o[i("titleTextColor",s)],"--n-content-text-color":o[i("contentTextColor",s)],"--n-line-height":R,"--n-border-radius":_,"--n-font-size":y,"--n-title-font-weight":I,"--n-icon-size":$,"--n-icon-margin":m,"--n-icon-margin-rtl":w,"--n-close-size":T,"--n-close-margin":B,"--n-close-margin-rtl":k,"--n-padding":S,"--n-icon-margin-left":L,"--n-icon-margin-right":E}}),c=g?V("alert",p(()=>n.type[0]),b,n):void 0,f=K(!0),x=()=>{const{onAfterLeave:a,onAfterHide:o}=n;a&&a(),o&&o()};return{rtlEnabled:C,mergedClsPrefix:e,mergedBordered:l,visible:f,handleCloseClick:()=>{var a;Promise.resolve((a=n.onClose)===null||a===void 0?void 0:a.call(n)).then(o=>{o!==!1&&(f.value=!1)})},handleAfterLeave:()=>{x()},mergedTheme:h,cssVars:g?void 0:b,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var n;return(n=this.onRender)===null||n===void 0||n.call(this),r(q,{onAfterLeave:this.handleAfterLeave},{default:()=>{const{mergedClsPrefix:e,$slots:l}=this,g={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:"alert"};return this.visible?r("div",Object.assign({},D(this.$attrs,g)),this.closable&&r(X,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&r("div",{class:`${e}-alert__border`}),this.showIcon&&r("div",{class:`${e}-alert__icon`,"aria-hidden":"true"},Y(l.icon,()=>[r(G,{clsPrefix:e},{default:()=>{switch(this.type){case"success":return r(ee,null);case"info":return r(U,null);case"warning":return r(Q,null);case"error":return r(J,null);default:return null}}})])),r("div",{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},Z(l.header,v=>{const h=v||this.title;return h?r("div",{class:`${e}-alert-body__title`},h):null}),l.default&&r("div",{class:`${e}-alert-body__content`},l))):null}})}});export{ie as _};
