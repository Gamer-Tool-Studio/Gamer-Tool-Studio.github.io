import{f as m,r as f,ag as y,al as v,u as b,h as u,o as w,i as P,w as a,b as o,a as e,d as i,t as x,p as T,e as I}from"./entry.3ee9c555.js";import{_ as N}from"./_plugin-vue_export-helper.c27b6911.js";const A=""+globalThis.__publicAssetsURL("images/RMMZ.png"),C=""+globalThis.__publicAssetsURL("images/RMMV.png"),t=r=>(T("data-v-8c0282f4"),r=r(),I(),r),G=t(()=>e("h1",null,"NPC-GPT - Real-time AI chats for your game characters",-1)),k=t(()=>e("div",{class:"intro-cta"},[e("button",{class:"button"},"Start Free Trial Now"),e("a",{href:"https://gamertoolstudio.gitbook.io/npc-gpt/introduction/introduction"},[e("p",null,"View our documentation")])],-1)),S=t(()=>e("div",{class:"demo-video"},[e("iframe",{width:"100%",height:"600",src:"https://www.youtube.com/embed/p-2NLT5jpcA?si=9KDx8_A2xNvWzh2C",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:""})],-1)),M=t(()=>e("h2",{class:"page-headers"}," Unlock entirely new gaming experiences and create unscripted scenarios with the assistance of AI-driven NPCs. Effortlessly craft immersive conversations by integrating with GPT-4 model. ",-1)),R=t(()=>e("div",{class:"feature-boxes"},[e("div",{class:"feature-box"},[e("h3",null,"Open world building"),e("p",null," Leverage the capabilities of AI and enable players to input their own text to interact with characters and open the possibilities within to your game to the maximum. ")]),e("div",{class:"feature-box"},[e("h3",null,"Unscripted NPCs"),e("p",null," Build immersive character backstories and customize the way they respond to players. Make chat GPT a friend or a foe in your game quests. ")]),e("div",{class:"feature-box"},[e("h3",null,"Intuitive Interface"),e("p",null," NPC-GPT plugin requires no programming experience to setup and use from within your favourite game engine. ")]),e("div",{class:"feature-box"},[e("h3",null,"Secure and Private"),e("p",null," Rest assured that your sensitive game content and storylines are safeguarded. We follow strict privacy standards to protect your intellectual property. ")])],-1)),L=t(()=>e("h2",{class:"page-headers"}," Create seamless AI characters to interact with players and users from any Frontend environment with NPC-GPT library ",-1)),H={class:"code-style"},V=t(()=>e("pre",{class:"code-display"},[i("          "),e("code",null,`
            const { Configuration, NpcGptApi } = require("NpcGPt");

            const configuration = new Configuration({
              apiKey: ({}).NPCGPT_API_KEY,
            });
            
            const NpcGpt = new NpcGptApi(configuration);

            const chat = await NpcGpt.createChat({
              "userInput": "I've heard about a secret map?!",
              "chatHistory": [],
              "characterContext": {
                 "name": "GPTWizard",
                 "age": 35,
                  "personality": {
                  "traits": [
                      "shy",
                      "mystic",
                      "adventurous"
                  ],
              "dialogueStyle": "mysterious"
               },

              "backgroundStory": "GPT WIzard is a Mage who lives in Mystery Foster. 
            She was brought up by witches and mages after being found as a baby 
            wondering in the forest. She belongs to this tribe that remains 
            undiscovered by most humans but learned the ways of the past and future 
            and is able to interpret signs and energies.",
              
              "eventsKnowledge": "Knows there is a secret map at the entrance of the
            big cave under a yellow flower and  knows the player harduous future in 
            the forest with many enemies and challenges",
            
            "interests": {
              "Astrology": 7,
              "Herbology": 9,
              "History": 8
            },
            "supportiveness": 8,
            "maxOutputWords": 50
            }
          });

         console.log(completion.data.choices[0].message);
          `),i(`
        `)],-1)),W={class:"typed-display"},z={class:"typed-message"},B=t(()=>e("a",{href:"https://gamertoolstudio.gitbook.io/npc-gpt/api-reference/introduction"},[e("button",{class:"button"},"View API Reference")],-1)),K=t(()=>e("h2",{class:"page-headers"}," Add NPC-GPT Plugin to your favourite game engine today and start harnessing the power of AI-generated conversations with ease ",-1)),D=t(()=>e("ol",{class:"how-to-start"},[e("li",null,"Sign up for a trial account or select a suitable paid plan."),e("li",null,[i(" Install the NPC-GPT plugin in your preferred game engine. "),e("a",{href:"/download-plugin"},"Download Plugin file"),i(". ")]),e("li",null," Define personality traits, provide context about game events and establish guidelines for your NPC speech with seamless plugin commands. "),e("li",null,"Harness the power of Chat GPT AI to generate dynamic and immersive conversations."),e("li",null,"Integrate the generated responses into your game seamlessly.")],-1)),F=t(()=>e("div",{class:"engine-logo-container"},[e("img",{class:"engine-logo",src:A})],-1)),U=t(()=>e("div",{class:"engine-logo-container"},[e("img",{class:"engine-logo",src:C})],-1)),Y=t(()=>e("h2",{class:"page-headers"}," Are you ready to take your game development to the next level with the ultimate AI-Powered character building tool? ",-1)),q=t(()=>e("br",null,null,-1)),E=t(()=>e("button",{class:"button"},"Start Free Trial Now",-1)),p="Ah, greetings, traveler! You've stumbled upon some intriguing information indeed. Yes, there is indeed a secret map hidden within the depths of the big cave, tucked away beneath a vibrant yellow flower. It's said to hold the key to unlocking hidden treasures and revealing the path to untold secrets.",O=m({__name:"index",setup(r){let h;const l=f("");function g(c,_){let s=0;function n(){if(s<c.length){const d=c.charAt(s);l.value+=d,s++,setTimeout(n,_)}}n()}return y(()=>{g(p,50),h=setInterval(async()=>{l.value==p&&(l.value="",g(p,50))},3e3)}),v(()=>clearInterval(h)),b({title:"Home Page"}),(c,_)=>{const s=u("v-col"),n=u("v-row"),d=u("v-container");return w(),P(d,{class:"lp"},{default:a(()=>[o(n,null,{default:a(()=>[o(s,{cols:"12",class:"intro-section"},{default:a(()=>[G,k]),_:1}),o(s,null,{default:a(()=>[S]),_:1})]),_:1}),o(n,{class:"features"},{default:a(()=>[o(s,null,{default:a(()=>[M]),_:1}),R]),_:1}),o(n,{class:"get-started",id:"sectionToLinkToApi"},{default:a(()=>[o(s,null,{default:a(()=>[L,e("div",H,[V,e("div",W,[i(' "GPT Wizard response": '),e("span",z,x(l.value),1)])])]),_:1}),o(s,{cols:"12",class:"button-display"},{default:a(()=>[B]),_:1}),o(s,{cols:"12",id:"sectionToLinkToPlugin"},{default:a(()=>[K]),_:1}),o(s,{cols:"6",class:"plugin-explain"},{default:a(()=>[D]),_:1}),o(s,{cols:"6",class:"engines-available"},{default:a(()=>[F,U]),_:1})]),_:1}),o(s,{cols:"12",class:"start-trial"},{default:a(()=>[Y,q,E]),_:1})]),_:1})}}});const J=N(O,[["__scopeId","data-v-8c0282f4"]]);export{J as default};
