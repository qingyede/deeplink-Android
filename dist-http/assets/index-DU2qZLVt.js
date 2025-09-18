var Qe=Object.defineProperty;var Ke=Object.getOwnPropertySymbols;var eo=Object.prototype.hasOwnProperty,oo=Object.prototype.propertyIsEnumerable;var Be=(e,o,n)=>o in e?Qe(e,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[o]=n,Ve=(e,o)=>{for(var n in o||(o={}))eo.call(o,n)&&Be(e,n,o[n]);if(Ke)for(var n of Ke(o))oo.call(o,n)&&Be(e,n,o[n]);return e};import{r as L,x as ce,a as to,bg as no,bh as ro,ba as io,bi as ue,bj as ao,bk as fe,d as D,l as d,I as F,a9 as R,H,N as re,K as Ne,bl as so,k as S,P as Re,bm as Ae,a4 as Ce,a1 as Pe,a2 as ee,bn as je,ae as te,aB as pe,T as lo,a6 as he,F as co,bo as uo,bp as fo,bq as po,J as ho,ab as ve,aa as v,M as U,br as vo,W as ne,af as B,bs as bo,bt as Oe,bu as mo,L as go,aU as xe,aj as q,bv as ke,ah as Q,bw as wo,bc as yo,h as $e,u as Me,bx as He,o as Ie,c as Le,b as N,w as K,f as C,X as xo,_ as ko,by as _o,n as We,D as Ee,E as So,au as No,e as $,t as X,as as le,s as Fe}from"./index-D09qPjuF.js";import{r as Ro,N as Co,p as Ue}from"./Popover-DE4ImmvY.js";import{B as Po,V as $o,a as Io}from"./Follower-DluLCQpw.js";import{f as zo,u as Je}from"./get-D38_uRRN.js";import{C as Ko}from"./ChevronRight-DMoS1rCb.js";import{h as Te,c as Bo}from"./create-D3Vn69pI.js";import{_ as Vo}from"./Tooltip-5ptCRD0V.js";function Oo(e){return o=>{o?e.value=o.$el:e.value=null}}function Fo(e,o,n){const i=L(e.value);let r=null;return ce(e,t=>{r!==null&&window.clearTimeout(r),t===!0?n&&!n.value?i.value=!0:r=window.setTimeout(()=>{i.value=!0},o):i.value=!1}),i}function To(e={},o){const n=to({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:i,keyup:r}=e,t=a=>{switch(a.key){case"Control":n.ctrl=!0;break;case"Meta":n.command=!0,n.win=!0;break;case"Shift":n.shift=!0;break;case"Tab":n.tab=!0;break}i!==void 0&&Object.keys(i).forEach(c=>{if(c!==a.key)return;const f=i[c];if(typeof f=="function")f(a);else{const{stop:b=!1,prevent:s=!1}=f;b&&a.stopPropagation(),s&&a.preventDefault(),f.handler(a)}})},l=a=>{switch(a.key){case"Control":n.ctrl=!1;break;case"Meta":n.command=!1,n.win=!1;break;case"Shift":n.shift=!1;break;case"Tab":n.tab=!1;break}r!==void 0&&Object.keys(r).forEach(c=>{if(c!==a.key)return;const f=r[c];if(typeof f=="function")f(a);else{const{stop:b=!1,prevent:s=!1}=f;b&&a.stopPropagation(),s&&a.preventDefault(),f.handler(a)}})},u=()=>{(o===void 0||o.value)&&(fe("keydown",document,t),fe("keyup",document,l)),o!==void 0&&ce(o,a=>{a?(fe("keydown",document,t),fe("keyup",document,l)):(ue("keydown",document,t),ue("keyup",document,l))})};return no()?(ro(u),io(()=>{(o===void 0||o.value)&&(ue("keydown",document,t),ue("keyup",document,l))})):u(),ao(n)}const qe=D({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return d("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),Do=F("icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,[R("color-transition",{transition:"color .3s var(--n-bezier)"}),R("depth",{color:"var(--n-color)"},[H("svg",{opacity:"var(--n-opacity)",transition:"opacity .3s var(--n-bezier)"})]),H("svg",{height:"1em",width:"1em"})]),Ao=Object.assign(Object.assign({},re.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),Ge=D({_n_icon__:!0,name:"Icon",inheritAttrs:!1,props:Ao,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:n}=Ne(e),i=re("Icon","-icon",Do,so,e,o),r=S(()=>{const{depth:l}=e,{common:{cubicBezierEaseInOut:u},self:a}=i.value;if(l!==void 0){const{color:c,[`opacity${l}Depth`]:f}=a;return{"--n-bezier":u,"--n-color":c,"--n-opacity":f}}return{"--n-bezier":u,"--n-color":"","--n-opacity":""}}),t=n?Re("icon",S(()=>`${e.depth||"d"}`),r,e):void 0;return{mergedClsPrefix:o,mergedStyle:S(()=>{const{size:l,color:u}=e;return{fontSize:zo(l),color:u}}),cssVars:n?void 0:r,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e;const{$parent:o,depth:n,mergedClsPrefix:i,component:r,onRender:t,themeClass:l}=this;return!((e=o==null?void 0:o.$options)===null||e===void 0)&&e._n_icon__&&Ae("icon","don't wrap `n-icon` inside `n-icon`"),t==null||t(),d("i",Ce(this.$attrs,{role:"img",class:[`${i}-icon`,l,{[`${i}-icon--depth`]:n,[`${i}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?d(r):this.$slots)}}),ze=Pe("n-dropdown-menu"),be=Pe("n-dropdown"),De=Pe("n-dropdown-option");function _e(e,o){return e.type==="submenu"||e.type===void 0&&e[o]!==void 0}function jo(e){return e.type==="group"}function Xe(e){return e.type==="divider"}function Mo(e){return e.type==="render"}const Ye=D({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const o=ee(be),{hoverKeyRef:n,keyboardKeyRef:i,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:t,activeKeyPathRef:l,animatedRef:u,mergedShowRef:a,renderLabelRef:c,renderIconRef:f,labelFieldRef:b,childrenFieldRef:s,renderOptionRef:x,nodePropsRef:P,menuPropsRef:G}=o,I=ee(De,null),W=ee(ze),Y=ee(je),ie=S(()=>e.tmNode.rawNode),Z=S(()=>{const{value:h}=s;return _e(e.tmNode.rawNode,h)}),ae=S(()=>{const{disabled:h}=e.tmNode;return h}),oe=S(()=>{if(!Z.value)return!1;const{key:h,disabled:y}=e.tmNode;if(y)return!1;const{value:M}=n,{value:J}=i,{value:T}=r,{value:O}=t;return M!==null?O.includes(h):J!==null?O.includes(h)&&O[O.length-1]!==h:T!==null?O.includes(h):!1}),E=S(()=>i.value===null&&!u.value),g=Fo(oe,300,E),A=S(()=>!!(I!=null&&I.enteringSubmenuRef.value)),j=L(!1);te(De,{enteringSubmenuRef:j});function V(){j.value=!0}function p(){j.value=!1}function _(){const{parentKey:h,tmNode:y}=e;y.disabled||a.value&&(r.value=h,i.value=null,n.value=y.key)}function w(){const{tmNode:h}=e;h.disabled||a.value&&n.value!==h.key&&_()}function m(h){if(e.tmNode.disabled||!a.value)return;const{relatedTarget:y}=h;y&&!Te({target:y},"dropdownOption")&&!Te({target:y},"scrollbarRail")&&(n.value=null)}function z(){const{value:h}=Z,{tmNode:y}=e;a.value&&!h&&!y.disabled&&(o.doSelect(y.key,y.rawNode),o.doUpdateShow(!1))}return{labelField:b,renderLabel:c,renderIcon:f,siblingHasIcon:W.showIconRef,siblingHasSubmenu:W.hasSubmenuRef,menuProps:G,popoverBody:Y,animated:u,mergedShowSubmenu:S(()=>g.value&&!A.value),rawNode:ie,hasSubmenu:Z,pending:pe(()=>{const{value:h}=t,{key:y}=e.tmNode;return h.includes(y)}),childActive:pe(()=>{const{value:h}=l,{key:y}=e.tmNode,M=h.findIndex(J=>y===J);return M===-1?!1:M<h.length-1}),active:pe(()=>{const{value:h}=l,{key:y}=e.tmNode,M=h.findIndex(J=>y===J);return M===-1?!1:M===h.length-1}),mergedDisabled:ae,renderOption:x,nodeProps:P,handleClick:z,handleMouseMove:w,handleMouseEnter:_,handleMouseLeave:m,handleSubmenuBeforeEnter:V,handleSubmenuAfterEnter:p}},render(){var e,o;const{animated:n,rawNode:i,mergedShowSubmenu:r,clsPrefix:t,siblingHasIcon:l,siblingHasSubmenu:u,renderLabel:a,renderIcon:c,renderOption:f,nodeProps:b,props:s,scrollable:x}=this;let P=null;if(r){const Y=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,i,i.children);P=d(Ze,Object.assign({},Y,{clsPrefix:t,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const G={class:[`${t}-dropdown-option-body`,this.pending&&`${t}-dropdown-option-body--pending`,this.active&&`${t}-dropdown-option-body--active`,this.childActive&&`${t}-dropdown-option-body--child-active`,this.mergedDisabled&&`${t}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},I=b==null?void 0:b(i),W=d("div",Object.assign({class:[`${t}-dropdown-option`,I==null?void 0:I.class],"data-dropdown-option":!0},I),d("div",Ce(G,s),[d("div",{class:[`${t}-dropdown-option-body__prefix`,l&&`${t}-dropdown-option-body__prefix--show-icon`]},[c?c(i):he(i.icon)]),d("div",{"data-dropdown-option":!0,class:`${t}-dropdown-option-body__label`},a?a(i):he((o=i[this.labelField])!==null&&o!==void 0?o:i.title)),d("div",{"data-dropdown-option":!0,class:[`${t}-dropdown-option-body__suffix`,u&&`${t}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?d(Ge,null,{default:()=>d(Ko,null)}):null)]),this.hasSubmenu?d(Po,null,{default:()=>[d($o,null,{default:()=>d("div",{class:`${t}-dropdown-offset-container`},d(Io,{show:this.mergedShowSubmenu,placement:this.placement,to:x&&this.popoverBody||void 0,teleportDisabled:!x},{default:()=>d("div",{class:`${t}-dropdown-menu-wrapper`},n?d(lo,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>P}):P)}))})]}):null);return f?f({node:W,option:i}):W}}),Ho=D({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:o}=ee(ze),{renderLabelRef:n,labelFieldRef:i,nodePropsRef:r,renderOptionRef:t}=ee(be);return{labelField:i,showIcon:e,hasSubmenu:o,renderLabel:n,nodeProps:r,renderOption:t}},render(){var e;const{clsPrefix:o,hasSubmenu:n,showIcon:i,nodeProps:r,renderLabel:t,renderOption:l}=this,{rawNode:u}=this.tmNode,a=d("div",Object.assign({class:`${o}-dropdown-option`},r==null?void 0:r(u)),d("div",{class:`${o}-dropdown-option-body ${o}-dropdown-option-body--group`},d("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__prefix`,i&&`${o}-dropdown-option-body__prefix--show-icon`]},he(u.icon)),d("div",{class:`${o}-dropdown-option-body__label`,"data-dropdown-option":!0},t?t(u):he((e=u.title)!==null&&e!==void 0?e:u[this.labelField])),d("div",{class:[`${o}-dropdown-option-body__suffix`,n&&`${o}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return l?l({node:a,option:u}):a}}),Lo=D({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:o,clsPrefix:n}=this,{children:i}=e;return d(co,null,d(Ho,{clsPrefix:n,tmNode:e,key:e.key}),i==null?void 0:i.map(r=>{const{rawNode:t}=r;return t.show===!1?null:Xe(t)?d(qe,{clsPrefix:n,key:r.key}):r.isGroup?(Ae("dropdown","`group` node is not allowed to be put in `group` node."),null):d(Ye,{clsPrefix:n,tmNode:r,parentKey:o,key:r.key})}))}}),Wo=D({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:o}}=this.tmNode;return d("div",o,[e==null?void 0:e()])}}),Ze=D({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:o,childrenFieldRef:n}=ee(be);te(ze,{showIconRef:S(()=>{const r=o.value;return e.tmNodes.some(t=>{var l;if(t.isGroup)return(l=t.children)===null||l===void 0?void 0:l.some(({rawNode:a})=>r?r(a):a.icon);const{rawNode:u}=t;return r?r(u):u.icon})}),hasSubmenuRef:S(()=>{const{value:r}=n;return e.tmNodes.some(t=>{var l;if(t.isGroup)return(l=t.children)===null||l===void 0?void 0:l.some(({rawNode:a})=>_e(a,r));const{rawNode:u}=t;return _e(u,r)})})});const i=L(null);return te(uo,null),te(fo,null),te(je,i),{bodyRef:i}},render(){const{parentKey:e,clsPrefix:o,scrollable:n}=this,i=this.tmNodes.map(r=>{const{rawNode:t}=r;return t.show===!1?null:Mo(t)?d(Wo,{tmNode:r,key:r.key}):Xe(t)?d(qe,{clsPrefix:o,key:r.key}):jo(t)?d(Lo,{clsPrefix:o,tmNode:r,parentKey:e,key:r.key}):d(Ye,{clsPrefix:o,tmNode:r,parentKey:e,key:r.key,props:t.props,scrollable:n})});return d("div",{class:[`${o}-dropdown-menu`,n&&`${o}-dropdown-menu--scrollable`],ref:"bodyRef"},n?d(po,{contentClass:`${o}-dropdown-menu__content`},{default:()=>i}):i,this.showArrow?Ro({clsPrefix:o,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),Eo=F("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ho(),F("dropdown-option",`
 position: relative;
 `,[H("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[H("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),F("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[H("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),ve("disabled",[R("pending",`
 color: var(--n-option-text-color-hover);
 `,[v("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),H("&::before","background-color: var(--n-option-color-hover);")]),R("active",`
 color: var(--n-option-text-color-active);
 `,[v("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),H("&::before","background-color: var(--n-option-color-active);")]),R("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[v("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),R("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),R("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[v("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[R("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),v("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[R("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),F("icon",`
 font-size: var(--n-option-icon-size);
 `)]),v("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),v("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[R("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),F("icon",`
 font-size: var(--n-option-icon-size);
 `)]),F("dropdown-menu","pointer-events: all;")]),F("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),F("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),F("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),H(">",[F("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),ve("scrollable",`
 padding: var(--n-padding);
 `),R("scrollable",[v("content",`
 padding: var(--n-padding);
 `)])]),Uo={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},Jo=Object.keys(Ue),qo=Object.assign(Object.assign(Object.assign({},Ue),Uo),re.props),Go=D({name:"Dropdown",inheritAttrs:!1,props:qo,setup(e){const o=L(!1),n=Je(U(e,"show"),o),i=S(()=>{const{keyField:p,childrenField:_}=e;return Bo(e.options,{getKey(w){return w[p]},getDisabled(w){return w.disabled===!0},getIgnored(w){return w.type==="divider"||w.type==="render"},getChildren(w){return w[_]}})}),r=S(()=>i.value.treeNodes),t=L(null),l=L(null),u=L(null),a=S(()=>{var p,_,w;return(w=(_=(p=t.value)!==null&&p!==void 0?p:l.value)!==null&&_!==void 0?_:u.value)!==null&&w!==void 0?w:null}),c=S(()=>i.value.getPath(a.value).keyPath),f=S(()=>i.value.getPath(e.value).keyPath),b=pe(()=>e.keyboard&&n.value);To({keydown:{ArrowUp:{prevent:!0,handler:ae},ArrowRight:{prevent:!0,handler:Z},ArrowDown:{prevent:!0,handler:oe},ArrowLeft:{prevent:!0,handler:ie},Enter:{prevent:!0,handler:E},Escape:Y}},b);const{mergedClsPrefixRef:s,inlineThemeDisabled:x}=Ne(e),P=re("Dropdown","-dropdown",Eo,vo,e,s);te(be,{labelFieldRef:U(e,"labelField"),childrenFieldRef:U(e,"childrenField"),renderLabelRef:U(e,"renderLabel"),renderIconRef:U(e,"renderIcon"),hoverKeyRef:t,keyboardKeyRef:l,lastToggledSubmenuKeyRef:u,pendingKeyPathRef:c,activeKeyPathRef:f,animatedRef:U(e,"animated"),mergedShowRef:n,nodePropsRef:U(e,"nodeProps"),renderOptionRef:U(e,"renderOption"),menuPropsRef:U(e,"menuProps"),doSelect:G,doUpdateShow:I}),ce(n,p=>{!e.animated&&!p&&W()});function G(p,_){const{onSelect:w}=e;w&&ne(w,p,_)}function I(p){const{"onUpdate:show":_,onUpdateShow:w}=e;_&&ne(_,p),w&&ne(w,p),o.value=p}function W(){t.value=null,l.value=null,u.value=null}function Y(){I(!1)}function ie(){A("left")}function Z(){A("right")}function ae(){A("up")}function oe(){A("down")}function E(){const p=g();p!=null&&p.isLeaf&&n.value&&(G(p.key,p.rawNode),I(!1))}function g(){var p;const{value:_}=i,{value:w}=a;return!_||w===null?null:(p=_.getNode(w))!==null&&p!==void 0?p:null}function A(p){const{value:_}=a,{value:{getFirstAvailableNode:w}}=i;let m=null;if(_===null){const z=w();z!==null&&(m=z.key)}else{const z=g();if(z){let h;switch(p){case"down":h=z.getNext();break;case"up":h=z.getPrev();break;case"right":h=z.getChild();break;case"left":h=z.getParent();break}h&&(m=h.key)}}m!==null&&(t.value=null,l.value=m)}const j=S(()=>{const{size:p,inverted:_}=e,{common:{cubicBezierEaseInOut:w},self:m}=P.value,{padding:z,dividerColor:h,borderRadius:y,optionOpacityDisabled:M,[B("optionIconSuffixWidth",p)]:J,[B("optionSuffixWidth",p)]:T,[B("optionIconPrefixWidth",p)]:O,[B("optionPrefixWidth",p)]:me,[B("fontSize",p)]:ge,[B("optionHeight",p)]:we,[B("optionIconSize",p)]:se}=m,k={"--n-bezier":w,"--n-font-size":ge,"--n-padding":z,"--n-border-radius":y,"--n-option-height":we,"--n-option-prefix-width":me,"--n-option-icon-prefix-width":O,"--n-option-suffix-width":T,"--n-option-icon-suffix-width":J,"--n-option-icon-size":se,"--n-divider-color":h,"--n-option-opacity-disabled":M};return _?(k["--n-color"]=m.colorInverted,k["--n-option-color-hover"]=m.optionColorHoverInverted,k["--n-option-color-active"]=m.optionColorActiveInverted,k["--n-option-text-color"]=m.optionTextColorInverted,k["--n-option-text-color-hover"]=m.optionTextColorHoverInverted,k["--n-option-text-color-active"]=m.optionTextColorActiveInverted,k["--n-option-text-color-child-active"]=m.optionTextColorChildActiveInverted,k["--n-prefix-color"]=m.prefixColorInverted,k["--n-suffix-color"]=m.suffixColorInverted,k["--n-group-header-text-color"]=m.groupHeaderTextColorInverted):(k["--n-color"]=m.color,k["--n-option-color-hover"]=m.optionColorHover,k["--n-option-color-active"]=m.optionColorActive,k["--n-option-text-color"]=m.optionTextColor,k["--n-option-text-color-hover"]=m.optionTextColorHover,k["--n-option-text-color-active"]=m.optionTextColorActive,k["--n-option-text-color-child-active"]=m.optionTextColorChildActive,k["--n-prefix-color"]=m.prefixColor,k["--n-suffix-color"]=m.suffixColor,k["--n-group-header-text-color"]=m.groupHeaderTextColor),k}),V=x?Re("dropdown",S(()=>`${e.size[0]}${e.inverted?"i":""}`),j,e):void 0;return{mergedClsPrefix:s,mergedTheme:P,tmNodes:r,mergedShow:n,handleAfterLeave:()=>{e.animated&&W()},doUpdateShow:I,cssVars:x?void 0:j,themeClass:V==null?void 0:V.themeClass,onRender:V==null?void 0:V.onRender}},render(){const e=(i,r,t,l,u)=>{var a;const{mergedClsPrefix:c,menuProps:f}=this;(a=this.onRender)===null||a===void 0||a.call(this);const b=(f==null?void 0:f(void 0,this.tmNodes.map(x=>x.rawNode)))||{},s={ref:Oo(r),class:[i,`${c}-dropdown`,this.themeClass],clsPrefix:c,tmNodes:this.tmNodes,style:[...t,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:l,onMouseleave:u};return d(Ze,Ce(this.$attrs,s,b))},{mergedTheme:o}=this,n={show:this.mergedShow,theme:o.peers.Popover,themeOverrides:o.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return d(Co,Object.assign({},bo(this.$props,Jo),n),{trigger:()=>{var i,r;return(r=(i=this.$slots).default)===null||r===void 0?void 0:r.call(i)}})}}),Xo=F("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[v("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),v("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),v("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),F("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[Oe({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),v("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),v("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),v("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),H("&:focus",[v("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),R("round",[v("rail","border-radius: calc(var(--n-rail-height) / 2);",[v("button","border-radius: calc(var(--n-button-height) / 2);")])]),ve("disabled",[ve("icon",[R("rubber-band",[R("pressed",[v("rail",[v("button","max-width: var(--n-button-width-pressed);")])]),v("rail",[H("&:active",[v("button","max-width: var(--n-button-width-pressed);")])]),R("active",[R("pressed",[v("rail",[v("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),v("rail",[H("&:active",[v("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),R("active",[v("rail",[v("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),v("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[v("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[Oe()]),v("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),R("active",[v("rail","background-color: var(--n-rail-color-active);")]),R("loading",[v("rail",`
 cursor: wait;
 `)]),R("disabled",[v("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Yo=Object.assign(Object.assign({},re.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]});let de;const Se=D({name:"Switch",props:Yo,setup(e){de===void 0&&(typeof CSS!="undefined"?typeof CSS.supports!="undefined"?de=CSS.supports("width","max(1px)"):de=!1:de=!0);const{mergedClsPrefixRef:o,inlineThemeDisabled:n}=Ne(e),i=re("Switch","-switch",Xo,mo,e,o),r=go(e),{mergedSizeRef:t,mergedDisabledRef:l}=r,u=L(e.defaultValue),a=U(e,"value"),c=Je(a,u),f=S(()=>c.value===e.checkedValue),b=L(!1),s=L(!1),x=S(()=>{const{railStyle:g}=e;if(g)return g({focused:s.value,checked:f.value})});function P(g){const{"onUpdate:value":A,onChange:j,onUpdateValue:V}=e,{nTriggerFormInput:p,nTriggerFormChange:_}=r;A&&ne(A,g),V&&ne(V,g),j&&ne(j,g),u.value=g,p(),_()}function G(){const{nTriggerFormFocus:g}=r;g()}function I(){const{nTriggerFormBlur:g}=r;g()}function W(){e.loading||l.value||(c.value!==e.checkedValue?P(e.checkedValue):P(e.uncheckedValue))}function Y(){s.value=!0,G()}function ie(){s.value=!1,I(),b.value=!1}function Z(g){e.loading||l.value||g.key===" "&&(c.value!==e.checkedValue?P(e.checkedValue):P(e.uncheckedValue),b.value=!1)}function ae(g){e.loading||l.value||g.key===" "&&(g.preventDefault(),b.value=!0)}const oe=S(()=>{const{value:g}=t,{self:{opacityDisabled:A,railColor:j,railColorActive:V,buttonBoxShadow:p,buttonColor:_,boxShadowFocus:w,loadingColor:m,textColor:z,iconColor:h,[B("buttonHeight",g)]:y,[B("buttonWidth",g)]:M,[B("buttonWidthPressed",g)]:J,[B("railHeight",g)]:T,[B("railWidth",g)]:O,[B("railBorderRadius",g)]:me,[B("buttonBorderRadius",g)]:ge},common:{cubicBezierEaseInOut:we}}=i.value;let se,k,ye;return de?(se=`calc((${T} - ${y}) / 2)`,k=`max(${T}, ${y})`,ye=`max(${O}, calc(${O} + ${y} - ${T}))`):(se=xe((q(T)-q(y))/2),k=xe(Math.max(q(T),q(y))),ye=q(T)>q(y)?O:xe(q(O)+q(y)-q(T))),{"--n-bezier":we,"--n-button-border-radius":ge,"--n-button-box-shadow":p,"--n-button-color":_,"--n-button-width":M,"--n-button-width-pressed":J,"--n-button-height":y,"--n-height":k,"--n-offset":se,"--n-opacity-disabled":A,"--n-rail-border-radius":me,"--n-rail-color":j,"--n-rail-color-active":V,"--n-rail-height":T,"--n-rail-width":O,"--n-width":ye,"--n-box-shadow-focus":w,"--n-loading-color":m,"--n-text-color":z,"--n-icon-color":h}}),E=n?Re("switch",S(()=>t.value[0]),oe,e):void 0;return{handleClick:W,handleBlur:ie,handleFocus:Y,handleKeyup:Z,handleKeydown:ae,mergedRailStyle:x,pressed:b,mergedClsPrefix:o,mergedValue:c,checked:f,mergedDisabled:l,cssVars:n?void 0:oe,themeClass:E==null?void 0:E.themeClass,onRender:E==null?void 0:E.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:o,checked:n,mergedRailStyle:i,onRender:r,$slots:t}=this;r==null||r();const{checked:l,unchecked:u,icon:a,"checked-icon":c,"unchecked-icon":f}=t,b=!(ke(a)&&ke(c)&&ke(f));return d("div",{role:"switch","aria-checked":n,class:[`${e}-switch`,this.themeClass,b&&`${e}-switch--icon`,n&&`${e}-switch--active`,o&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},d("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:i},Q(l,s=>Q(u,x=>s||x?d("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},d("div",{class:`${e}-switch__rail-placeholder`},d("div",{class:`${e}-switch__button-placeholder`}),s),d("div",{class:`${e}-switch__rail-placeholder`},d("div",{class:`${e}-switch__button-placeholder`}),x)):null)),d("div",{class:`${e}-switch__button`},Q(a,s=>Q(c,x=>Q(f,P=>d(wo,null,{default:()=>this.loading?d(yo,{key:"loading",clsPrefix:e,strokeWidth:20}):this.checked&&(x||s)?d("div",{class:`${e}-switch__button-icon`,key:x?"checked-icon":"icon"},x||s):!this.checked&&(P||s)?d("div",{class:`${e}-switch__button-icon`,key:P?"unchecked-icon":"icon"},P||s):null})))),Q(l,s=>s&&d("div",{key:"checked",class:`${e}-switch__checked`},s)),Q(u,s=>s&&d("div",{key:"unchecked",class:`${e}-switch__unchecked`},s)))))}}),Zo={class:"relative inline-block text-left"},Qo=D({__name:"LanguageSwitcher",setup(e){const o=$e(),{locale:n}=Me(),i=Object.entries(He).map(([t,{label:l,icon:u}])=>({label:`${u}  ${l}`,key:t})),r=t=>{n.value=t,o.lang=t,localStorage.setItem("lang",t)};return(t,l)=>(Ie(),Le("div",Zo,[N(C(Go),{trigger:"click",options:C(i),onSelect:r},{default:K(()=>[N(C(xo),{icon:"mdi:translate",class:"text-[21px] text-primary-500"})]),_:1},8,["options"])]))}}),et=ko(Qo,[["__scopeId","data-v-93fae159"]]),ot=D({__name:"ThemeSwitcher",setup(e){const o=$e(),{theme:n}=_o(o),i=S({get:()=>n.value==="dark",set:r=>{n.value=r?"dark":"light"}});return We(()=>{document.documentElement.setAttribute("data-theme",i.value?"dark":"light")}),(r,t)=>{const l=Ee("Icon"),u=Ge;return Ie(),So(C(Se),{value:C(i),"onUpdate:value":t[0]||(t[0]=a=>i.value=a),size:"large","rail-style":({checked:a})=>({backgroundColor:a?"#03C188":"#dcdcdc"})},{"checked-icon":K(()=>[N(u,null,{default:K(()=>[N(l,{icon:"solar:cloudy-moon-bold-duotone",class:"text-yellow-500"})]),_:1})]),"unchecked-icon":K(()=>[N(u,null,{default:K(()=>[N(l,{icon:"solar:sun-2-linear",class:"text-amber-500"})]),_:1})]),_:1},8,["value","rail-style"])}}});function tt(e){const o=L("");let n=!1,i=null,r;const t=c=>{n||(o.value=c||e("app.unknownVersion"),n=!0,l())},l=()=>{i&&clearTimeout(i),i=null,typeof r=="function"&&(window.toH5=r,r=void 0)};function u(c){try{const f=JSON.parse(c||"{}");if(f&&f.action===4001){const b=f.data||{};t(b.ver||b.version||b.appVersion||"")}}catch(f){}if(typeof r=="function")try{r(c)}catch(f){}}function a(c){var f,b;if(c!=null){if(typeof c=="string"&&!c.trim().startsWith("{"))return c.trim();if(typeof c=="string")try{const s=JSON.parse(c),x=(f=s==null?void 0:s.data)!=null?f:s;return(x==null?void 0:x.ver)||(x==null?void 0:x.version)||(x==null?void 0:x.appVersion)}catch(s){}if(typeof c=="object"){const s=(b=c.data)!=null?b:c;return(s==null?void 0:s.ver)||(s==null?void 0:s.version)||(s==null?void 0:s.appVersion)}}}return We(()=>{r=typeof window.toH5=="function"?window.toH5:void 0,window.toH5=u;try{if(window.dlc&&window.dlc.toNative){const c=window.dlc.toNative(JSON.stringify({action:4001})),f=a(c);f&&t(f)}else o.value=e("app.cannotFetchVersion")}catch(c){o.value=e("app.fetchVersionFailed")}i=setTimeout(()=>{n||(o.value=e("app.fetchVersionFailed"),l())},5e3)}),No(l),{version:o}}function nt(){return{sendStreamConfig:(o={})=>{var i;const n={action:3003,data:Ve({resolution:{w:1920,h:1080}},o)};if(console.log("[StreamConfig] 传递的配置:",n),(i=window==null?void 0:window.dlc)!=null&&i.toNative)try{window.dlc.toNative(JSON.stringify(n))}catch(r){console.warn("[StreamConfig] 调用 dlc.toNative 失败：",r,n)}else console.warn("[StreamConfig] 当前环境不支持 Native 调用，payload=",n)}}}const rt={class:"px-4 pb-6 w-full mx-auto"},it={class:"space-y-5"},at={class:"flex items-center justify-between"},st={class:"flex items-center gap-2"},lt={class:"font-medium text-[15px] text-black dark:text-white"},dt={class:"flex items-center justify-between"},ct={class:"flex items-center gap-2"},ut={class:"font-medium text-[15px] text-black dark:text-white"},ft={class:"flex items-center justify-between"},pt={class:"flex items-center gap-2"},ht={class:"font-medium text-[15px] text-black dark:text-white"},vt={class:"flex items-center justify-between"},bt={class:"flex items-center gap-2"},mt={class:"font-medium text-[15px] text-black dark:text-white"},gt={class:"flex items-center justify-between flex-wrap gap-2"},wt={class:"flex items-center gap-2"},yt={class:"font-medium text-[15px] text-black dark:text-white"},xt={class:"text-[13px] text-gray-500 dark:text-gray-400 font-mono"},It=D({__name:"index",setup(e){const o=$e(),{t:n}=Me(),{version:i}=tt(n),r=a=>{console.log("当使用虚拟摇杆时禁用鼠标:",a),o.disableMouseWhenJoystick=a},t=a=>{console.log("使用自动的虚拟摇杆:",a),o.useAutoVirtualJoystick=a},{sendStreamConfig:l}=nt(),u=()=>{l({noMouseWithVKeys:o.disableMouseWhenJoystick?1:0,useAutoVKeys:o.useAutoVirtualJoystick?1:0})};return ce(()=>o.disableMouseWhenJoystick,u),ce(()=>o.useAutoVirtualJoystick,u),u(),(a,c)=>{const f=Ee("Icon"),b=Vo;return Ie(),Le("div",rt,[$("div",it,[N(C(le),{"content-class":"!px-3",class:"rounded-xl bg-surface dark:bg-surface-dark"},{default:K(()=>[$("div",at,[$("div",st,[N(f,{icon:"mdi:theme-light-dark",class:"text-[20px] text-primary-600"}),$("span",lt,X(a.$t("setting.darkMode")),1)]),N(ot)])]),_:1}),N(C(le),{"content-class":"!px-3",class:"rounded-xl bg-surface dark:bg-surface-dark"},{default:K(()=>{var s;return[$("div",dt,[$("div",ct,[N(f,{icon:"mdi:translate",class:"text-[20px] text-primary-600"}),$("span",ut,X((s=C(He)[C(o).lang])==null?void 0:s.label),1)]),N(et)])]}),_:1}),N(C(le),{"content-class":"!px-3",class:"rounded-xl bg-surface dark:bg-surface-dark"},{default:K(()=>[$("div",ft,[$("div",pt,[N(f,{icon:"mdi:mouse-off",class:"text-[20px] text-primary-600"}),N(b,{trigger:"hover"},{trigger:K(()=>[$("span",ht,X(a.$t("setting.disableMouse")),1)]),default:K(()=>[Fe(" "+X(a.$t("setting.disableMouseTip")),1)]),_:1})]),N(C(Se),{"rail-style":({checked:s})=>({backgroundColor:s?"#03C188":"#dcdcdc"}),value:C(o).disableMouseWhenJoystick,"onUpdate:value":[c[0]||(c[0]=s=>C(o).disableMouseWhenJoystick=s),r]},null,8,["rail-style","value"])])]),_:1}),N(C(le),{"content-class":"!px-3",class:"rounded-xl bg-surface dark:bg-surface-dark"},{default:K(()=>[$("div",vt,[$("div",bt,[N(f,{icon:"mdi:gamepad-variant",class:"text-[20px] text-primary-600"}),N(b,{trigger:"hover"},{trigger:K(()=>[$("span",mt,X(a.$t("setting.autoJoystick")),1)]),default:K(()=>[Fe(" "+X(a.$t("setting.autoJoystickTip")),1)]),_:1})]),N(C(Se),{"rail-style":({checked:s})=>({backgroundColor:s?"#03C188":"#dcdcdc"}),value:C(o).useAutoVirtualJoystick,"onUpdate:value":[c[1]||(c[1]=s=>C(o).useAutoVirtualJoystick=s),t]},null,8,["rail-style","value"])])]),_:1}),N(C(le),{"content-class":"!px-3",class:"rounded-xl bg-surface dark:bg-surface-dark"},{default:K(()=>[$("div",gt,[$("div",wt,[N(f,{icon:"mdi:information-outline",class:"text-[20px] text-primary-600"}),$("span",yt,X(a.$t("setting.currentVersion")),1)]),$("span",xt,X(C(i)),1)])]),_:1})])])}}});export{It as default};
