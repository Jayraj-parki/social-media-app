const mongoose = require('mongoose')
const ConversationSchema = new mongoose.Schema({
    members:{
        type:Array,
    }
},
    { timestamps: true }
)
const Conversation = mongoose.model("Conversation", ConversationSchema)
module.exports = Conversation 
// 618292736f32b07420ec52e1 618928c640178105141183af