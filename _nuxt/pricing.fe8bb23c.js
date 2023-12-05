import{f as g,r as p,ag as b,h as i,o as f,i as _,w as s,b as o,a as e,d}from"./entry.3ee9c555.js";const v=e("h1",null,"NPC-GPT Pricing Plans",-1),m=e("p",null,[d(" Simple and flexible pricing plans adapted to the development stage of your game. Pay per volume of requests made to our API only."),e("br"),d(" Only Developer packs are available at the moment. Packs for games in production will be available soon. ")],-1),y=e("div",{class:"feature-boxes"},[e("div",{class:"feature-box light-boxes"},[e("h3",{class:"light-title"},"Free Trial"),e("ul",{class:"pricing-tables"},[e("li",null,"Input tokens"),e("li",null,"Output tokens"),e("li"),e("li",null,"Users"),e("li",{class:"align-right"},"50K"),e("li",{class:"align-right"},"20K"),e("li",{class:"align-right"},"1")]),e("div",{class:"price-display-free"},[e("h4",{class:"light-header"},"Free")]),e("a",{href:""},[e("button",{class:"button light-button"},"Subscribe")])]),e("div",{class:"feature-box bold-boxes"},[e("h3",null,"Solo Developer"),e("ul",{class:"pricing-tables"},[e("li",null,"Input tokens"),e("li",null,"Output tokens"),e("li"),e("li",null,"Users"),e("li",{class:"align-right"},"10M"),e("li",{class:"align-right"},"5M"),e("li",{class:"align-right"},"1")]),e("div",{class:"price-display-free"},[e("h4",{class:"bold-header"},"$59,00")]),e("a",{href:"https://buy.stripe.com/aEUaGd0lbgvv8BafYY"},[e("button",{class:"button"},"Subscribe")])]),e("div",{class:"feature-box light-boxes"},[e("h3",{class:"light-title"},"Indie Studio"),e("ul",{class:"pricing-tables"},[e("li",null,"Input tokens"),e("li",null,"Output tokens"),e("li"),e("li",null,"Users"),e("li",{class:"align-right"},"50M"),e("li",{class:"align-right"},"30M"),e("li",{class:"align-right"},"10")]),e("div",{class:"price-display-free"},[e("h4",{class:"light-header"},"$259,00")]),e("a",{href:"https://buy.stripe.com/fZebKhc3Ta77eZy5kl"},[e("button",{class:"button light-button"},"Subscribe")])])],-1),x=e("h3",null,"Need a tailored solution for your project?",-1),k=e("button",{class:"button no-hover-button"},"Contact our Team",-1),C=g({__name:"pricing",setup(B){const t=p(!1),n=()=>{document.querySelectorAll(".bold-boxes").forEach(l=>{t.value?l.classList.add("hovered"):l.classList.remove("hovered")})},c=()=>{document.querySelectorAll(".button").forEach(l=>{t.value?(l.style.backgroundColor="#fff",l.style.color="#6200ee"):(l.style.backgroundColor="#6200ee",l.style.color="#fff")})};return b(()=>{document.querySelectorAll(".light-boxes").forEach(l=>{l.addEventListener("mouseenter",()=>{t.value=!0,n(),c()}),l.addEventListener("mouseleave",()=>{t.value=!1,n(),c()})})}),(a,l)=>{const r=i("v-col"),u=i("v-row"),h=i("v-container");return f(),_(h,{class:"pricing"},{default:s(()=>[o(u,{class:"intro-section"},{default:s(()=>[o(r,null,{default:s(()=>[v,m]),_:1})]),_:1}),o(u,null,{default:s(()=>[y]),_:1}),o(r,{cols:"12",class:"contact-us"},{default:s(()=>[x,k]),_:1})]),_:1})}}});export{C as default};
