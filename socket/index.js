const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    }
});
let users=[]
const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId) &&
    users.push({userId,socketId})
}
const removeUser=(socketId)=>{
    users=users.filter(f=>f.socketId!==socketId)
}

const getUser=(userId)=>{
    return users.find((user)=>user.userId===userId)
}

// send and get message
 

 

io.on("connection",(socket)=>{
    console.log("a user connect")
    socket.on("addUser",userId=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    })
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        // console.log(users)
        const user=getUser(receiverId)
        // console.log(user)
        io.to(user?.socketId).emit("getMessage",{
            senderId,
            text 
        })
    }) 
    socket.on("disconnect",()=>{
        console.log("disconneted")
        removeUser(socket.id)
    })
})  
