//import express
const { response, request } = require("express")
let express = require("express")
let mongoose = require('mongoose')
const videos = require("./videos")
const cors = require ("cors")

//create express app
let app = express()

//configure this app to work with request and response 
//in JSON format
app.use(express.json())
app.use(cors())
//connect with mongodb
let connectionString = "mongodb+srv://usermongodb:passwordmongodb@cluster0.txw1pct.mongodb.net/youtube"
mongoose.connect(connectionString)
let db = mongoose.connection

//check if mongodb conenction was success
db.once("open", ()=>{
    console.log("Mongodb database hosted on cloud.mongodb.com is connected!");
})

//use express app to create first endpoint to 
//receive GET request
//
app.get("/", (request, response)=>{
    console.log(`Request received....`)
    response.json({
        "message":"Welcome to youtube API",
        "request_type":"GET"
    })
})

//whenever the POST request comes from / 'root' endpoint, execute
//the associated callback function
app.post("/", (request, response)=>{
    console.log( `POST Request received....`)
    response.json({
        "message":"Welcome to youtube API",
        "request_type":"POST"
    })

})

app.get("/get/videos/all", (request, response)=>{
    console.log(`Get the list of all videos...`)
    //get all the documents
    videos.find ({},(error,data)=>{
        if(error){
            response.json(error)
        }else{
                response.json(data)
            
        }
    })
})

app.post("/video/add",(request, response)=>{
    //log request body in console
    console.log(`Log request body received in console`)
    console.log(request.body)
    //create new instance of video
    let newvideo = new videos()
    //extract values from request body and insitilize them
    //in new video
    console.log(newvideo)
    newvideo.title = request.body.title
    newvideo.videoid = request.body.videoid
    newvideo.likes = request.body.likes
    newvideo.dislikes = request.body.dislikes
    console.log(newvideo)
    //save newvideo to mongodb
    newvideo.save((error,data)=>{
        if(error){
            response.json(error)
        }else{
            response.json(data)
        }

    })

})

app.post("/video/add",(request,response)=>{
    console.log(request.body)

    response.json({
        "message": "payload added to database"
    })
})

//expose the express app on port 8888
let PORT = 8888

//listed to port 8888 and if it is successfull, then execute
//the callback function

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})
