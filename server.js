const express=require("express");
const http=require("http");
const WebSocket=require("ws");
const crypto=require("crypto");
const path=require("path");
const app=express(), server=http.createServer(app), wss=new WebSocket.Server({server});
const rooms=new Map();

app.use(express.static(path.join(__dirname,"public")));
app.get("/api/room",(req,res)=>res.json({roomId:crypto.randomBytes(5).toString("hex")}));
app.get("/room/:id",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));

function send(ws,m){if(ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify(m))}
wss.on("connection",ws=>{
 let room=null,name="Visitante";
 ws.on("message",raw=>{
  let m; try{m=JSON.parse(raw)}catch{return}
  if(m.type==="join"){
   room=String(m.room||"").slice(0,40); name=String(m.name||"Visitante").slice(0,30);
   if(!room)return;
   if(!rooms.has(room))rooms.set(room,new Set());
   const set=rooms.get(room);
   if(set.size>=2){send(ws,{type:"full"});return}
   set.add(ws); send(ws,{type:"joined",count:set.size});
   for(const p of set)if(p!==ws)send(p,{type:"peer",name});
   return;
  }
  if(!room||!rooms.has(room))return;
  for(const p of rooms.get(room))if(p!==ws)send(p,{...m,name});
 });
 ws.on("close",()=>{
  if(!room||!rooms.has(room))return;
  const set=rooms.get(room);set.delete(ws);
  for(const p of set)send(p,{type:"left"});
  if(!set.size)rooms.delete(room);
 });
});
server.listen(process.env.PORT||3000,()=>console.log("Conecta online"));
