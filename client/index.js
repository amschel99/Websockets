const url= "ws://localhost:8080"




WebSocket.prototype.emit=function (event,data){
 this.send(JSON.stringify({event,data}))
}

const ws= new WebSocket(url)
const signIn= document.getElementById("sign-in")
const name= document.getElementById("name")
const room= document.getElementById("room")



const messagesContainer=document.getElementById("innerContainer")
const button= document.getElementById("send")
const message=document.getElementById("message")
button.disabled=true

// below is our own defined emit function by extending the class


ws.onopen= (e)=>{
    button.disabled=false

    console.log(`connection open ${JSON.stringify(e)}`)
    ws.emit("join", {name:"Amschel",room:"JAVASCRIPT"})
}

ws.onmessage= (message)=>{
    const{data}=message
const{sender,content}=JSON.parse(data)
   generateMessageEntry(content,sender)
  
}
const sendMessage=()=>{
    const messageValue= message.value
    
ws.emit("send_message",messageValue )
}
const generateMessageEntry=(message,type)=>{
   const pmessage=document.createElement("p")
pmessage.textContent=`${type}:${message}`
messagesContainer.appendChild(pmessage) 
}

button.addEventListener("click",sendMessage,false)

