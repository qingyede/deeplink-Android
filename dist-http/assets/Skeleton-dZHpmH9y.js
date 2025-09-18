import{H as p,I as C,d as H,K as S,N as k,aT as w,k as N,af as R,aU as b,l as f,a4 as O,aH as T,F as j}from"./index-ChhltHVQ.js";import{u as A}from"./use-houdini-Bm8e05Yt.js";const E=p([C("skeleton",`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),p("@keyframes skeleton-loading",`
 0% {
 background: var(--n-color-start);
 }
 40% {
 background: var(--n-color-end);
 }
 80% {
 background: var(--n-color-start);
 }
 100% {
 background: var(--n-color-start);
 }
 `)]),F=Object.assign(Object.assign({},k.props),{text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}}),$=H({name:"Skeleton",inheritAttrs:!1,props:F,setup(n){A();const{mergedClsPrefixRef:o}=S(n),a=k("Skeleton","-skeleton",E,w,n,o);return{mergedClsPrefix:o,style:N(()=>{var r,t;const s=a.value,{common:{cubicBezierEaseInOut:v}}=s,m=s.self,{color:y,colorEnd:z,borderRadius:x}=m;let i;const{circle:l,sharp:_,round:B,width:e,height:c,size:g,text:h,animated:P}=n;g!==void 0&&(i=m[R("height",g)]);const d=l?(r=e!=null?e:c)!==null&&r!==void 0?r:i:e,u=(t=l&&e!=null?e:c)!==null&&t!==void 0?t:i;return{display:h?"inline-block":"",verticalAlign:h?"-0.125em":"",borderRadius:l?"50%":B?"4096px":_?"":x,width:typeof d=="number"?b(d):d,height:typeof u=="number"?b(u):u,animation:P?"":"none","--n-bezier":v,"--n-color-start":y,"--n-color-end":z}})}},render(){const{repeat:n,style:o,mergedClsPrefix:a,$attrs:r}=this,t=f("div",O({class:`${a}-skeleton`,style:o},r));return n>1?f(j,null,T(n,null).map(s=>[t,`
`])):t}});export{$ as _};
