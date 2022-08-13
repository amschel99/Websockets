## A simple web app that allows users to chat online.


#### It is built using the ```ws``` API and the WebSocket Protocol on the frontend.

### How it's built.

1. ##### Create 2 folders ```server``` and ```client```

2. ##### In the root run ```npm i ws express unique-names-generator uuid --save```

 This will install all dependencies our server needs. We installed them in the root to avoid issues when deploying to heroku.
 
 
 ##### Navigate to the server folder and create an ```index.js``` file.
 This is where all the logic for the server will be written.
 
 ```const ws= require("ws")
const express= require("express")
const { v4: uuidv4 } = require('uuid');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
```
We import the needed packages as shown above.
#### ```ws``` is the package that allows our server to communicate with a client in a bidirectional way.

#### ```express``` will be used to serve static files

#### ```uuid``` will generate a unique id for each client that joins the chat.

#### ```unique-names-generator``` will generate a unique name for any client that joins the chat.

#### ```const app= express()``` app is an instance of a http server
#### ```const path= require("path")``` importing the built in path module from node js
#### ```const PORT= process.env.PORT || 8080``` locally, the app will run on port 8080 but after deployment, it will run on the enviroment's port number

## The Client

The client is built with Html/css and Javascript

#### ```index.html``` You can find the html code at https://github.com/amschel99/Websockets/blob/main/client/index.html

#### ```index.css``` Just some basic styles for the html at https://github.com/amschel99/Websockets/blob/main/client/index.css


#### ```index.js```

```
const url=  location.origin.replace(/^http/, 'ws')
const ws= new WebSocket(url)
```
Most browsers support the WebSocket Protocol.
WebSocket is a class and hence we call its constructor and pass the url.
For example in development, url will be ```ws://localhost:8080```

### Back to the Server

```app.use('/', express.static(path.resolve(__dirname,'../', "../client")))

const server=app.listen(PORT,()=>{
   console.log("running the server")
})


const wss=new ws.Server({noServer:true},()=>{

   console.log(`server is running `)
})
```
The code above  creates an instance of a websocket server which will run on port 8080 locally. 
It will serve the static client folder and also run the websocket server on the same port as we will see below.


```
server.on('upgrade',async function upgrade(request,socket,head){

//you can handle authentication here
   //return socket.end('HTTP/1.1 401 Unauthorized\r\n','ascii')

wss.handleUpgrade(request,socket,head,function done(ws){
   wss.emit("connection",ws,request)

})
})
```
Place this code at the bottom of your file.  
Basically The HTTP/1.1 protocol provides a special mechanism that can be used to upgrade an already established connection to a different protocol like WebSocket protocol, using the Upgrade header field. So the http server listens for the ```upgrade``` event and runs the call back function. You can use an if statement to authenticate users e.g
```
if(not_authenticated){
return socket.end('HTTP/1.1 401 Unauthorized\r\n','ascii')
}
```
If a user is not authenticated, the code below never runs and hence the WebSocket connection never happens.

```
wss.handleUpgrade(request,socket,head,function done(ws){
   wss.emit("connection",ws,request)
   ```
 
 ### All the server logic
 
 
 
 ```
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
 users.forEach((user)=>user.send(JSON.stringify({event:"typing",sender:"Admin",content:`${shortName} is typing`})))
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
```

Run ```node index.js``` to start the server

The ```wss``` (websocketserver) listens for an event called ```connection```.

```wss.on("connection", (client)=>{})```

The callback function contains information about the client who connected.
When a client is connected, there are given a unique id and unique name and there are added to the array of connected clients.


```
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
         
break; } 
````

when the server receives a message from a particular connected client, it  parses the message received and extracts ```event and data```
It checks what event it receives and for each event, it either sends a message back to the client or broadcasts the message to all the other clients through simple array methods like ``forEach```


```

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
```
When a clients disconnects, there are removed from the array of clients and the server broadcasts the message that the the client has disconnected to all  the other connected clients.


### THE CLIENT

```
WebSocket.prototype.emit=function (event,data){
 this.send(JSON.stringify({event,data}))
}
```
We add an emit prototype to the class that will be used to send messages.




```
ws.onopen= (e)=>{
    button.disabled=false

    console.log(`connection open ${JSON.stringify(e)}`)
    ws.emit("join")
}
```
When the connection is open, the clients sends a message to the server. The message contains the event which is join. 
The server will listen for that event and notify the client that they have joined and also broadcast to all other clients that a new client has joined.
(we wrote the logic for that)

```
ws.onmessage= (message)=>{
    const{data}=message
const{sender,content,event}=JSON.parse(data)
switch(event){
    case "message":{
   generateMessageEntry(content,sender)
   break;
    }
    case "users":{
        usersOnline=content
        list.innerHTML=""
        usersOnline.forEach((user)=>{
            //list.innerHTML=""
            const userParagraph=document.createElement("p")
            const present=`<p>${user.name}</p>`
           
            userTyping=user.name
            userParagraph.textContent=user.name
            list.appendChild(userParagraph)
        })
        break;
    }
    case "typing":{
   generateTypingEntry(content,sender)
   break;
    }
     case "stoptyping":{
typingContainer.innerHTML=""
   break;
    }
    default:{
        return null;
    }
}

  
}
```
When the client receives a message from the server, it checks the event and does renders the message depending on the event received from the server.

```
message.addEventListener("keypress", ()=>{

    ws.emit("typing",userTyping)
})


message.addEventListener("keyup", ()=>{

    ws.emit("stoptyping",userTyping)
})
const sendMessage=()=>{
    const messageValue= message.value
    
ws.emit("send_message",messageValue )
}
const generateMessageEntry=(message,type)=>{
    const div=document.createElement("div")
    
   const pmessage=document.createElement("p")
   const author=document.createElement("h6")
  
pmessage.textContent=`${message} `
author.textContent=` ${type}`
 div.appendChild(pmessage)
   div.appendChild(author)
 
messagesContainer.appendChild(div) 

}
const generateTypingEntry=(message,type)=>{
    const div=document.createElement("div")
    
   const pmessage=document.createElement("p")
   const author=document.createElement("h6")
  
pmessage.textContent=`${message} `
author.textContent=` ${type}`
 div.appendChild(pmessage)
   div.appendChild(author)
typingContainer.appendChild(div) 

}

button.addEventListener("click",sendMessage,false)
message.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        sendMessage()
        return
    }
    return


})
```
Above is the rest of the code which is pretty intuitive. The client emits different messages based on events like keypress e.tc


The full source code for the client side login is at  https://github.com/amschel99/Websockets/blob/main/client/index.css


I have also added a scroll.js file for scroll-to-bottom behaviour https://github.com/amschel99/Websockets/blob/main/client/scroll.js


### DEPLOYING TO HEROKU

#### Make sure the package.json is in the root directory.

Add the script below.

   ```"start": "node ./server/index.js"```
   
   git init.
   
   
   git remote add origin 'github-url'.
   
   
   
   git add .
   
   
   
   git commit -m "deploying".
   
   
   
   heroku create -a app_name.
   
   
   
   git push heroku main.
   






   
         
       
         
         
       
         


















