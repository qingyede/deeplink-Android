var Ot=Object.defineProperty,Mt=Object.defineProperties;var qt=Object.getOwnPropertyDescriptors;var Ee=Object.getOwnPropertySymbols;var Ut=Object.prototype.hasOwnProperty,Vt=Object.prototype.propertyIsEnumerable;var We=(e,t,n)=>t in e?Ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Fe=(e,t)=>{for(var n in t||(t={}))Ut.call(t,n)&&We(e,n,t[n]);if(Ee)for(var n of Ee(t))Vt.call(t,n)&&We(e,n,t[n]);return e},je=(e,t)=>Mt(e,qt(t));var J=(e,t,n)=>new Promise((f,l)=>{var b=c=>{try{o(n.next(c))}catch(p){l(p)}},g=c=>{try{o(n.throw(c))}catch(p){l(p)}},o=c=>c.done?f(c.value):Promise.resolve(c.value).then(b,g);o((n=n.apply(e,t)).next())});import{d as X,r as L,Y as Gt,l as m,Z as Xt,$ as ce,a0 as Kt,a1 as Yt,a2 as Ge,a3 as Jt,k as G,a4 as Zt,F as ue,a5 as Qt,a6 as ea,a7 as ta,a8 as aa,I as s,a9 as h,H as E,aa as F,ab as ra,K as na,N as Xe,ac as oa,ad as me,x as he,n as Ke,ae as sa,M as q,z as ia,af as U,ag as le,P as la,ah as Ie,ai as ge,W as de,aj as da,ak as xe,S as ca,al as ua,am as fa,an as ba,ao as pa,ap as va,y as ma,h as re,u as fe,C as ha,i as Ye,j as Je,D as Ze,o as I,c as N,e as B,t as W,f as H,s as V,b as k,q as $e,E as Qe,w as P,aq as ga,G as xa,B as Se,a as ya,_ as et,g as _a,p as wa}from"./index-ChhltHVQ.js";import{a as tt,D as at}from"./dlc-Doa3S9C-.js";import{N as rt}from"./mynft-BS1DVvKp.js";import{a as Ca}from"./units-C_OuvvnV.js";import{_ as $a}from"./Empty-D7xXSAQi.js";import{_ as Ta}from"./Tooltip-Cnjicuw6.js";import{_ as Sa}from"./Skeleton-dZHpmH9y.js";import{u as Ra,_ as za}from"./BuyDlc.vue_vue_type_script_setup_true_lang-B9obUGTl.js";import{g as ka,a as Da,d as La,u as Ba}from"./decryptKeystore-vcF9PyHc.js";import{u as Ne}from"./Popover-Cjx2o8ka.js";import{u as Pa}from"./get-HvKeKp0F.js";import{c as Aa,b as He,o as Ea}from"./Follower-C8-nufE8.js";import{_ as Wa,a as Fa,b as ja,c as Ia}from"./Grid-2xvDnFFT.js";import{u as Na}from"./index-DcsFeYg2.js";import{u as Ha}from"./useGetDbcAndDlcNumber-JPe6fMnm.js";import{u as Oa}from"./useGetDlcPrice-Cj32P7WO.js";import{N as ye}from"./GradientText-CLZFWYbX.js";import"./maths-Byej6qXm.js";import"./use-locale-Dbc-qWHc.js";import"./use-houdini-Bm8e05Yt.js";import"./Alert-DxTzPwOq.js";import"./wallet-DM2W-3OY.js";import"./Suffix-CiGOD4QE.js";const Ma=He(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[He("&::-webkit-scrollbar",{width:0,height:0})]),qa=X({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=L(null);function t(l){!(l.currentTarget.offsetWidth<l.currentTarget.scrollWidth)||l.deltaY===0||(l.currentTarget.scrollLeft+=l.deltaY+l.deltaX,l.preventDefault())}const n=Gt();return Ma.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:Aa,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...l){var b;(b=e.value)===null||b===void 0||b.scrollTo(...l)}})},render(){return m("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Ua=/\s/;function Va(e){for(var t=e.length;t--&&Ua.test(e.charAt(t)););return t}var Ga=/^\s+/;function Xa(e){return e&&e.slice(0,Va(e)+1).replace(Ga,"")}var Oe=NaN,Ka=/^[-+]0x[0-9a-f]+$/i,Ya=/^0b[01]+$/i,Ja=/^0o[0-7]+$/i,Za=parseInt;function Me(e){if(typeof e=="number")return e;if(Xt(e))return Oe;if(ce(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=ce(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Xa(e);var n=Ya.test(e);return n||Ja.test(e)?Za(e.slice(2),n?2:8):Ka.test(e)?Oe:+e}var _e=function(){return Kt.Date.now()},Qa="Expected a function",er=Math.max,tr=Math.min;function ar(e,t,n){var f,l,b,g,o,c,p=0,v=!1,T=!1,S=!0;if(typeof e!="function")throw new TypeError(Qa);t=Me(t)||0,ce(n)&&(v=!!n.leading,T="maxWait"in n,b=T?er(Me(n.maxWait)||0,t):b,S="trailing"in n?!!n.trailing:S);function C(w){var $=f,Y=l;return f=l=void 0,p=w,g=e.apply(Y,$),g}function i(w){return p=w,o=setTimeout(R,t),v?C(w):g}function d(w){var $=w-c,Y=w-p,ne=t-$;return T?tr(ne,b-Y):ne}function x(w){var $=w-c,Y=w-p;return c===void 0||$>=t||$<0||T&&Y>=b}function R(){var w=_e();if(x(w))return z(w);o=setTimeout(R,d(w))}function z(w){return o=void 0,S&&f?C(w):(f=l=void 0,g)}function j(){o!==void 0&&clearTimeout(o),p=0,f=c=l=o=void 0}function D(){return o===void 0?g:z(_e())}function _(){var w=_e(),$=x(w);if(f=arguments,l=this,c=w,$){if(o===void 0)return i(c);if(T)return clearTimeout(o),o=setTimeout(R,t),C(c)}return o===void 0&&(o=setTimeout(R,t)),g}return _.cancel=j,_.flush=D,_}var rr="Expected a function";function we(e,t,n){var f=!0,l=!0;if(typeof e!="function")throw new TypeError(rr);return ce(n)&&(f="leading"in n?!!n.leading:f,l="trailing"in n?!!n.trailing:l),ar(e,t,{leading:f,maxWait:t,trailing:l})}const nr=X({name:"Add",render(){return m("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},m("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Re=Yt("n-tabs"),nt={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},or=X({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:nt,setup(e){const t=Ge(Re,null);return t||Jt("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return m("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),sr=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},aa(nt,["displayDirective"])),Te=X({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:sr,setup(e){const{mergedClsPrefixRef:t,valueRef:n,typeRef:f,closableRef:l,tabStyleRef:b,addTabStyleRef:g,tabClassRef:o,addTabClassRef:c,tabChangeIdRef:p,onBeforeLeaveRef:v,triggerRef:T,handleAdd:S,activateTab:C,handleClose:i}=Ge(Re);return{trigger:T,mergedClosable:G(()=>{if(e.internalAddable)return!1;const{closable:d}=e;return d===void 0?l.value:d}),style:b,addStyle:g,tabClass:o,addTabClass:c,clsPrefix:t,value:n,type:f,handleClose(d){d.stopPropagation(),!e.disabled&&i(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){S();return}const{name:d}=e,x=++p.id;if(d!==n.value){const{value:R}=v;R?Promise.resolve(R(e.name,n.value)).then(z=>{z&&p.id===x&&C(d)}):C(d)}}}},render(){const{internalAddable:e,clsPrefix:t,name:n,disabled:f,label:l,tab:b,value:g,mergedClosable:o,trigger:c,$slots:{default:p}}=this,v=l!=null?l:b;return m("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?m("div",{class:`${t}-tabs-tab-pad`}):null,m("div",Object.assign({key:n,"data-name":n,"data-disabled":f?!0:void 0},Zt({class:[`${t}-tabs-tab`,g===n&&`${t}-tabs-tab--active`,f&&`${t}-tabs-tab--disabled`,o&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:c==="click"?this.activateTab:void 0,onMouseenter:c==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),m("span",{class:`${t}-tabs-tab__label`},e?m(ue,null,m("div",{class:`${t}-tabs-tab__height-placeholder`}," "),m(Qt,{clsPrefix:t},{default:()=>m(nr,null)})):p?p():typeof v=="object"?v:ea(v!=null?v:n)),o&&this.type==="card"?m(ta,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:f}):null))}}),ir=s("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[h("segment-type",[s("tabs-rail",[E("&.transition-disabled",[s("tabs-capsule",`
 transition: none;
 `)])])]),h("top",[s("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),h("left",[s("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),h("left, right",`
 flex-direction: row;
 `,[s("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),s("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),h("right",`
 flex-direction: row-reverse;
 `,[s("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),s("tabs-bar",`
 left: 0;
 `)]),h("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[s("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),s("tabs-bar",`
 top: 0;
 `)]),s("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[s("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),s("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[s("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[h("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),E("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),h("flex",[s("tabs-nav",`
 width: 100%;
 position: relative;
 `,[s("tabs-wrapper",`
 width: 100%;
 `,[s("tabs-tab",`
 margin-right: 0;
 `)])])]),s("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[F("prefix, suffix",`
 display: flex;
 align-items: center;
 `),F("prefix","padding-right: 16px;"),F("suffix","padding-left: 16px;")]),h("top, bottom",[s("tabs-nav-scroll-wrapper",[E("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),E("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),h("shadow-start",[E("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),h("shadow-end",[E("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])]),h("left, right",[s("tabs-nav-scroll-content",`
 flex-direction: column;
 `),s("tabs-nav-scroll-wrapper",[E("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),E("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),h("shadow-start",[E("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),h("shadow-end",[E("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])]),s("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[s("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[E("&::-webkit-scrollbar",`
 width: 0;
 height: 0;
 `)]),E("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),s("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),s("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),s("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),s("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[h("disabled",{cursor:"not-allowed"}),F("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),F("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),s("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[E("&.transition-disabled",`
 transition: none;
 `),h("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),s("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),s("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[E("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),E("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),E("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),E("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),E("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),s("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),h("line-type, bar-type",[s("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[E("&:hover",{color:"var(--n-tab-text-color-hover)"}),h("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),h("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),s("tabs-nav",[h("line-type",[h("top",[F("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),s("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),s("tabs-bar",`
 bottom: -1px;
 `)]),h("left",[F("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),s("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),s("tabs-bar",`
 right: -1px;
 `)]),h("right",[F("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),s("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),s("tabs-bar",`
 left: -1px;
 `)]),h("bottom",[F("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),s("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),s("tabs-bar",`
 top: -1px;
 `)]),F("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),s("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),s("tabs-bar",`
 border-radius: 0;
 `)]),h("card-type",[F("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),s("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),s("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),s("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[h("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[F("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ra("disabled",[E("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),h("closable","padding-right: 8px;"),h("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),h("disabled","color: var(--n-tab-text-color-disabled);")])]),h("left, right",`
 flex-direction: column; 
 `,[F("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),s("tabs-wrapper",`
 flex-direction: column;
 `),s("tabs-tab-wrapper",`
 flex-direction: column;
 `,[s("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),h("top",[h("card-type",[s("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),F("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),s("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[h("active",`
 border-bottom: 1px solid #0000;
 `)]),s("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),s("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),h("left",[h("card-type",[s("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),F("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),s("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[h("active",`
 border-right: 1px solid #0000;
 `)]),s("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),s("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),h("right",[h("card-type",[s("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),F("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),s("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[h("active",`
 border-left: 1px solid #0000;
 `)]),s("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),s("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),h("bottom",[h("card-type",[s("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),F("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),s("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[h("active",`
 border-top: 1px solid #0000;
 `)]),s("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),s("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),lr=Object.assign(Object.assign({},Xe.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),dr=X({name:"Tabs",props:lr,setup(e,{slots:t}){var n,f,l,b;const{mergedClsPrefixRef:g,inlineThemeDisabled:o}=na(e),c=Xe("Tabs","-tabs",ir,oa,e,g),p=L(null),v=L(null),T=L(null),S=L(null),C=L(null),i=L(null),d=L(!0),x=L(!0),R=Ne(e,["labelSize","size"]),z=Ne(e,["activeName","value"]),j=L((f=(n=z.value)!==null&&n!==void 0?n:e.defaultValue)!==null&&f!==void 0?f:t.default?(b=(l=me(t.default())[0])===null||l===void 0?void 0:l.props)===null||b===void 0?void 0:b.name:null),D=Pa(z,j),_={id:0},w=G(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});he(D,()=>{_.id=0,oe(),ke()});function $(){var a;const{value:r}=D;return r===null?null:(a=p.value)===null||a===void 0?void 0:a.querySelector(`[data-name="${r}"]`)}function Y(a){if(e.type==="card")return;const{value:r}=v;if(!r)return;const u=r.style.opacity==="0";if(a){const y=`${g.value}-tabs-bar--disabled`,{barWidth:A,placement:O}=e;if(a.dataset.disabled==="true"?r.classList.add(y):r.classList.remove(y),["top","bottom"].includes(O)){if(ze(["top","maxHeight","height"]),typeof A=="number"&&a.offsetWidth>=A){const M=Math.floor((a.offsetWidth-A)/2)+a.offsetLeft;r.style.left=`${M}px`,r.style.maxWidth=`${A}px`}else r.style.left=`${a.offsetLeft}px`,r.style.maxWidth=`${a.offsetWidth}px`;r.style.width="8192px",u&&(r.style.transition="none"),r.offsetWidth,u&&(r.style.transition="",r.style.opacity="1")}else{if(ze(["left","maxWidth","width"]),typeof A=="number"&&a.offsetHeight>=A){const M=Math.floor((a.offsetHeight-A)/2)+a.offsetTop;r.style.top=`${M}px`,r.style.maxHeight=`${A}px`}else r.style.top=`${a.offsetTop}px`,r.style.maxHeight=`${a.offsetHeight}px`;r.style.height="8192px",u&&(r.style.transition="none"),r.offsetHeight,u&&(r.style.transition="",r.style.opacity="1")}}}function ne(){if(e.type==="card")return;const{value:a}=v;a&&(a.style.opacity="0")}function ze(a){const{value:r}=v;if(r)for(const u of a)r.style[u]=""}function oe(){if(e.type==="card")return;const a=$();a?Y(a):ne()}function ke(){var a;const r=(a=C.value)===null||a===void 0?void 0:a.$el;if(!r)return;const u=$();if(!u)return;const{scrollLeft:y,offsetWidth:A}=r,{offsetLeft:O,offsetWidth:M}=u;y>O?r.scrollTo({top:0,left:O,behavior:"smooth"}):O+M>y+A&&r.scrollTo({top:0,left:O+M-A,behavior:"smooth"})}const se=L(null);let be=0,K=null;function ot(a){const r=se.value;if(r){be=a.getBoundingClientRect().height;const u=`${be}px`,y=()=>{r.style.height=u,r.style.maxHeight=u};K?(y(),K(),K=null):K=y}}function st(a){const r=se.value;if(r){const u=a.getBoundingClientRect().height,y=()=>{document.body.offsetHeight,r.style.maxHeight=`${u}px`,r.style.height=`${Math.max(be,u)}px`};K?(K(),K=null,y()):K=y}}function it(){const a=se.value;if(a){a.style.maxHeight="",a.style.height="";const{paneWrapperStyle:r}=e;if(typeof r=="string")a.style.cssText=r;else if(r){const{maxHeight:u,height:y}=r;u!==void 0&&(a.style.maxHeight=u),y!==void 0&&(a.style.height=y)}}}const De={value:[]},Le=L("next");function lt(a){const r=D.value;let u="next";for(const y of De.value){if(y===r)break;if(y===a){u="prev";break}}Le.value=u,dt(a)}function dt(a){const{onActiveNameChange:r,onUpdateValue:u,"onUpdate:value":y}=e;r&&de(r,a),u&&de(u,a),y&&de(y,a),j.value=a}function ct(a){const{onClose:r}=e;r&&de(r,a)}function Be(){const{value:a}=v;if(!a)return;const r="transition-disabled";a.classList.add(r),oe(),a.classList.remove(r)}const Z=L(null);function pe({transitionDisabled:a}){const r=p.value;if(!r)return;a&&r.classList.add("transition-disabled");const u=$();u&&Z.value&&(Z.value.style.width=`${u.offsetWidth}px`,Z.value.style.height=`${u.offsetHeight}px`,Z.value.style.transform=`translateX(${u.offsetLeft-da(getComputedStyle(r).paddingLeft)}px)`,a&&Z.value.offsetWidth),a&&r.classList.remove("transition-disabled")}he([D],()=>{e.type==="segment"&&xe(()=>{pe({transitionDisabled:!1})})}),Ke(()=>{e.type==="segment"&&pe({transitionDisabled:!0})});let Pe=0;function ut(a){var r;if(a.contentRect.width===0&&a.contentRect.height===0||Pe===a.contentRect.width)return;Pe=a.contentRect.width;const{type:u}=e;if((u==="line"||u==="bar")&&Be(),u!=="segment"){const{placement:y}=e;ve((y==="top"||y==="bottom"?(r=C.value)===null||r===void 0?void 0:r.$el:i.value)||null)}}const ft=we(ut,64);he([()=>e.justifyContent,()=>e.size],()=>{xe(()=>{const{type:a}=e;(a==="line"||a==="bar")&&Be()})});const Q=L(!1);function bt(a){var r;const{target:u,contentRect:{width:y,height:A}}=a,O=u.parentElement.parentElement.offsetWidth,M=u.parentElement.parentElement.offsetHeight,{placement:te}=e;if(!Q.value)te==="top"||te==="bottom"?O<y&&(Q.value=!0):M<A&&(Q.value=!0);else{const{value:ae}=S;if(!ae)return;te==="top"||te==="bottom"?O-y>ae.$el.offsetWidth&&(Q.value=!1):M-A>ae.$el.offsetHeight&&(Q.value=!1)}ve(((r=C.value)===null||r===void 0?void 0:r.$el)||null)}const pt=we(bt,64);function vt(){const{onAdd:a}=e;a&&a(),xe(()=>{const r=$(),{value:u}=C;!r||!u||u.scrollTo({left:r.offsetLeft,top:0,behavior:"smooth"})})}function ve(a){if(!a)return;const{placement:r}=e;if(r==="top"||r==="bottom"){const{scrollLeft:u,scrollWidth:y,offsetWidth:A}=a;d.value=u<=0,x.value=u+A>=y}else{const{scrollTop:u,scrollHeight:y,offsetHeight:A}=a;d.value=u<=0,x.value=u+A>=y}}const mt=we(a=>{ve(a.target)},64);sa(Re,{triggerRef:q(e,"trigger"),tabStyleRef:q(e,"tabStyle"),tabClassRef:q(e,"tabClass"),addTabStyleRef:q(e,"addTabStyle"),addTabClassRef:q(e,"addTabClass"),paneClassRef:q(e,"paneClass"),paneStyleRef:q(e,"paneStyle"),mergedClsPrefixRef:g,typeRef:q(e,"type"),closableRef:q(e,"closable"),valueRef:D,tabChangeIdRef:_,onBeforeLeaveRef:q(e,"onBeforeLeave"),activateTab:lt,handleClose:ct,handleAdd:vt}),Ea(()=>{oe(),ke()}),ia(()=>{const{value:a}=T;if(!a)return;const{value:r}=g,u=`${r}-tabs-nav-scroll-wrapper--shadow-start`,y=`${r}-tabs-nav-scroll-wrapper--shadow-end`;d.value?a.classList.remove(u):a.classList.add(u),x.value?a.classList.remove(y):a.classList.add(y)});const ht={syncBarPosition:()=>{oe()}},gt=()=>{pe({transitionDisabled:!0})},Ae=G(()=>{const{value:a}=R,{type:r}=e,u={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[r],y=`${a}${u}`,{self:{barColor:A,closeIconColor:O,closeIconColorHover:M,closeIconColorPressed:te,tabColor:ae,tabBorderColor:xt,paneTextColor:yt,tabFontWeight:_t,tabBorderRadius:wt,tabFontWeightActive:Ct,colorSegment:$t,fontWeightStrong:Tt,tabColorSegment:St,closeSize:Rt,closeIconSize:zt,closeColorHover:kt,closeColorPressed:Dt,closeBorderRadius:Lt,[U("panePadding",a)]:ie,[U("tabPadding",y)]:Bt,[U("tabPaddingVertical",y)]:Pt,[U("tabGap",y)]:At,[U("tabGap",`${y}Vertical`)]:Et,[U("tabTextColor",r)]:Wt,[U("tabTextColorActive",r)]:Ft,[U("tabTextColorHover",r)]:jt,[U("tabTextColorDisabled",r)]:It,[U("tabFontSize",a)]:Nt},common:{cubicBezierEaseInOut:Ht}}=c.value;return{"--n-bezier":Ht,"--n-color-segment":$t,"--n-bar-color":A,"--n-tab-font-size":Nt,"--n-tab-text-color":Wt,"--n-tab-text-color-active":Ft,"--n-tab-text-color-disabled":It,"--n-tab-text-color-hover":jt,"--n-pane-text-color":yt,"--n-tab-border-color":xt,"--n-tab-border-radius":wt,"--n-close-size":Rt,"--n-close-icon-size":zt,"--n-close-color-hover":kt,"--n-close-color-pressed":Dt,"--n-close-border-radius":Lt,"--n-close-icon-color":O,"--n-close-icon-color-hover":M,"--n-close-icon-color-pressed":te,"--n-tab-color":ae,"--n-tab-font-weight":_t,"--n-tab-font-weight-active":Ct,"--n-tab-padding":Bt,"--n-tab-padding-vertical":Pt,"--n-tab-gap":At,"--n-tab-gap-vertical":Et,"--n-pane-padding-left":le(ie,"left"),"--n-pane-padding-right":le(ie,"right"),"--n-pane-padding-top":le(ie,"top"),"--n-pane-padding-bottom":le(ie,"bottom"),"--n-font-weight-strong":Tt,"--n-tab-color-segment":St}}),ee=o?la("tabs",G(()=>`${R.value[0]}${e.type[0]}`),Ae,e):void 0;return Object.assign({mergedClsPrefix:g,mergedValue:D,renderedNames:new Set,segmentCapsuleElRef:Z,tabsPaneWrapperRef:se,tabsElRef:p,barElRef:v,addTabInstRef:S,xScrollInstRef:C,scrollWrapperElRef:T,addTabFixed:Q,tabWrapperStyle:w,handleNavResize:ft,mergedSize:R,handleScroll:mt,handleTabsResize:pt,cssVars:o?void 0:Ae,themeClass:ee==null?void 0:ee.themeClass,animationDirection:Le,renderNameListRef:De,yScrollElRef:i,handleSegmentResize:gt,onAnimationBeforeLeave:ot,onAnimationEnter:st,onAnimationAfterEnter:it,onRender:ee==null?void 0:ee.onRender},ht)},render(){const{mergedClsPrefix:e,type:t,placement:n,addTabFixed:f,addable:l,mergedSize:b,renderNameListRef:g,onRender:o,paneWrapperClass:c,paneWrapperStyle:p,$slots:{default:v,prefix:T,suffix:S}}=this;o==null||o();const C=v?me(v()).filter(_=>_.type.__TAB_PANE__===!0):[],i=v?me(v()).filter(_=>_.type.__TAB__===!0):[],d=!i.length,x=t==="card",R=t==="segment",z=!x&&!R&&this.justifyContent;g.value=[];const j=()=>{const _=m("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},z?null:m("div",{class:`${e}-tabs-scroll-padding`,style:n==="top"||n==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),d?C.map((w,$)=>(g.value.push(w.props.name),Ce(m(Te,Object.assign({},w.props,{internalCreatedByPane:!0,internalLeftPadded:$!==0&&(!z||z==="center"||z==="start"||z==="end")}),w.children?{default:w.children.tab}:void 0)))):i.map((w,$)=>(g.value.push(w.props.name),Ce($!==0&&!z?Ve(w):w))),!f&&l&&x?Ue(l,(d?C.length:i.length)!==0):null,z?null:m("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return m("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},x&&l?m(ge,{onResize:this.handleTabsResize},{default:()=>_}):_,x?m("div",{class:`${e}-tabs-pad`}):null,x?null:m("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},D=R?"top":n;return m("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${b}-size`,z&&`${e}-tabs--flex`,`${e}-tabs--${D}`],style:this.cssVars},m("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${D}`,`${e}-tabs-nav`]},Ie(T,_=>_&&m("div",{class:`${e}-tabs-nav__prefix`},_)),R?m(ge,{onResize:this.handleSegmentResize},{default:()=>m("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},m("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},m("div",{class:`${e}-tabs-wrapper`},m("div",{class:`${e}-tabs-tab`}))),d?C.map((_,w)=>(g.value.push(_.props.name),m(Te,Object.assign({},_.props,{internalCreatedByPane:!0,internalLeftPadded:w!==0}),_.children?{default:_.children.tab}:void 0))):i.map((_,w)=>(g.value.push(_.props.name),w===0?_:Ve(_))))}):m(ge,{onResize:this.handleNavResize},{default:()=>m("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(D)?m(qa,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:j}):m("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},j()))}),f&&l&&x?Ue(l,!0):null,Ie(S,_=>_&&m("div",{class:`${e}-tabs-nav__suffix`},_))),d&&(this.animated&&(D==="top"||D==="bottom")?m("div",{ref:"tabsPaneWrapperRef",style:p,class:[`${e}-tabs-pane-wrapper`,c]},qe(C,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):qe(C,this.mergedValue,this.renderedNames)))}});function qe(e,t,n,f,l,b,g){const o=[];return e.forEach(c=>{const{name:p,displayDirective:v,"display-directive":T}=c.props,S=i=>v===i||T===i,C=t===p;if(c.key!==void 0&&(c.key=p),C||S("show")||S("show:lazy")&&n.has(p)){n.has(p)||n.add(p);const i=!S("if");o.push(i?ca(c,[[ua,C]]):c)}}),g?m(fa,{name:`${g}-transition`,onBeforeLeave:f,onEnter:l,onAfterEnter:b},{default:()=>o}):o}function Ue(e,t){return m(Te,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Ve(e){const t=ba(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Ce(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const cr=e=>pa({method:"get",url:`${va}/api/v2/addresses/${e}/token-transfers?type=`}),ur=ma("transfer",()=>{const e=re(),{t}=fe(),n=L([]),f=L(!1),l=L(!1);return{displayTransferList:G(()=>f.value?n.value:n.value.slice(0,6)),getTransferList:()=>J(void 0,null,function*(){var p;l.value=!0;const c=yield cr(e.address);if(console.log(c,"res"),l.value=!1,c.status===200){const v=e.address.toLowerCase(),T=c.data.items||[];n.value=T.map(S=>{var x,R,z,j,D,_;const C=((z=(R=(x=S.from)==null?void 0:x.hash)==null?void 0:R.toLowerCase)==null?void 0:z.call(R))||"",i=((_=(D=(j=S.to)==null?void 0:j.hash)==null?void 0:D.toLowerCase)==null?void 0:_.call(D))||"";let d="other";return C===v?d="out":i===v&&(d="in"),je(Fe({},S),{direction:d})}),f.value=!1}else(p=window.$message)==null||p.error(c.statusText||"获取交易历史记录失败")}),getTransferListAll:()=>{var c;(c=window.$message)==null||c.success(t("transaction.allLoaded")),f.value=!0},isAllLoaded:f,loading:l}});function fr(e,t=6,n=4,f="..."){if(!e||typeof e!="string")return"";if(e.length<=t+n)return e;const l=e.slice(0,t),b=e.slice(-n);return`${l}${f}${b}`}const br={class:"w-full"},pr={class:"flex justify-between"},vr={class:"text-[#262626] font-bold text-base dark:text-[#fff]"},mr={class:"mt-5 px-1"},hr={class:"flex flex-col gap-2 flex-1"},gr={key:2,class:"flex flex-col gap-4"},xr=["onClick"],yr=["src"],_r={class:"flex flex-col gap-1 justify-center"},wr={class:"text-base font-bold"},Cr={class:"text-xs text-[#7E7E7E]"},$r={class:"font-bold"},Tr={key:0},Sr=X({__name:"HistoryTable",setup(e){const t=ur();ha(()=>J(this,null,function*(){t.getTransferList()}),6e5,{immediateCallback:!0});const n=G(()=>b.query.coin==="DBC"?tt:b.query.coin==="DLC"?at:rt),f=G(()=>{const o=t.displayTransferList;if(!o||o.length===0)return[];const c=b.query.coin;return c==="DBC"?o.filter(p=>{var v;return((v=p.token)==null?void 0:v.symbol)==="DBC"}):c==="DLC"?o.filter(p=>{var v;return((v=p.token)==null?void 0:v.symbol)==="DLC"}):o.filter(p=>{var v;return((v=p.token)==null?void 0:v.symbol)==="DLCCNFT"})}),l=Ye(),b=Je(),g=o=>{l.push({name:"TransferHistoryDetail",query:{data:JSON.stringify(o),coin:b.query.coin}})};return(o,c)=>{const p=Ze("Icon"),v=Sa,T=$a,S=Se,C=Ta;return I(),N("div",br,[B("div",pr,[B("span",vr,W(o.$t("transaction.history")),1),B("span",{onClick:c[0]||(c[0]=i=>H(t).getTransferListAll()),class:"text-[#6b6a6a] dark:text-[#fff] font-semibold hover:text-primary-500 transition text-sm flex items-center gap-0.5"},[V(W(o.$t("transaction.viewAll"))+" ",1),k(p,{class:"text-2xl",icon:"mdi:arrow-right-thin"})])]),B("div",mr,[H(t).loading?(I(),N(ue,{key:0},$e(6,i=>B("div",{key:i,class:"flex items-center justify-between gap-3 mb-5"},[k(v,{width:48,height:48,circle:""}),B("div",hr,[k(v,{text:"",width:80}),k(v,{text:"",width:160})]),k(v,{text:"",width:80})])),64)):!H(t).loading&&f.value.length===0?(I(),Qe(T,{key:1,description:o.$t("transaction.empty"),class:"my-10"},null,8,["description"])):(I(),N("ul",gr,[(I(!0),N(ue,null,$e(f.value,i=>{var d,x,R,z;return I(),N("li",{onClick:j=>g(i),key:i.tx_hash,class:"flex justify-between items-center gap-3 hover:bg-[#EFF1F0] px-1 py-2 rounded-md transition"},[B("img",{class:"max-w-[48px] max-h-[48px]",src:n.value,alt:""},null,8,yr),B("div",_r,[B("span",wr,W(i.direction==="in"?o.$t("transaction.receive"):o.$t("transaction.send")),1),B("span",Cr,[B("span",$r,W(i.direction==="in"?"From":"To"),1),V(": "),k(C,{width:240,trigger:"hover"},{trigger:P(()=>[k(S,{class:"text-[#7E7E7E] text-xs",text:""},{default:P(()=>[V(W(H(fr)(i.direction==="in"?i.from.hash:i.to.hash)),1)]),_:2},1024)]),default:P(()=>[V(" "+W(i.direction==="in"?i.from.hash:i.to.hash),1)]),_:2},1024)])]),B("div",{class:ga(["flex-1 flex justify-end text-base font-semibold",i.direction==="in"?"text-success-500":"text-error-500"])},[V(W(i.direction==="in"?"+":"-"),1),((d=i.token)==null?void 0:d.symbol)!=="DLCCNFT"?(I(),N("span",Tr,W((x=i.total)!=null&&x.value?Number(H(Ca)(i.total.value)).toFixed(5):"0.0"),1)):xa("",!0),V(" "+W(((R=i.token)==null?void 0:R.symbol)==="DLCCNFT"?"NFT":(z=i.token)==null?void 0:z.symbol),1)],2)],8,xr)}),128))]))])])}}}),Rr=X({__name:"transferDialogDlcAndDbc",setup(e,{expose:t}){const{t:n}=fe(),f=re(),l=L("DLC"),b=L(null),g=L(null),o=ya({DLC:{address:"",amount:"",password:""},DBC:{address:"",amount:"",password:""}}),c=L(0),p=L(0);Ke(()=>J(this,null,function*(){f.address&&(c.value=yield ka(f.address),p.value=yield Da(f.address))}));const v={DLC:{address:[{required:!0,message:n("home.enterTargetAddress"),trigger:["blur","input"]}],amount:[{required:!0,message:n("home.enterTransferAmount"),trigger:["blur","input"]},{validator:(i,d)=>{const x=parseFloat(d);return isNaN(x)?new Error(n("home.invalidNumber")):x<=0?new Error(n("home.amountMustBePositive")):x>c.value?new Error(`${n("home.exceedBalance")} ${c.value}`):!0},trigger:["blur","input"]}],password:[{required:!0,message:n("home.enterPassword"),trigger:["blur","input"]}]},DBC:{address:[{required:!0,message:n("home.enterTargetAddress"),trigger:["blur","input"]}],amount:[{required:!0,message:n("home.enterTransferAmount"),trigger:["blur","input"]},{validator:(i,d)=>{const x=parseFloat(d);return isNaN(x)?new Error(n("home.invalidNumber")):x<=0?new Error(n("home.amountMustBePositive")):x>p.value?new Error(`${n("home.exceedBalance")} ${p.value}`):!0},trigger:["blur","input"]}],password:[{required:!0,message:n("home.enterPassword"),trigger:["blur","input"]}]}},T=i=>{i==="DLC"?o.DLC.amount=c.value.toString():o.DBC.amount=p.value.toString()},S=G(()=>l.value==="DLC"?b.value:g.value);return t({activeTab:l,model:o,validateForm:()=>J(this,null,function*(){return S.value?yield S.value.validate():Promise.reject(new Error("表单未挂载"))})}),(i,d)=>{const x=Wa,R=Fa,z=Se,j=ja,D=Ia,_=or,w=dr;return I(),Qe(w,{type:"segment",animated:"",value:l.value,"onUpdate:value":d[8]||(d[8]=$=>l.value=$)},{default:P(()=>[k(_,{name:"DLC",tab:"DLC"},{default:P(()=>[k(D,{ref_key:"dlcFormRef",ref:b,model:o.DLC,rules:v.DLC,"label-placement":"top"},{default:P(()=>[k(j,{cols:24,"y-gap":8},{default:P(()=>[k(R,{span:24,label:i.$t("home.targetAddress"),path:"address"},{default:P(()=>[k(x,{value:o.DLC.address,"onUpdate:value":d[0]||(d[0]=$=>o.DLC.address=$),placeholder:i.$t("home.enterTargetAddress"),class:"min-h-[44px] rounded-lg"},null,8,["value","placeholder"])]),_:1},8,["label"]),k(R,{span:24,label:i.$t("home.amount"),path:"amount"},{default:P(()=>[k(x,{value:o.DLC.amount,"onUpdate:value":d[2]||(d[2]=$=>o.DLC.amount=$),placeholder:i.$t("home.enterTransferAmount"),class:"min-h-[44px] rounded-lg"},{suffix:P(()=>[k(z,{text:"",type:"primary",class:"text-xs font-medium",onClick:d[1]||(d[1]=$=>T("DLC"))},{default:P(()=>[V(W(i.$t("home.max")),1)]),_:1})]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),k(R,{span:24,label:i.$t("home.password"),path:"password"},{default:P(()=>[k(x,{type:"password","show-password-on":"click",value:o.DLC.password,"onUpdate:value":d[3]||(d[3]=$=>o.DLC.password=$),placeholder:i.$t("home.enterPassword"),class:"min-h-[44px] rounded-lg"},null,8,["value","placeholder"])]),_:1},8,["label"])]),_:1})]),_:1},8,["model","rules"])]),_:1}),k(_,{name:"DBC",tab:"DBC"},{default:P(()=>[k(D,{ref_key:"dbcFormRef",ref:g,model:o.DBC,rules:v.DBC,"label-placement":"top"},{default:P(()=>[k(j,{cols:24,"y-gap":8},{default:P(()=>[k(R,{span:24,label:i.$t("home.targetAddress"),path:"address"},{default:P(()=>[k(x,{value:o.DBC.address,"onUpdate:value":d[4]||(d[4]=$=>o.DBC.address=$),placeholder:i.$t("home.enterTargetAddress"),class:"min-h-[44px] rounded-lg"},null,8,["value","placeholder"])]),_:1},8,["label"]),k(R,{span:24,label:i.$t("home.amount"),path:"amount"},{default:P(()=>[k(x,{value:o.DBC.amount,"onUpdate:value":d[6]||(d[6]=$=>o.DBC.amount=$),placeholder:i.$t("home.enterTransferAmount"),class:"min-h-[44px] rounded-lg"},{suffix:P(()=>[k(z,{text:"",type:"primary",class:"text-xs font-medium",onClick:d[5]||(d[5]=$=>T("DBC"))},{default:P(()=>[V(W(i.$t("home.max")),1)]),_:1})]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),k(R,{span:24,label:i.$t("home.password"),path:"password"},{default:P(()=>[k(x,{type:"password","show-password-on":"click",value:o.DBC.password,"onUpdate:value":d[7]||(d[7]=$=>o.DBC.password=$),placeholder:i.$t("home.enterPassword"),class:"min-h-[44px] rounded-lg"},null,8,["value","placeholder"])]),_:1},8,["label"])]),_:1})]),_:1},8,["model","rules"])]),_:1})]),_:1},8,["value"])}}}),zr=et(Rr,[["__scopeId","data-v-b46bb17b"]]),kr={class:"flex flex-col items-start gap-4 p-2"},Dr={class:"text-sm text-gray-500 dark:text-gray-300"},Lr={class:"text-base break-all font-mono"},Br=X({__name:"receive",setup(e){const{t,locale:n}=fe(),f=re(),{copy:l}=_a(),b=()=>J(this,null,function*(){var g;yield l(f.address),(g=window.$message)==null||g.success(t("transaction.copySuccess"))});return(g,o)=>{const c=Se;return I(),N("div",kr,[B("div",Dr,W(g.$t("transaction.myAddress"))+"：",1),B("div",Lr,W(H(f).address),1),k(c,{type:"primary",size:"small",onClick:b},{default:P(()=>[V(W(g.$t("transaction.copyAddress")),1)]),_:1})])}}}),Pr=et(Br,[["__scopeId","data-v-e15b6c5c"]]),Ar={class:"px-4 w-full mx-auto flex flex-col items-center justify-center"},Er={class:"flex flex-col gap-3 justify-center items-center"},Wr=["src"],Fr={class:"text-center flex flex-col gap-1"},jr={class:"text-lg font-bold"},Ir={class:"text-[14px] font-bold flex gap-1.5"},Nr={key:0},Hr={class:"text-[#7E7E7E]"},Or={key:1,class:"text-success-500 w-full text-center"},Mr={class:"w-full flex items-center justify-center gap-9 mt-2"},qr=["onClick"],Ur={class:"w-[64px] h-[64px] rounded-full bg-[#2F2F2F] flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-[#3a3a3a] active:scale-90 group-hover:shadow-md"},Vr={class:"text-sm font-semibold"},Gr={class:"mt-8 w-full"},xn=X({__name:"index",setup(e){const{t,locale:n}=fe();wa();const{transfer:f}=Ba(),l=Ye(),b=Je();re();const g=Na();Ra();const{dbcNumber:o,dlcNumber:c}=Ha();Oa();const p=L([{title:t("transaction.receive"),icon:"mdi:arrow-down",h:()=>{var T;(T=window.$dialog)==null||T.info({title:()=>m(ye,{size:24,type:"success",class:"font-bold"},{default:()=>"Receive"}),content:()=>m(Pr),class:"rounded-2xl dark:bg-[#1a1a1a] dark:text-white",showIcon:!1,negativeButtonProps:{color:"#3CD8A6",size:"medium"},positiveButtonProps:{color:"#03C188",size:"medium"},onPositiveClick:()=>{console.log("Confirm")}})}},{title:t("transaction.buy"),icon:"mdi:wallet",h:()=>{var T;b.query.coin==="NFT"?l.push({name:"nfts"}):(T=window.$dialog)==null||T.info({title:()=>m(ye,{size:24,type:"success",class:"font-bold"},{default:()=>"Buy DLC"}),content:()=>m(za),class:"rounded-2xl dark:bg-[#1a1a1a] dark:text-white",showIcon:!1,negativeButtonProps:{color:"#3CD8A6",size:"medium"},positiveButtonProps:{color:"#03C188",size:"medium"},onPositiveClick:()=>{console.log("Confirm")}})}},{title:t("transaction.send"),icon:"mdi:arrow-up",h:()=>{var T;if(b.query.coin==="NFT")l.push({name:"home"}),g.activeTab="NFTs";else{const S=L(null),C=(T=window.$dialog)==null?void 0:T.info({title:()=>m(ye,{size:24,type:"success",class:"font-bold"},{default:()=>t("home.transfer")}),content:()=>m(zr,{ref:S}),class:"rounded-2xl dark:bg-[#1a1a1a] dark:text-white",showIcon:!1,negativeButtonProps:{color:"#3CD8A6",size:"medium"},positiveButtonProps:{color:"#03C188",size:"medium"},positiveText:t("app.confirm"),negativeText:t("app.cancel"),onPositiveClick:()=>J(this,null,function*(){var i,d;if(C){console.log(S.value.activeTab);const x=S.value;if(!x)return!1;if(!(yield x.validateForm().catch(()=>!1)))return(i=window.$message)==null||i.error(t("home.formInvalid")),!1;C.loading=!0,C.positiveText="loading...";const z=S.value.activeTab,j=S.value.model[z].address,D=S.value.model[z].amount;try{const{privateKey:_,address:w}=yield La(re().keystore,S.value.model[z].password,t),$=yield f(z,j,D,_,t);(d=window.$message)==null||d.success(t("home.transferSuccess"))}catch(_){return C.loading=!1,C.positiveText=t("app.confirm"),!1}}})})}}}]),v=G(()=>b.query.coin==="DBC"?tt:b.query.coin==="DLC"?at:rt);return(T,S)=>{const C=Ze("Icon");return I(),N("div",Ar,[B("div",Er,[B("img",{class:"w-[60px] h-[60px] object-fill",src:v.value,alt:""},null,8,Wr),B("div",Fr,[B("div",jr,W(H(b).query.coin),1),B("div",Ir,[H(b).query.coin!=="NFT"?(I(),N("div",Nr,[B("span",Hr,W(H(b).query.coin==="DBC"?Number(H(o)).toFixed(3):Number(H(c)).toFixed(3)),1)])):(I(),N("div",Or,W(H(b).query.length)+W(T.$t("transaction.nft")),1))])]),B("div",Mr,[(I(!0),N(ue,null,$e(p.value,(i,d)=>(I(),N("div",{key:d,onClick:i.h,class:"w-[64px] min-h-[86px] flex flex-col gap-1 justify-center items-center group"},[B("div",Ur,[k(C,{icon:i.icon,class:"text-[36px] text-white transition-transform duration-200 group-hover:scale-110"},null,8,["icon"])]),B("div",Vr,W(i.title),1)],8,qr))),128))])]),B("div",Gr,[k(Sr)])])}}});export{xn as default};
