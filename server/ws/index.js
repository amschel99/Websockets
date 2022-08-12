const WebSocket = require("ws")
const ws= require("ws")
const express= require("express")
const { v4: uuidv4 } = require('uuid');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const app= express()
const path= require("path")
//console.log(path.join(__dirname,'./index.html'))

app.use('/', express.static(path.resolve(__dirname,'../', "../client")))


const server=app.listen(8080,()=>{
   console.log("running the server")
})


const wss=new ws.Server({noServer:true},()=>{

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

  const clientNames= clients.map((client)=>{
return (({ name }) => ({ name }))(client);
   })

  // client.emit("users","admin",clientNames)







   client.on("message", function(message){
      const{event,data}=JSON.parse(message)
      switch(event){
         case "join":{

            //here is where we should handle the logic of online users
            console.log(clients.length)
            client.send(JSON.stringify({event:"message",sender:"ADMIN", content:`welcome, from now on you'll be called ${shortName} `}))

  client.send(JSON.stringify({event:"users",sender:"ADMIN", content:clientNames}))
 const users=clients.filter((client)=>client.id!==client_id)
 users.forEach((user)=>{user.send(JSON.stringify({event:"message",sender:"ADMIN",content:`${shortName} joined the chat `}))
   user.send(JSON.stringify({event:"users",sender:"ADMIN", content:clientNames}))
   
  user.send(JSON.stringify({event:"users",sender:"ADMIN", content:clientNames}))
         }
 )
         
break;
         }

          case "send_message":{
         
client.send(JSON.stringify({event:"message",sender:"you", content:data}))
 const users=clients.filter((client)=>client.id!==client_id)
 users.forEach((user)=>user.send(JSON.stringify({event:"message",sender:shortName,content:data})))
break;
         }
          case "typing":{
         

 const users=clients.filter((client)=>client.id!==client_id)
 users.forEach((user)=>user.send(JSON.stringify({event:"typing",sender:"Admin",content:`${data} is typing`})))
break;
         }
         case "stoptyping":{
         

 const users=clients.filter((client)=>client.id!==client_id)
 users.forEach((user)=>user.send(JSON.stringify({event:"stoptyping",sender:"Admin",content:`${data} is typing`})))
break;
         }

         default:{
            client.send("something's wrong")
         }
      }

  })



  

   client.on("close", ()=>{
             //here is where we should handle the logic of online users

      clients.map((client,i)=>{
         if(client.id===client_id){
      
          clients.splice(i,1)
          console.log(clientNames)
          
         }
       
      })

      const users=clients.filter((client)=>client.id!==client_id)
 users.forEach((user)=>{
    
    user.send(JSON.stringify({event:"users",sender:"ADMIN", content:clientNames}))
     user.send(JSON.stringify({event:"users",sender:"ADMIN", content:clientNames}))
 user.send(JSON.stringify({event:"message",sender:"ADMIN",content:`${shortName} left the chat `}))

   })

   
   })

})



server.on('upgrade',async function upgrade(request,socket,head){

//you can handle authentication here
   //return socket.end('HTTP/1.1 401 Unauthorized\r\n','ascii')

wss.handleUpgrade(request,socket,head,function done(ws){
   wss.emit("connection",ws,request)

})
})