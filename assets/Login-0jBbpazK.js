import{_ as R,u as L,r as _,c as N,w as t,a as l,o as U,b as a,d as n,e as V,i as y,m as p,f as g,p as j,g as B}from"./index-DHVDLkLp.js";const i=r=>(j("data-v-29755c1c"),r=r(),B(),r),F=i(()=>n("div",{class:"main-title"},"TDRU智能风险计量平台",-1)),O=i(()=>n("div",{class:"main-subtitle"},"低基础、可进化、可拓展、易管理",-1)),D=i(()=>n("div",{class:"login-title"},"欢迎登录",-1)),J=i(()=>n("div",{class:"form-label"},"账号",-1)),T=i(()=>n("div",{class:"form-label"},"密码",-1)),q={__name:"Login",setup(r){const w=y("mApi"),u=L(),f=_(),e=_({}),k={},b=async()=>{if(!await f.value.validate().catch(()=>{}))return;if(e.value.remember?window.localStorage.setItem("u_info",JSON.stringify(e.value)):window.localStorage.removeItem("u_info"),!d.value){p.warning("请确认用户协议");return}const o=await w.userLogin(e.value);if(o.status!==0){p.error(o.info);return}p.success("登录成功"),u.push("/Agent")},h=()=>{g(u,"/Contact")},d=_(!1),x=()=>{g(u,"/Agreement")};return(()=>{const c=JSON.parse(window.localStorage.getItem("u_info")||"{}");c&&c.upwd&&(e.value=c)})(),(c,o)=>{const C=l("a-input"),m=l("a-form-item"),S=l("a-input-password"),v=l("a-checkbox"),I=l("a-form"),A=l("mgs-bg");return U(),N(A,{contentClass:"login-wrap"},{title:t(()=>[F,O]),default:t(()=>[D,a(I,{ref_key:"loginFormRef",ref:f,class:"login-form",model:e.value,rules:k,autocomplete:"off"},{default:t(()=>[a(m,{name:"uname"},{default:t(()=>[J,a(C,{value:e.value.uname,"onUpdate:value":o[0]||(o[0]=s=>e.value.uname=s),placeholder:"请输入"},null,8,["value"])]),_:1}),a(m,{name:"upwd"},{default:t(()=>[T,a(S,{value:e.value.upwd,"onUpdate:value":o[1]||(o[1]=s=>e.value.upwd=s),placeholder:"请输入"},null,8,["value"])]),_:1}),a(v,{checked:d.value,"onUpdate:checked":o[2]||(o[2]=s=>d.value=s)},{default:t(()=>[n("a",{href:"javascript:;",class:"link",onClick:x},"用户协议")]),_:1},8,["checked"]),a(m,{name:"remember","no-style":""},{default:t(()=>[a(v,{checked:e.value.remember,"onUpdate:checked":o[3]||(o[3]=s=>e.value.remember=s),class:"remember-checkbox"},{default:t(()=>[V("记住密码")]),_:1},8,["checked"])]),_:1}),n("div",{class:"login-button",onClick:b},"登录")]),_:1},8,["model"]),n("div",{class:"d-flex jc-center c-pointer",onClick:h},"联系我们")]),_:1})}}},G=R(q,[["__scopeId","data-v-29755c1c"]]);export{G as default};
