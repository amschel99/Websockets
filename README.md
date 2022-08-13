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

#### ```index.html``` 









