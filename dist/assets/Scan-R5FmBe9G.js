import{S as J,G as K,C as X,A as G,s as p}from"./GraduationYear-MlyzemBX.js";import{_ as Z,h as ee,k as b,l as d,m,s as e,q as n,y as se,D as v,E as y,B as oe,C as i,v as _,A as g,r as f,J as H,I as ne}from"./index-YyGvbazE.js";import{C as te}from"./ClientEventService-ZeAPHePK.js";import{_ as le}from"./confirmation-f4m2PyRg.js";const re=ee({name:"event-scan",components:{School:J,GraduationYear:K,Country:X},props:{eventId:String},setup(o){const l=f(!0),B=f(),R=f(),Y=f(),k=f(!1),w=f(!1),T=f(),t=f({role:"student",fullname:"",mail:"",phone:"",secondary_name:"",secondary_email:"",secondary_phone:"",school_id:"",other_school:"",graduation_year:"",destination_country:[],scholarship:"N",lead_source_id:"",event_id:"",attend_status:"",attend_party:"",event_type:"",status:"PR",referral:"",client_type:"",have_child:!1}),c=async s=>{const u=H().start();if(s){const a="v1/client-event/TKT/"+s;try{const h=await G.get(a);h.success?N(h.data):p("error","Please try again!","bottom-start"),u.finish()}catch(h){p("error","Please scan the correct QR Code","bottom-start"),console.error(h),u.finish()}}},q=async()=>{const s=H().start(),u="v1/client-event/PH/"+B.value+"?EVT="+o.eventId;try{const a=await G.get(u);a.success?N(a.data):p("error","Please try again!","bottom-start"),s.finish()}catch(a){p("error","Please input the correct phone number","bottom-start"),console.error(a),s.finish()}},N=s=>{var u,a,h,C,z,x,P,E,S,V,j,D,U,r,O,$,L,M,Q,W;if(((u=s==null?void 0:s.joined_event)==null?void 0:u.attend_status)==1)p("warning","You have already scanned.","bottom-start");else{l.value=!1;const A=s.role=="teacher/counsellor"?"teacher":s.role;Y.value=s.is_vip,R.value=(a=s.joined_event)==null?void 0:a.clientevent_id,t.value.role=s.role,t.value.fullname=(h=s[A])==null?void 0:h.name,t.value.mail=(C=s[A])==null?void 0:C.mail,t.value.phone=(z=s[A])==null?void 0:z.phone,t.value.secondary_name=s.role=="parent"?(x=s.student)==null?void 0:x.name:null,t.value.secondary_email=s.role=="parent"?(P=s.student)==null?void 0:P.mail:null,t.value.secondary_phone=s.role=="parent"?(E=s.student)==null?void 0:E.phone:null,t.value.school_id=(S=s.education)==null?void 0:S.school_id,t.value.other_school=null,t.value.graduation_year=(V=s.education)!=null&&V.graduation_year?(j=s.education)==null?void 0:j.graduation_year:null,t.value.destination_country=[],s!=null&&s.dreams_countries&&(s==null||s.dreams_countries.forEach(F=>{t.value.destination_country.push(F.country_id)})),t.value.scholarship=s!=null&&s.scholarship?s==null?void 0:s.scholarship:"N",t.value.lead_source_id=(D=s==null?void 0:s.lead)==null?void 0:D.lead_id,t.value.event_id=(U=s==null?void 0:s.joined_event)==null?void 0:U.event_id,t.value.attend_status=((r=s==null?void 0:s.joined_event)==null?void 0:r.attend_status)==1?"attend":null,t.value.attend_party=(O=s==null?void 0:s.joined_event)==null?void 0:O.attend_party,t.value.event_type=($=s==null?void 0:s.joined_event)==null?void 0:$.event_type,t.value.status=((L=s==null?void 0:s.joined_event)==null?void 0:L.status)=="ots"?"OTS":"PR",t.value.referral=(M=s==null?void 0:s.joined_event)==null?void 0:M.referral,t.value.client_type=(Q=s==null?void 0:s.joined_event)==null?void 0:Q.client_type,t.value.have_child=!!(s.role=="parent"&&((W=s.student)!=null&&W.name))}};return{scan:l,event_id:R,is_vip:Y,loading:k,qrloading:w,phone_number:B,error:T,registration:t,onDecode:c,checkPhone:q,checkingData:N,submit:async()=>{k.value=!0;const s=H().start(),u="v1/registration/verify/"+R.value;try{const a=await G.patch(u,t.value);a.success?(p("success",a.message,"bottom-start"),te.saveClientEvent(a),setTimeout(()=>{ne.push({name:"thanks-event",params:{status:"ots",type:"onsite"}})},3e3)):(T.value=a.error?a.error:null,p("error",a.message?a.message:"Please complete the fields above!","bottom-start")),k.value=!1,s.finish()}catch(a){p("error","Please try again!","bottom-start"),k.value=!1,console.error(a),s.finish()}}}}}),ie={id:"registration"},ae={class:"container-fluid"},ce={key:0,class:"row",style:{height:"100dvh"}},de=e("div",{class:"col-md-8 bg-primary"},[e("div",{class:"d-flex align-items-center w-100 h-100 px-5"},[e("h2",null,"Event Name")])],-1),me={class:"col-md-4"},ue={class:"d-flex align-items-center w-100 h-100 px-5"},_e={class:"d-flex align-items-center w-100 h-100"},he={class:"w-100 text-center"},pe={class:"btn btn-sm btn-outline-primary mb-4"},ve=e("h3",null,[e("strong",null,[i(" SCAN YOUR "),e("br"),i(" QR-CODE HERE ")])],-1),ye={class:"card shadow-sm rounded-0 border-0 mb-3"},ge={class:"card-body"},fe={key:0,class:"p-2"},be={key:1,class:"p-2"},ke=e("h4",null,"OR",-1),we=e("h5",null,"WITH PHONE NUMBER",-1),Ne={class:"card shadow-sm rounded-0 border-0"},Ce={class:"card-body"},ze={class:"input-group mb-3"},xe={class:"input-group-text",id:"number"},Pe={key:1,class:"row justify-content-center",style:{height:"100dvh"}},Ee={class:"col-md-8"},Se={class:"d-flex align-items-center w-100 h-100"},Ve={class:"card shadow border-0 rounded-0 w-100"},je={class:"d-flex justify-content-between align-items-center my-0"},De={class:"m-0 d-flex"},Ue={class:"d-flex align-items-center"},Re={key:0,class:"mb-0"},Te={class:"card-body"},Be={class:"row align-items-center"},Ye=e("div",{class:"col-md-4 text-center"},[e("img",{src:le,alt:"EduALL Confirmation",class:"w-75"})],-1),qe={class:"col-md-8"},Ae={class:"row g-3"},Ge={class:"col-md-6"},He={class:"text-muted label"},Ie=e("span",{class:"text-danger"},"*",-1),Oe={key:0,class:"text-danger error"},$e={class:"col-md-6"},Le={class:"text-muted label"},Me=e("span",{class:"text-danger"},"*",-1),Qe={key:0,class:"text-danger error"},We={class:"col-md-6"},Fe={class:"text-muted label"},Je=e("span",{class:"text-danger"},"*",-1),Ke={key:0,class:"text-danger error"},Xe={key:0,class:"col-md-6"},Ze={class:"text-muted label"},es=e("span",{class:"text-danger"},"*",-1),ss={key:0,class:"text-danger error"},os={key:1,class:"col-md-12"},ns={class:"row"},ts={class:"col-md-4"},ls={class:"text-muted label"},rs=e("span",{class:"text-danger"},"*",-1),is={key:0,class:"text-danger error"},as={class:"col-md-4"},cs={class:"text-muted label"},ds=e("span",{class:"text-danger"},null,-1),ms={class:"col-md-4"},us={class:"text-muted label"},_s=e("span",{class:"text-danger"},null,-1),hs={class:"col-md-12"},ps={class:"text-muted label"},vs=e("span",{class:"text-danger"},"*",-1),ys={key:0,class:"text-danger error"},gs={key:2,class:"col-md-12"},fs={class:"text-muted label"},bs=e("span",{class:"text-danger"},"*",-1),ks={key:0,class:"text-danger error"},ws=e("hr",null,null,-1),Ns={class:"d-flex justify-content-between align-items-end mb-3"},Cs=["disabled"],zs={class:"d-flex w-75 text-end align-items-end justify-content-end"},xs={style:{width:"100px"}},Ps=e("small",{class:"text-muted label"},[i(" Party Number "),e("span",{class:"text-danger"},"*")],-1),Es=["disabled"];function Ss(o,l,B,R,Y,k){var s,u,a,h,C,z,x,P,E,S,V,j,D,U;const w=b("font-awesome-icon"),T=b("router-link"),t=b("qr-stream"),c=b("box-icon"),q=b("GraduationYear"),N=b("School"),I=b("Country");return d(),m("div",ie,[e("div",ae,[o.scan?(d(),m("div",ce,[de,e("div",me,[e("div",ue,[e("div",_e,[e("div",he,[n(T,{to:{name:"home"}},{default:se(()=>[e("div",pe,[n(w,{icon:"fa-home",class:"me-2"}),i(" Back to Home ")])]),_:1}),ve,e("div",ye,[e("div",ge,[o.qrloading?(d(),m("div",be,[n(c,{name:"loader-circle",animation:"spin"})])):(d(),m("div",fe,[n(t,{onDecode:o.onDecode,style:{width:"100%"},class:"rounded"},null,8,["onDecode"])]))])]),ke,we,e("div",Ne,[e("div",Ce,[e("div",ze,[e("span",xe,[n(c,{name:"phone",size:"15px",animation:"tada",class:"pb-2"})]),v(e("input",{type:"text",class:"form-control form-control-sm","aria-describedby":"number","onUpdate:modelValue":l[0]||(l[0]=r=>o.phone_number=r),onChange:l[1]||(l[1]=(...r)=>o.checkPhone&&o.checkPhone(...r))},null,544),[[y,o.phone_number]])])])])])])])])])):(d(),m("div",Pe,[e("div",Ee,[e("div",Se,[e("div",Ve,[e("div",{class:oe(["card-header",o.is_vip?"bg-warning text-white":""])},[e("div",je,[e("h4",De,[n(c,{name:"user-circle",color:o.is_vip?"#fff":"#000",class:"mt-1 me-2"},null,8,["color"]),i(" Confirmation ")]),e("div",Ue,[o.is_vip?(d(),m("h2",Re,"VIP")):_("",!0)])])],2),e("div",Te,[e("div",Be,[Ye,e("div",qe,[e("div",Ae,[e("div",Ge,[e("small",He,[n(c,{name:"user",size:"12px",className:"me-2",color:"#969696"}),i(" Full Name "),Ie]),v(e("input",{type:"text","onUpdate:modelValue":l[2]||(l[2]=r=>o.registration.fullname=r),class:"form-control"},null,512),[[y,o.registration.fullname]]),(s=o.error)!=null&&s.fullname?(d(),m("small",Oe,[n(c,{name:"info-circle",animation:"tada",size:"12px",color:"#d21414",className:"me-1"}),i(" "+g((u=o.error)==null?void 0:u.fullname[0]),1)])):_("",!0)]),e("div",$e,[e("small",Le,[n(c,{name:"envelope",size:"12px",className:"me-2",color:"#969696"}),i(" Email "),Me]),v(e("input",{type:"email","onUpdate:modelValue":l[3]||(l[3]=r=>o.registration.mail=r),class:"form-control"},null,512),[[y,o.registration.mail]]),(a=o.error)!=null&&a.mail?(d(),m("small",Qe,[n(c,{name:"info-circle",animation:"tada",size:"12px",color:"#d21414",className:"me-1"}),i(" "+g((h=o.error)==null?void 0:h.mail[0]),1)])):_("",!0)]),e("div",We,[e("small",Fe,[n(c,{name:"mobile",size:"12px",className:"me-2",color:"#969696"}),i(" Phone Number "),Je]),v(e("input",{type:"text","onUpdate:modelValue":l[4]||(l[4]=r=>o.registration.phone=r),class:"form-control"},null,512),[[y,o.registration.phone]]),(C=o.error)!=null&&C.phone?(d(),m("small",Ke,[n(c,{name:"info-circle",animation:"tada",size:"12px",color:"#d21414",className:"me-1"}),i(" "+g((z=o.error)==null?void 0:z.phone[0]),1)])):_("",!0)]),o.registration.graduation_year?(d(),m("div",Xe,[e("small",Ze,[n(c,{name:"graduation",type:"solid",size:"12px",className:"me-2",color:"#969696"}),i(" Graduation Year "),es]),n(q,{data:o.registration.graduation_year,onCheck:o.checkComponent},null,8,["data","onCheck"]),(x=o.error)!=null&&x.graduation_year?(d(),m("small",ss,[n(c,{name:"info-circle",animation:"tada",size:"12px",color:"#d21414",className:"me-1"}),i(" "+g((P=o.error)==null?void 0:P.graduation_year[0]),1)])):_("",!0)])):_("",!0),o.registration.have_child?(d(),m("div",os,[e("div",ns,[e("div",ts,[e("small",ls,[n(c,{name:"user",type:"solid",size:"12px",className:"me-2",color:"#969696"}),i(" Child Name "),rs]),v(e("input",{type:"text","onUpdate:modelValue":l[5]||(l[5]=r=>o.registration.secondary_name=r),class:"form-control"},null,512),[[y,o.registration.secondary_name]]),(E=o.error)!=null&&E.secondary_name?(d(),m("small",is,[n(c,{name:"info-circle",animation:"tada",size:"12px",color:"#d21414",className:"me-1"}),i(" "+g((S=o.error)==null?void 0:S.secondary_name[0]),1)])):_("",!0)]),e("div",as,[e("small",cs,[n(c,{name:"envelope",type:"solid",size:"12px",className:"me-2",color:"#969696"}),i(" Child Email "),ds]),v(e("input",{type:"email","onUpdate:modelValue":l[6]||(l[6]=r=>o.registration.secondary_email=r),class:"form-control"},null,512),[[y,o.registration.secondary_email]])]),e("div",ms,[e("small",us,[n(c,{name:"mobile",size:"12px",className:"me-2",color:"#969696"}),i(" Child Number "),_s]),v(e("input",{type:"text","onUpdate:modelValue":l[7]||(l[7]=r=>o.registration.secondary_phone=r),class:"form-control"},null,512),[[y,o.registration.secondary_phone]])])])])):_("",!0),e("div",hs,[e("small",ps,[n(c,{name:"school",type:"solid",size:"12px",className:"me-2",color:"#969696"}),i(" School Name "),vs]),n(N,{data:o.registration.school_id,onCheck:o.checkComponent,onNew:o.newData},null,8,["data","onCheck","onNew"]),(V=o.error)!=null&&V.school_id?(d(),m("small",ys,[n(c,{name:"info-circle",animation:"tada",size:"12px",color:"#d21414",className:"me-1"}),i(" "+g((j=o.error)==null?void 0:j.school_id[0]),1)])):_("",!0)]),o.registration.role=="parent"&&o.registration.have_child||o.registration.role=="student"?(d(),m("div",gs,[e("small",fs,[n(c,{name:"flag-alt",type:"solid",size:"12px",className:"me-2",color:"#969696"}),i(" Dream University "),bs]),n(I,{data:o.registration.destination_country,onCheck:o.checkComponent},null,8,["data","onCheck"]),(D=o.error)!=null&&D.destination_country?(d(),m("small",ks,[n(c,{name:"info-circle",animation:"tada",size:"12px",color:"#d21414",className:"me-1"}),i(" "+g((U=o.error)==null?void 0:U.destination_country[0]),1)])):_("",!0)])):_("",!0)])])]),ws,e("div",Ns,[e("button",{class:"btn btn-outline-warning py-1 px-2",onClick:l[8]||(l[8]=r=>o.scan=!0),disabled:o.loading},[n(w,{icon:"fa-arrow-left"}),i(" Back to Scan ")],8,Cs),e("div",zs,[e("div",xs,[Ps,v(e("input",{type:"number","onUpdate:modelValue":l[9]||(l[9]=r=>o.registration.attend_party=r),class:"form-control mb-0",style:{"font-weight":"bold"}},null,512),[[y,o.registration.attend_party]])]),e("button",{class:"btn btn-primary ms-2 h-100",onClick:l[10]||(l[10]=(...r)=>o.submit&&o.submit(...r)),disabled:o.loading},[n(w,{icon:o.loading?"fa-solid fa-spinner":"fa-solid fa-save",class:"me-2",pulse:o.loading},null,8,["icon","pulse"]),i(" "+g(o.loading?"Waiting":"Submit"),1)],8,Es)])])])])])])]))])])}const Rs=Z(re,[["render",Ss]]);export{Rs as default};