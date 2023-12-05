import{_ as M}from"./nuxt-link.3ba7eb6d.js";import{a7 as $,am as D,an as B,g as H,r as N,h as r,o as i,i as C,w as e,a4 as n,c,a5 as u,b as t,a9 as T,R as E,a8 as O,d as o,t as x,a as s,f as z,as as W,s as R,ar as V}from"./entry.3ee9c555.js";const I=""+new URL("ghn.74da50cc.jpeg",import.meta.url).href;const j={key:0,class:"d-none d-sm-flex align-center"},F=s("img",{class:"profile-img",src:I},null,-1),K=s("p",{class:"logged-orgName"},"Org Name",-1),q=[F,K],G=s("li",{class:"d-flex d-sm-none"},"☰",-1),J={key:0,class:"menu-group d-flex d-sm-none pa-2 pt-0 flex-row"},Q=s("img",{class:"profile-img",src:I,width:"30"},null,-1),X=s("p",{class:"logged-orgName"},"Org Name",-1),Y=[Q,X],Z={key:1,class:"menu-group"},ee={key:2,class:"menu-group"},te={key:3,class:"menu-group"},oe={class:"menu-group d-flex d-sm-none"},se={class:"menu-group"},ne={key:4,class:"menu-group"},ae={__name:"user-menu",props:["isLandingPage"],setup(p){const{authenticated:a}=$(D()),_=B(),{logUserOut:v}=D(),{username:k,userEmail:y}=$(H()),g=N([]),m=N(!1),U=()=>{v(),_.push("/")};return(b,d)=>{const f=r("v-list-item-title"),h=r("v-list-item"),l=M,L=r("v-list"),P=r("v-menu"),S=r("v-btn");return i(),C(S,{flat:"",ripple:!1,class:""},{default:e(()=>[n(a)?(i(),c("div",j,q)):u("",!0),G,t(P,{activator:"parent","model-value":n(m),"onUpdate:modelValue":d[0]||(d[0]=w=>T(m)?m.value=w:null),"content-class":{lp:p.isLandingPage}},{default:e(()=>[t(L,{class:"dropDownMenu pb-0"},{default:e(()=>[(i(!0),c(E,null,O(n(g),(w,A)=>(i(),C(h,{key:A,value:A},{default:e(()=>[t(f,null,{default:e(()=>[o(x(w.title),1)]),_:2},1024)]),_:2},1032,["value"]))),128)),n(a)?(i(),c("div",J,Y)):u("",!0),n(a)?u("",!0):(i(),c("div",Z,[t(l,{to:"/login"},{default:e(()=>[o("Log in")]),_:1}),t(l,{to:"/login#register"},{default:e(()=>[o("Sign up")]),_:1})])),n(a)?(i(),c("div",ee,[t(h,{class:"loggedUserName"},{default:e(()=>[o(x(n(k)),1)]),_:1}),t(h,{class:"loggedEmailAdd"},{default:e(()=>[o(x(n(y)),1)]),_:1})])):u("",!0),n(a)?(i(),c("div",te,[t(l,{to:"/dashboard"},{default:e(()=>[o(" Manage account")]),_:1}),t(l,{to:"/dashboard/usage"},{default:e(()=>[o(" Check monthly usage")]),_:1}),t(l,{to:"/dashboard/api-keys"},{default:e(()=>[o(" View API Keys")]),_:1})])):u("",!0),s("div",oe,[t(l,{to:"https://gamertoolstudio.gitbook.io/npc-gpt/introduction/introduction"},{default:e(()=>[o("Documentation")]),_:1}),t(l,{to:"/download-plugin"},{default:e(()=>[o("Download Plugin")]),_:1})]),s("div",se,[t(l,{to:"/pricing"},{default:e(()=>[o("Pricing")]),_:1}),t(l,{to:"/dashboard/"},{default:e(()=>[o("Privacy Policy")]),_:1})]),n(a)?(i(),c("div",ne,[t(l,{onClick:U},{default:e(()=>[o("Logout")]),_:1})])):u("",!0)]),_:1})]),_:1},8,["model-value","content-class"])]),_:1})}}},le=ae,ie=""+new URL("robot-icon-logo.126f67a9.png",import.meta.url).href,ce=(p,a)=>{const _=p.match(a);return console.log(p,_),(_==null?void 0:_[1])||""},_e={class:"navbar"},de={class:"nav-links"},ue={class:"nav-left"},re=s("img",{alt:"logo",src:ie,class:"nav-logo"},null,-1),me={class:"nav-left mobile-display"},pe={class:"dropLink",href:"/#sectionToLinkToApi"},ge={class:"dropLink",href:"/#sectionToLinkToPlugin"},fe={class:"dropLink",href:"https://web3bazaar.org"},he={class:"nav-left mobile-display"},ve={class:"nav-left mobile-display"},ke={class:"nav-left mobile-display"},ye={class:"login-section"},be={key:0,class:"nav-right-link d-none d-sm-flex"},Le={key:1,class:"nav-right d-none d-sm-flex"},Pe=s("a",{href:"#register",class:"button"},"Sign up",-1),we=[Pe],De=z({__name:"AppHeader",setup(p){const a=W(),_=R(()=>["/","/demo-game"].includes(a.path)),v=/^(\/[^\/]+)/,k=["/dashboard"],y=R(()=>!k.includes(ce((a==null?void 0:a.path)||"",v))),g=N(!1),{authenticated:m}=$(D());return(U,b)=>{const d=M,f=r("v-list-item"),h=r("v-list"),l=r("v-menu"),L=le;return i(),c("nav",{class:V({lp:n(_),small:n(y)})},[s("div",_e,[s("ul",de,[s("li",ue,[t(d,{to:"/"},{default:e(()=>[re]),_:1})]),s("li",me,[t(d,null,{default:e(()=>[o(" Products "),t(l,{activator:"parent","model-value":n(g),"onUpdate:modelValue":b[0]||(b[0]=P=>T(g)?g.value=P:null)},{default:e(()=>[t(h,{class:"dropDownMenu"},{default:e(()=>[s("a",pe,[t(f,{class:"dropDownItem"},{default:e(()=>[o(" API")]),_:1})]),s("a",ge,[t(f,{class:"dropDownItem"},{default:e(()=>[o(" Plugin")]),_:1})]),s("a",fe,[t(f,{class:"dropDownItem"},{default:e(()=>[o(" Web3 Marketplace")]),_:1})])]),_:1})]),_:1},8,["model-value"])]),_:1})]),s("li",he,[t(d,{to:"https://gamertoolstudio.gitbook.io/npc-gpt/introduction/introduction"},{default:e(()=>[o("Documentation")]),_:1})]),s("li",ve,[t(d,{to:"/pricing"},{default:e(()=>[o("Pricing")]),_:1})]),s("li",ke,[t(d,{to:"/download-plugin"},{default:e(()=>[o("Download Plugin")]),_:1})])]),s("ul",ye,[n(m)?u("",!0):(i(),c("li",be,[t(d,{to:"/login"},{default:e(()=>[o(" Log in")]),_:1})])),n(m)?u("",!0):(i(),c("li",Le,we)),s("li",{class:V(["user-menu",{"d-sm-none":!n(m)}])},[t(L,{isLandingPage:n(_)},null,8,["isLandingPage"])],2)])])],2)}}});export{De as _};
