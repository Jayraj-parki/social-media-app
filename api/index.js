const express=require("express") 
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const helmet=require("helmet")
const morgan=require("morgan")
const path=require("path")
dotenv.config();
const app=express()
const userRoute=require("./routes/users")
const authRoute=require("./routes/auth")
const postRoute=require("./routes/post")
const conversationRoute=require("./routes/conversation")
const messageRoute=require("./routes/message")
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("Connection successfull")
})
.catch(()=>{
    console.log("Connection successfull")
})


// middleWare
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api/conversation",conversationRoute)
app.use("/api/message",messageRoute)

app.listen(8000,()=>{
    console.log("backend running at 8000")
}) 