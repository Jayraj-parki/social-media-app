import React, { useEffect, useState } from 'react'
import style from "./conversation.module.scss"
import axios from "axios"
export default function Conversation({conversation,currentUser}) {
    const [user,setUser]=useState(null)
    useEffect(()=>{
        const friendId=conversation.members.find(m=>m!==currentUser._id)
        const getUser=async()=>{
           try{
               const res=await axios.get("/users/byId/"+friendId)
               setUser(res.data)
            } 
           catch(err){
                console.log("error in getting user for conversation")
           }
        } 
        getUser()
    },[conversation,currentUser])

    return (
        <div className={style.conversation}>
            <img className={style.conversationImg} src={user?.profilePicture?user.profilePicture:process.env.PUBLIC_URL+"/assets/person/1.jpeg"} alt="" />
            <span className={style.conversationName}>{user?.username}</span>
        </div>
    )
}
