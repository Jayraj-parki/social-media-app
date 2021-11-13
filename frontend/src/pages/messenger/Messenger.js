import React, { useContext, useEffect, useRef, useState } from 'react'
import style from "./messeger.module.scss"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation"
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import {io} from "socket.io-client"
export default function Messenger() {
    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [message, setMessage] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arraivalMessage, setArraivalMessage] = useState()
    const [onlineUsers, setOnlineUsers] = useState([])
    const { user } = useContext(AuthContext)
    const scrollRef = useRef()
    const socket=useRef()

 
    useEffect(()=>{
        socket.current=io("ws://localhost:8900")
        socket.current.on("getMessage",data=>{
            
            setArraivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
    },[])
    useEffect(()=>{
        arraivalMessage && currentChat?.members.includes(arraivalMessage.sender) && 
        setMessage((prev)=>[...prev,arraivalMessage])
        
    },[arraivalMessage,currentChat])
    useEffect(()=>{
        socket.current.emit("addUser",user._id)
        socket.current.on("getUsers",users=>{
            console.log(users)
            setOnlineUsers(users?.map((u)=>u.userId)) 
            
        })
    },[user])
  


    const getConversation = async () => {
        try {
            const res = await axios.get("/conversation/" + user._id)
            setConversation(res?.data)
            // console.log(res)
        }
        catch (err) {
            console.log("error in getting conversation")
        }
    }
    const sendMessage = async (e) => {
        e.preventDefault()
        const newMsg = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }
        const receiverId=currentChat.members.find(member=>member!==user._id)
        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text:newMsg.text
        })
        try {
            const res = await axios.post("/message/", newMsg)
            setMessage([...message, res.data])
            setNewMessage("")
        }
        catch (err) {
            console.log("err in sending message",err)
        }
    }
    
    useEffect(() => {
        getConversation()
    }, [user._id])
    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get("/message/" + currentChat?._id)
                setMessage(res.data)
            }
            catch (err) {
                console.log("error in getting messages")
            }
        }
        getMessage()
        
    }, [currentChat])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[message])
    return (
        <>
            <Topbar />
            <div className={style.messenger}>
                <div className={style.chatMenu}>
                    <div className={style.chatMenuWrapper}>
                        <input type="text" placeholder="Search for friend" className={style.chatMenuSearch} />
                        {conversation.map((val) =>
                            <div key={val?._id} onClick={() => setCurrentChat(val)}>
                                <Conversation conversation={val} currentUser={user} />
                            </div>
                        )}
                    </div>
                </div>
                <div className={style.chatBox}>
                    <div className={style.chatBoxWrapper}>
                        {
                            currentChat ?
                                <>
                                    <div className={style.chatBoxTop}>
                                        {
                                            message.map((m)=>
                                            <div key={m?._id} ref={scrollRef}>
                                                <Message message={m} own={m.sender===user._id}/>
                                            </div>
                                            )
                                        }

                                    </div>
                                    <div className={style.chatBoxBottom}>
                                        <textarea value={newMessage} onChange= {(e)=>setNewMessage(e.target.value)} className={style.chatMessageInput} placeholder="write something.."></textarea>
                                        <button className={style.ChatSubmitBtn} onClick={sendMessage}>Send</button>
                                    </div>
                                </>
                                : (
                                    <span className={style.noConversation}>open a conversation to start a chat.</span>
                                )
                        }
                    </div>
                </div>
                <div className={style.chatOnline}>
                    <div className={style.chatOnlineWrapper}>
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                        
                    </div>
                </div>
            </div>
                </>
                )
}
