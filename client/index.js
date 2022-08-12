const url=  location.origin.replace(/^http/, 'ws')


let usersOnline;
let userTyping;

WebSocket.prototype.emit=function (event,data){
 this.send(JSON.stringify({event,data}))
}

const ws= new WebSocket(url)




const messagesContainer=document.getElementById("innerContainer")
const button= document.getElementById("send")
const message=document.getElementById("message")
const users=document.getElementById("info")
const list=document.getElementById("list")
const typingContainer= document.getElementById("typing")
button.disabled=true

// below is our own defined emit function by extending the class


ws.onopen= (e)=>{
    button.disabled=false

    console.log(`connection open ${JSON.stringify(e)}`)
    ws.emit("join", {name:"Amschel",room:"JAVASCRIPT"})
}

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

