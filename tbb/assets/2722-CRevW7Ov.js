import{d as s}from"./index-BD5lkkvc.js";const f=s({__name:"2722",setup(t){function n(o,a){let e=new Map;return o.forEach(r=>{e.set(r.id,r)}),a.forEach(r=>{e.has(r.id)?e.set(r.id,{...e.get(r.id),...r}):e.set(r.id,r)}),Array.from(e.values()).sort((r,d)=>r.id-d.id)}return console.log(n([{id:1,x:2,y:3},{id:2,x:3,y:6}],[{id:2,x:10,y:20},{id:3,x:0,y:0}])),(o,a)=>null}});export{f as default};
