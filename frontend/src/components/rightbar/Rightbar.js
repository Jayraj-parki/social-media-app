import React, { useEffect, useState, useContext } from 'react'
import style from "./rightbar.module.scss"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import axios from 'axios'
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@mui/icons-material'
export default function Rightbar({ user }) {
    const [friends, setFriends] = useState([])
    const { user: currentUser } = useContext(AuthContext)
    const [followed, setFollowed] = useState(false)
    const getFriends = async () => {
        try {
            const friendList = await axios.get("/users/friends/" + user?._id)
            setFriends(friendList.data)
        } catch (err) {
            console.log("error in getting friends",err)
        }
    }
    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id))
    }, [currentUser, user?._id])
    const followUser = async () => {
        try {
            if(!followed){
                await axios.put("/users/" + user._id+"/follow",{userId:currentUser._id})
            }
            else{
                await axios.put("/users/" + user._id+"/unfollow",{userId:currentUser._id})
                
            }
            setFollowed(!followed)
            
        } catch (err) {
            console.log("error in following user")
        }
    }
    useEffect(() => {
        user?._id && getFriends()

    }, [user?._id])
    const HomeRightbar = () => {
        return (
            <>

                <div className={style.birthdayContainer}>
                    <img className={style.birthdayImg} src={process.env.PUBLIC_URL + "/assets/gift.png"} alt="" />
                    <span className={style.birthdayText}> <b>Pola foster</b> and <b>3 other friends</b> have a birthday today</span>
                </div>
                <img className={style.rightbarAd} src={process.env.PUBLIC_URL + "/assets/ad.png"} alt="" />
                <h4 className={style.rightbarTitleOnline}>Online Friends</h4>
                <ul className={style.rightbarFriendList}>
                    {
                        Users.map((val) =>
                            <Online key={val.id} user={val} />
                        )
                    }
                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>
                {
                    user.username !== currentUser.username && (
                        <button className={style.rightBarFollowBtn} onClick={followUser}>

                            {!followed ? "follow" : "unfollow"}
                            {followed ? <Remove /> : <Add />}
                        </button>
                    )
                }
                <h4 className={style.rightbarTitle}>User Information</h4>
                <div className={style.rightbarInfo}>
                    <div className={style.rightbarInfoItem}>
                        <span className={style.rightbarInfoKey}>City </span>
                        <span className={style.rightbarInfoValue}>{user.city}</span>
                    </div>
                    <div className={style.rightbarInfoItem}>
                        <span className={style.rightbarInfoKey}>from </span>
                        <span className={style.rightbarInfoValue}>{user.from}</span>
                    </div>
                    <div className={style.rightbarInfoItem}>
                        <span className={style.rightbarInfoKey}>Relationship </span>
                        <span className={style.rightbarInfoValue}>{user.relationship === "1" ? "Single" : user.relationship === "2" ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className={style.rightbarTitle}>User Friends</h4>
                {/* <button onClick={getFriends}>Click</button> */}
                <div className={style.rightbarFollowings}>
                    {
                        friends?.map((friend) =>
                            <Link to={"/profile/" + friend.username} key={friend._id}>
                                <div className={style.rightbarFollowing}>
                                    <img src={friend.profilePicture ? friend.profilePicture : process.env.PUBLIC_URL + "/assets/person/1.jpeg"} className={style.rightbarFollowingImg} alt="" />
                                    <span className={style.rightbarFollowingName}> {friend.username}</span>
                                </div>
                            </Link>

                        )
                    }

                </div>

            </>
        )
    }
    return (
        <div className={style.rightbar}>
            <div className={style.rightbarWrapper}>
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>

        </div>
    )
}
