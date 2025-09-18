import{I as p,d as x,K as v,k as o,N as f,af as g,P as S,l as z,bd as T}from"./index-ChhltHVQ.js";import{u as C}from"./use-houdini-Bm8e05Yt.js";import{f as R}from"./get-HvKeKp0F.js";const k=p("gradient-text",`
 display: inline-block;
 font-weight: var(--n-font-weight);
 -webkit-background-clip: text;
 background-clip: text;
 color: #0000;
 white-space: nowrap;
 background-image: linear-gradient(var(--n-rotate), var(--n-color-start) 0%, var(--n-color-end) 100%);
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier);
`),$=Object.assign(Object.assign({},f.props),{size:[String,Number],fontSize:[String,Number],type:{type:String,default:"primary"},color:[Object,String],gradient:[Object,String]}),N=x({name:"GradientText",props:$,setup(t){C();const{mergedClsPrefixRef:n,inlineThemeDisabled:l}=v(t),i=o(()=>{const{type:e}=t;return e==="danger"?"error":e}),m=o(()=>{let e=t.size||t.fontSize;return e&&(e=R(e)),e||void 0}),u=o(()=>{const e=t.color||t.gradient;if(typeof e=="string")return e;if(e){const s=e.deg||0,a=e.from,d=e.to;return`linear-gradient(${s}deg, ${a} 0%, ${d} 100%)`}}),h=f("GradientText","-gradient-text",k,T,t,n),c=o(()=>{const{value:e}=i,{common:{cubicBezierEaseInOut:s},self:{rotate:a,[g("colorStart",e)]:d,[g("colorEnd",e)]:b,fontWeight:y}}=h.value;return{"--n-bezier":s,"--n-rotate":a,"--n-color-start":d,"--n-color-end":b,"--n-font-weight":y}}),r=l?S("gradient-text",o(()=>i.value[0]),c,t):void 0;return{mergedClsPrefix:n,compatibleType:i,styleFontSize:m,styleBgImage:u,cssVars:l?void 0:c,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){const{mergedClsPrefix:t,onRender:n}=this;return n==null||n(),z("span",{class:[`${t}-gradient-text`,`${t}-gradient-text--${this.compatibleType}-type`,this.themeClass],style:[{fontSize:this.styleFontSize,backgroundImage:this.styleBgImage},this.cssVars]},this.$slots)}});export{N};
