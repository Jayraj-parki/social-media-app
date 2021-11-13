import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from "./chatOnline.module.scss"
export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])
    const handleClick=async(user)=>{
        try{
            const res=await axios.get(`/conversation/find/${currentId}/${user._id}`)
            setCurrentChat(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        const getFriends = async () => {
            try{
                const res = await axios.get("/users/friends/" + currentId)
                setFriends(res.data)

            }catch(err){
                console.log(err) 
            }
        }
        getFriends()
    }, [currentId])
    useEffect(() => {

        setOnlineFriends(friends?.filter((f) => onlineUsers.includes(f._id)))
    }, [friends, onlineUsers])
    return (
        <div className={style.chatOnline}>
            {
                onlineFriends.map((o) =>

                    <div className={style.chatOnlineFriend} onClick={()=>{handleClick(o)}}>
                        <div className={style.chatOnlineImgContainer}>
                            <img src={process.env.PUBLIC_URL + "/assets/person/1.jpeg"} alt="" />
                            <div className={style.chatOnlineBadge}></div>
                        </div>
                        <span className={style.chatOnlineName}>{o.username}</span>
                    </div>
                )
            }
           
        </div>
    )
}
