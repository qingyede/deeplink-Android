import{d as P,l as n,I as f,a9 as x,aa as l,H as z,av as j,ab as W,K as D,r as V,k as N,N as T,aw as K,ae as O,ax as k,P as q,a1 as Z,W as I,ay as G,M as B,S as J,al as Q,az as X,aA as Y,aB as ee,a2 as ae,a3 as re,aC as $,aD as te,a5 as oe}from"./index-D09qPjuF.js";import{u as le}from"./get-D38_uRRN.js";import{h as A}from"./create-D3Vn69pI.js";import{C as ne}from"./ChevronRight-DMoS1rCb.js";const se=P({name:"ChevronLeft",render(){return n("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},n("path",{d:"M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z",fill:"currentColor"}))}}),ie=f("collapse","width: 100%;",[f("collapse-item",`
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 margin: var(--n-item-margin);
 `,[x("disabled",[l("header","cursor: not-allowed;",[l("header-main",`
 color: var(--n-title-text-color-disabled);
 `),f("collapse-item-arrow",`
 color: var(--n-arrow-color-disabled);
 `)])]),f("collapse-item","margin-left: 32px;"),z("&:first-child","margin-top: 0;"),z("&:first-child >",[l("header","padding-top: 0;")]),x("left-arrow-placement",[l("header",[f("collapse-item-arrow","margin-right: 4px;")])]),x("right-arrow-placement",[l("header",[f("collapse-item-arrow","margin-left: 4px;")])]),l("content-wrapper",[l("content-inner","padding-top: 16px;"),j({duration:"0.15s"})]),x("active",[l("header",[x("active",[f("collapse-item-arrow","transform: rotate(90deg);")])])]),z("&:not(:first-child)","border-top: 1px solid var(--n-divider-color);"),W("disabled",[x("trigger-area-main",[l("header",[l("header-main","cursor: pointer;"),f("collapse-item-arrow","cursor: default;")])]),x("trigger-area-arrow",[l("header",[f("collapse-item-arrow","cursor: pointer;")])]),x("trigger-area-extra",[l("header",[l("header-extra","cursor: pointer;")])])]),l("header",`
 font-size: var(--n-title-font-size);
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition: color .3s var(--n-bezier);
 position: relative;
 padding: var(--n-title-padding);
 color: var(--n-title-text-color);
 `,[l("header-main",`
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 color: var(--n-title-text-color);
 `),l("header-extra",`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),f("collapse-item-arrow",`
 display: flex;
 transition:
 transform .15s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: 18px;
 color: var(--n-arrow-color);
 `)])])]),de=Object.assign(Object.assign({},T.props),{defaultExpandedNames:{type:[Array,String],default:null},expandedNames:[Array,String],arrowPlacement:{type:String,default:"left"},accordion:{type:Boolean,default:!1},displayDirective:{type:String,default:"if"},triggerAreas:{type:Array,default:()=>["main","extra","arrow"]},onItemHeaderClick:[Function,Array],"onUpdate:expandedNames":[Function,Array],onUpdateExpandedNames:[Function,Array],onExpandedNamesChange:{type:[Function,Array],validator:()=>!0,default:void 0}}),F=Z("n-collapse"),ge=P({name:"Collapse",props:de,setup(e,{slots:i}){const{mergedClsPrefixRef:s,inlineThemeDisabled:o,mergedRtlRef:d}=D(e),r=V(e.defaultExpandedNames),h=N(()=>e.expandedNames),v=le(h,r),w=T("Collapse","-collapse",ie,K,e,s);function c(p){const{"onUpdate:expandedNames":t,onUpdateExpandedNames:m,onExpandedNamesChange:b}=e;m&&I(m,p),t&&I(t,p),b&&I(b,p),r.value=p}function g(p){const{onItemHeaderClick:t}=e;t&&I(t,p)}function a(p,t,m){const{accordion:b}=e,{value:E}=v;if(b)p?(c([t]),g({name:t,expanded:!0,event:m})):(c([]),g({name:t,expanded:!1,event:m}));else if(!Array.isArray(E))c([t]),g({name:t,expanded:!0,event:m});else{const C=E.slice(),_=C.findIndex(S=>t===S);~_?(C.splice(_,1),c(C),g({name:t,expanded:!1,event:m})):(C.push(t),c(C),g({name:t,expanded:!0,event:m}))}}O(F,{props:e,mergedClsPrefixRef:s,expandedNamesRef:v,slots:i,toggleItem:a});const u=k("Collapse",d,s),R=N(()=>{const{common:{cubicBezierEaseInOut:p},self:{titleFontWeight:t,dividerColor:m,titlePadding:b,titleTextColor:E,titleTextColorDisabled:C,textColor:_,arrowColor:S,fontSize:L,titleFontSize:M,arrowColorDisabled:U,itemMargin:H}}=w.value;return{"--n-font-size":L,"--n-bezier":p,"--n-text-color":_,"--n-divider-color":m,"--n-title-padding":b,"--n-title-font-size":M,"--n-title-text-color":E,"--n-title-text-color-disabled":C,"--n-title-font-weight":t,"--n-arrow-color":S,"--n-arrow-color-disabled":U,"--n-item-margin":H}}),y=o?q("collapse",void 0,R,e):void 0;return{rtlEnabled:u,mergedTheme:w,mergedClsPrefix:s,cssVars:o?void 0:R,themeClass:y==null?void 0:y.themeClass,onRender:y==null?void 0:y.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),n("div",{class:[`${this.mergedClsPrefix}-collapse`,this.rtlEnabled&&`${this.mergedClsPrefix}-collapse--rtl`,this.themeClass],style:this.cssVars},this.$slots)}}),ce=P({name:"CollapseItemContent",props:{displayDirective:{type:String,required:!0},show:Boolean,clsPrefix:{type:String,required:!0}},setup(e){return{onceTrue:G(B(e,"show"))}},render(){return n(X,null,{default:()=>{const{show:e,displayDirective:i,onceTrue:s,clsPrefix:o}=this,d=i==="show"&&s,r=n("div",{class:`${o}-collapse-item__content-wrapper`},n("div",{class:`${o}-collapse-item__content-inner`},this.$slots));return d?J(r,[[Q,e]]):e?r:null}})}}),pe={title:String,name:[String,Number],disabled:Boolean,displayDirective:String},xe=P({name:"CollapseItem",props:pe,setup(e){const{mergedRtlRef:i}=D(e),s=Y(),o=ee(()=>{var a;return(a=e.name)!==null&&a!==void 0?a:s}),d=ae(F);d||re("collapse-item","`n-collapse-item` must be placed inside `n-collapse`.");const{expandedNamesRef:r,props:h,mergedClsPrefixRef:v,slots:w}=d,c=N(()=>{const{value:a}=r;if(Array.isArray(a)){const{value:u}=o;return!~a.findIndex(R=>R===u)}else if(a){const{value:u}=o;return u!==a}return!0});return{rtlEnabled:k("Collapse",i,v),collapseSlots:w,randomName:s,mergedClsPrefix:v,collapsed:c,triggerAreas:B(h,"triggerAreas"),mergedDisplayDirective:N(()=>{const{displayDirective:a}=e;return a||h.displayDirective}),arrowPlacement:N(()=>h.arrowPlacement),handleClick(a){let u="main";A(a,"arrow")&&(u="arrow"),A(a,"extra")&&(u="extra"),h.triggerAreas.includes(u)&&d&&!e.disabled&&d.toggleItem(c.value,o.value,a)}}},render(){const{collapseSlots:e,$slots:i,arrowPlacement:s,collapsed:o,mergedDisplayDirective:d,mergedClsPrefix:r,disabled:h,triggerAreas:v}=this,w=$(i.header,{collapsed:o},()=>[this.title]),c=i["header-extra"]||e["header-extra"],g=i.arrow||e.arrow;return n("div",{class:[`${r}-collapse-item`,`${r}-collapse-item--${s}-arrow-placement`,h&&`${r}-collapse-item--disabled`,!o&&`${r}-collapse-item--active`,v.map(a=>`${r}-collapse-item--trigger-area-${a}`)]},n("div",{class:[`${r}-collapse-item__header`,!o&&`${r}-collapse-item__header--active`]},n("div",{class:`${r}-collapse-item__header-main`,onClick:this.handleClick},s==="right"&&w,n("div",{class:`${r}-collapse-item-arrow`,key:this.rtlEnabled?0:1,"data-arrow":!0},$(g,{collapsed:o},()=>{var a;return[n(oe,{clsPrefix:r},{default:(a=e.expandIcon)!==null&&a!==void 0?a:()=>this.rtlEnabled?n(se,null):n(ne,null)})]})),s==="left"&&w),te(c,{collapsed:o},a=>n("div",{class:`${r}-collapse-item__header-extra`,onClick:this.handleClick,"data-extra":!0},a))),n(ce,{clsPrefix:r,displayDirective:d,show:!o},i))}});export{ge as _,xe as a};
