const { default: mongoose } = require("mongoose");



//create a mongoSchema which refers to
//document in videos collection

let mongoSchema = mongoose.Schema

let videoSchema = new mongoSchema({
    "title": String,
"videoid": String,
"likes" : Number,
"dislikes": Number
},
{collection:"videos"

})



//export the video.Schema as model so that it can be 
//imported and used in index.js

module.exports = mongoose.model('videos', videoSchema)