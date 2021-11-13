const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:Array,
    },
    sender:{
        type:String,
    },
    text:{
        type:String
    }
},
    { timestamps: true }
)
const Message = mongoose.model("Message", MessageSchema)
module.exports = Message 