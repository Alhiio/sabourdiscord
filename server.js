const express=require("express");
const path=require("path");
const { AccessToken } = require("livekit-server-sdk");

const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.post("/api/token", async (req,res)=>{
  try{
    const roomName=String(req.body.room||"").slice(0,80);
    const identity=String(req.body.identity||"").slice(0,50);
    if(!roomName||!identity) return res.status(400).json({error:"room e identity são obrigatórios"});
    if(!process.env.LIVEKIT_API_KEY||!process.env.LIVEKIT_API_SECRET||!process.env.LIVEKIT_URL)
      return res.status(500).json({error:"Configure LIVEKIT_API_KEY, LIVEKIT_API_SECRET e LIVEKIT_URL no ambiente."});
    const at=new AccessToken(process.env.LIVEKIT_API_KEY,process.env.LIVEKIT_API_SECRET,{
      identity,
      name:identity,
      ttl:"2h"
    });
    at.addGrant({roomJoin:true,room:roomName,canPublish:true,canSubscribe:true});
    const token=await at.toJwt();
    res.json({token,url:process.env.LIVEKIT_URL});
  }catch(e){console.error(e);res.status(500).json({error:"Não foi possível gerar o token."})}
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(process.env.PORT||3000,()=>console.log("Conecta + LiveKit online"));
