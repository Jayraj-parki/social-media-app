import React, { useContext, useEffect, useState } from 'react'
import style from "./post.module.scss"
import { MoreVert } from "@mui/icons-material"
// import {Users} from "../../dummyData"
import { Link } from "react-router-dom"
import { format } from "timeago.js"
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
export default function Post({ post }) {
    const [like, setLike] = useState(post?.likes?.length)
    const [isliked, setIsliked] = useState(false)
    const [user, setUser] = useState({})
    const { user: currentUser } = useContext(AuthContext)
    const likeHandler = async () => {
        try {
            await axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
        }
        catch (err) {

        }
        setLike(isliked ? like - 1 : like + 1)
        setIsliked(!isliked)

    }
    const fetchUser = async () => {
        try {

            const res = await axios.get(`/users/post/${post.userId}`)

            setUser(res.data)
        }
        catch (err) {
            console.log("Error in fetchUser")
        }
    }
    useEffect(() => {
        fetchUser()
    }, [post.userId])
    return (
        <div className={style.post}>

            <div className={style.postWrapper}>
                <div className={style.postTop}>
                    <div className={style.postTopLeft}>
                        <Link to={`/profile/${user.username}`}>
                            <img className={style.postProfileImg} src={user.profilePicture || process.env.PUBLIC_URL + "/assets/person/2.jpeg"} alt="" />
                        </Link>

                        <span className={style.postUserName}>{user.username}</span>
                        <span className={style.postDate}>{format(post.createdAt)}</span>
                    </div>
                    <div className={style.postTopRight}>
                        <MoreVert />
                    </div>
                </div>
                <div className={style.postCenter}>
                    <span className={style.postText}>{post?.desc}</span>
                    <img className={style.postImg} src={post?.img ? post.img : ""} alt="" />
                    
                    {
                       post?.img?.includes("mp4")?
                       <embed className={style.postVideo} type="video/webm" src={post.img} controls="true"/>
                        :null
                   } 
                </div>
                <div className={style.postBottom}>
                    <div className={style.postBottomLeft}>
                        <img className={style.likeIcon} src={process.env.PUBLIC_URL + "/assets/like.png"} onClick={likeHandler} alt="" />
                        <img className={style.heartIcon} src={process.env.PUBLIC_URL + "/assets/heart.png"} onClick={likeHandler} alt="" />
                        <span className={style.postLikeCounter}>{like} people like it</span>
                    </div>
                    <div className={style.postBottomRight}>
                        <span className={style.postCommentText}>{post.comment} comments</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
