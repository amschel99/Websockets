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


```server.on('upgrade',async function upgrade(request,socket,head){

//you can handle authentication here
   //return socket.end('HTTP/1.1 401 Unauthorized\r\n','ascii')

wss.handleUpgrade(request,socket,head,function done(ws){
   wss.emit("connection",ws,request)

})
})
```
Place this code at the bottom of your file.  










