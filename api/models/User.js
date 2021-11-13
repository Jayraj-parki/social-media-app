const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        deafult: []
    },
    followings: {
        type: Array,
        deafult: []
    },
    isAdmin: {
        type: Boolean,
        deafult: false
    },
    desc:{
        type:String,
        max:100
    },
    city:{
        type:String,
        max:25
    },
    from :{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},
    { timestamps: true }
)
const User = mongoose.model("User", userSchema)
module.exports = User