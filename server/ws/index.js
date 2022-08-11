const WebSocket = require("ws")
const ws= require("ws")
const express= require("express")
const { v4: uuidv4 } = require('uuid');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const app= express()
const path= require("path")
//console.log(path.resolve(__dirname,"..../client"))
//app.use("/", express.static(path.resolve(__dirname,'.../client')))

//const server=app.listen(5000)

const wss=new ws.Server({port:8080},()=>{
   console.log(`server is running `)
})


const clients=[]

wss.on("connection", (client)=>{
const shortName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
  length: 2
});


  const client_id= uuidv4()
  client['id']=client_id
  client['name']=shortName
   clients.push(client)

  


   client.on("message", function(message){
      const{event,data}=JSON.parse(message)
      switch(event){
         case "join":{
            client.send(JSON.stringify({sender:"ADMIN", content:`welcome, from now on you'll be called ${shortName} `}))

 const users=clients.filter((client)=>client.id!==client_id)
 users.forEach((user)=>user.send(`${shortName} has joined the chat`))
break;
         }

          case "send_message":{
         
client.send(JSON.stringify({sender:"you", content:data}))
 const users=clients.filter((client)=>client.id!==client_id)
 users.forEach((user)=>user.send(JSON.stringify({sender:shortName,content:data})))
break;
         }

         default:{
            client.send("something's wrong")
         }
      }

  })



  

   client.on("close", ()=>{
      console.log("a client has disconnected")
   })

})



/*server.on('upgrade',async function upgrade(request,socket,head){


   //return socket.end('HTTP/1.1 401 Unauthorized\r\n','ascii')

wss.handleUpgrade(request,socket,head,function done(ws){
   wss.emit("connection",ws,request)

})
})*/