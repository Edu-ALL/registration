import{_ as i,h as c,l as a,m as l,s as t,j as d,I as u,C as o}from"./index-bCc6a0h1.js";const _="/img/eduall-logo.webp",h=c({name:"event-scan",props:{url:String},setup(s){const e=()=>{const n=s.url+"&is_confirm=true";window.location.href=n};return d(()=>{(s.url==null||s.url=="")&&u.push({name:"Error",params:{slug:"404"}})}),{register:e}}}),m={id:"registration"},f={class:"container-fluid",style:{height:"100dvh"}},g={class:"row justify-content-center align-items-center h-100"},p={class:"col-md-4"},b=t("div",{class:"d-flex justify-content-center"},[t("img",{src:_,alt:"EduALL",width:"50%",class:"mb-4"})],-1),w={class:"card bg-primary text-white"},v={class:"card-body text-center"},y=t("h3",{class:"mb-3"},[t("strong",null,[o(" Let's Join "),t("br"),o(" EduALL Launchpad Now! ")])],-1),k=t("h6",null,"Register by clicking the button below.",-1),E=t("strong",null," REGISTER NOW ",-1),L=[E],x=t("p",{class:"mb-0"},[o(" For further information you can click "),t("a",{href:"https://launchpad.edu-all.com",style:{color:"yellow"},target:"_blank"},"here")],-1);function C(s,e,n,N,$,j){return a(),l("div",m,[t("div",f,[t("div",g,[t("div",p,[b,t("div",w,[t("div",v,[y,k,t("button",{class:"btn btn-dark mt-4 mb-4 w-100",onClick:e[0]||(e[0]=(...r)=>s.register&&s.register(...r))},L),x])])])])])])}const I=i(h,[["render",C]]);export{I as default};
