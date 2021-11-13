import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import style from "./feed.module.scss"
import {AuthContext} from "../../context/AuthContext" 
import axios from 'axios'
// import {Posts} from "../../dummyData"
export default function Feed({username}) {
    const [posts,setPosts]=useState([])
    const {user}=useContext(AuthContext)
    const [share,setShare]=useState(false)
    const fetchPost = async () => {
        try {
            const result =username? await axios.get("/posts/profile/"+username)
            :
            await axios.get("/posts/timeline/"+user._id)
  
            setPosts(
                result.data.sort((p1,p2)=>{
                    return new Date(p2.createdAt)- new Date(p1.createdAt)
                })
            )
        } 
        catch (err) {
            console.log("Error in fetchPost")
        }
    } 
    useEffect(() => { 
        fetchPost() 
        // console.log(posts)
    }, [username,user._id,share])
    return (
        <div className={style.feed}>
            <div className={style.feedWrapper}>
                
                {username===user.username?<Share handle={()=>setShare(!share)} />:null}
                {
                    posts?.map((data) =>
                        <Post key={data._id} post={data} />
                    )
                }
            </div>
        </div>
    )
}
