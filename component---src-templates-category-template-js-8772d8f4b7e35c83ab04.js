"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[555],{3533:function(e,t,a){a.r(t),a.d(t,{Head:function(){return l}});var r=a(6540),o=a(6448),n=a(6230),i=a(8391),s=a(7911),c=a(3551);t.default=e=>{let{data:t,pageContext:a}=e;const{category:s,prevPagePath:l,nextPagePath:d}=a;return r.createElement(o.A,null,r.createElement(c.A,{component:"h2",variant:"h4",gutterBottom:!0},s),r.createElement(n.A,{nodes:t.allMarkdownRemark.nodes}),r.createElement(i.A,{prevPagePath:l,nextPagePath:d}))};const l=e=>{let{pageContext:t}=e;const{title:a}=(0,s.Q6)(),{category:o,currentPage:n}=t,i=n>0?`${o} - Page ${n} - ${a}`:`${o} - ${a}`;return r.createElement("title",null,i)}},6230:function(e,t,a){a.d(t,{A:function(){return O}});var r=a(6540),o=a(6445),n=a(4794),i=a(1848),s=a(4164),c=a(5659),l=a(9077),d=a(5669),m=a(8413),u=a(1609);function p(e){return(0,u.Ay)("MuiCardActionArea",e)}var g=(0,m.A)("MuiCardActionArea",["root","focusVisible","focusHighlight"]),A=a(7881),f=a(4848);const v=(0,i.Ay)(A.A,{name:"MuiCardActionArea",slot:"Root",overridesResolver:(e,t)=>t.root})((0,l.A)((({theme:e})=>({display:"block",textAlign:"inherit",borderRadius:"inherit",width:"100%",[`&:hover .${g.focusHighlight}`]:{opacity:(e.vars||e).palette.action.hoverOpacity,"@media (hover: none)":{opacity:0}},[`&.${g.focusVisible} .${g.focusHighlight}`]:{opacity:(e.vars||e).palette.action.focusOpacity}})))),h=(0,i.Ay)("span",{name:"MuiCardActionArea",slot:"FocusHighlight",overridesResolver:(e,t)=>t.focusHighlight})((0,l.A)((({theme:e})=>({overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:e.transitions.create("opacity",{duration:e.transitions.duration.short})})))),y=r.forwardRef((function(e,t){const a=(0,d.b)({props:e,name:"MuiCardActionArea"}),{children:r,className:o,focusVisibleClassName:n,...i}=a,l=a,m=(e=>{const{classes:t}=e;return(0,c.A)({root:["root"],focusHighlight:["focusHighlight"]},p,t)})(l);return(0,f.jsxs)(v,{className:(0,s.A)(m.root,o),focusVisibleClassName:(0,s.A)(n,m.focusVisible),ref:t,ownerState:l,...i,children:[r,(0,f.jsx)(h,{className:m.focusHighlight,ownerState:l})]})}));var C=y,b=a(4155);function M(e){return(0,u.Ay)("MuiCard",e)}(0,m.A)("MuiCard",["root"]);const E=(0,i.Ay)(b.A,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})({overflow:"hidden"}),N=r.forwardRef((function(e,t){const a=(0,d.b)({props:e,name:"MuiCard"}),{className:r,raised:o=!1,...n}=a,i={...a,raised:o},l=(e=>{const{classes:t}=e;return(0,c.A)({root:["root"]},M,t)})(i);return(0,f.jsx)(E,{className:(0,s.A)(l.root,r),elevation:o?8:void 0,ref:t,ownerState:i,...n})}));var P=N,x=a(7164);function w(e){return(0,u.Ay)("MuiCardContent",e)}(0,m.A)("MuiCardContent",["root"]);const $=(0,i.Ay)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:16,"&:last-child":{paddingBottom:24}}),R=r.forwardRef((function(e,t){const a=(0,d.b)({props:e,name:"MuiCardContent"}),{className:r,component:o="div",...n}=a,i={...a,component:o},l=(e=>{const{classes:t}=e;return(0,c.A)({root:["root"]},w,t)})(i);return(0,f.jsx)($,{as:o,className:(0,s.A)(l.root,r),ownerState:i,ref:t,...n})}));var k=R,S=a(3551);function H(e){return(0,u.Ay)("MuiCardMedia",e)}(0,m.A)("MuiCardMedia",["root","media","img"]);const j=(0,i.Ay)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e,{isMediaComponent:r,isImageComponent:o}=a;return[t.root,r&&t.media,o&&t.img]}})({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",variants:[{props:{isMediaComponent:!0},style:{width:"100%"}},{props:{isImageComponent:!0},style:{objectFit:"cover"}}]}),I=["video","audio","picture","iframe","img"],V=["picture","img"],D=r.forwardRef((function(e,t){const a=(0,d.b)({props:e,name:"MuiCardMedia"}),{children:r,className:o,component:n="div",image:i,src:l,style:m,...u}=a,p=I.includes(n),g=!p&&i?{backgroundImage:`url("${i}")`,...m}:m,A={...a,component:n,isMediaComponent:p,isImageComponent:V.includes(n)},v=(e=>{const{classes:t,isMediaComponent:a,isImageComponent:r}=e,o={root:["root",a&&"media",r&&"img"]};return(0,c.A)(o,H,t)})(A);return(0,f.jsx)(j,{className:(0,s.A)(v.root,o),as:n,role:!p&&i?"img":void 0,ref:t,style:g,ownerState:A,src:p?i||l:void 0,...u,children:r})}));var _=D,L=a(2532);const G="PostList",B={cardActionArea:`${G}-cardActionArea`,card:`${G}-card`,cardDetails:`${G}-cardDetails`,cardMedia:`${G}-cardMedia`,date:`${G}-date`,category:`${G}-category`},F=(0,i.Ay)("div")((e=>{let{theme:t}=e;return{[`& .${B.cardActionArea}`]:{marginBottom:t.spacing(3)},[`& .${B.card}`]:{display:"flex"},[`& .${B.cardDetails}`]:{flex:1},[`& .${B.cardMedia}`]:{width:200},[`& .${B.date}`]:{marginRight:t.spacing(1)},[`& .${B.category}`]:{marginRight:t.spacing(.5)}}}));var O=e=>{let{nodes:t}=e;return r.createElement(F,null,t.map((e=>r.createElement(C,{component:n.Link,to:e.fields.slug,key:e.fields.slug,className:B.cardActionArea},r.createElement(P,{className:B.card},r.createElement(x.A,{className:B.cardDetails},r.createElement(k,null,r.createElement(S.A,{variant:"subtitle1",color:"textSecondary",className:B.date,display:"inline"},(0,o.A)(new Date(e.frontmatter.date),"yyyy-MM-dd")),e.frontmatter.categories.map((e=>r.createElement(S.A,{variant:"subtitle1",color:"textSecondary",display:"inline",className:B.category,key:e},e))),r.createElement(S.A,{component:"h2",variant:"h5"},e.frontmatter.title),r.createElement(S.A,{variant:"subtitle1",component:"p"},e.frontmatter.description||e.excerpt),r.createElement(S.A,{variant:"subtitle1",color:"primary"},"阅读"))),e.frontmatter.featured_media&&r.createElement(_,{className:B.cardMedia,image:(0,L.d)(e.frontmatter.featured_media.childImageSharp.gatsbyImageData),title:e.frontmatter.title,sx:{display:{xs:"none",sm:"block"}}}))))))}},8391:function(e,t,a){a.d(t,{A:function(){return m}});var r=a(6540),o=a(4794);var n={PREV_PAGE:"上一页",NEXT_PAGE:"下一页"},i=a(1848),s=a(5111),c=a(5001);const l={nextNav:"Pagination-nextNav"},d=(0,i.Ay)(s.A)((e=>{let{theme:t}=e;return{[`& .${l.nextNav}`]:{marginLeft:"auto"}}}));var m=e=>{let{prevPageName:t,nextPageName:a,prevPagePath:i,nextPagePath:m}=e;return r.createElement(d,{container:!0,justifyContent:"space-between",wrap:"nowrap"},i?r.createElement(s.A,{item:!0},r.createElement(c.A,{component:o.Link,rel:"prev",to:i,variant:"h6"},"← ",t||n.PREV_PAGE)):null,m?r.createElement(s.A,{item:!0,className:l.nextNav},r.createElement(c.A,{component:o.Link,rel:"next",to:m,variant:"h6"},a||n.NEXT_PAGE," →")):null)}}}]);
//# sourceMappingURL=component---src-templates-category-template-js-8772d8f4b7e35c83ab04.js.map