import React from 'react'
import style from "./closefriend.module.scss"
export default function CloseFriend({user}) {
    return (
        <li className={style.sidebarFriend}>
            <img className={style.sidebarFriendImg} src={process.env.PUBLIC_URL+"/"+user.profilePicture} alt="" />
            <span className={style.sidebarFriendName}>{user.username}</span>
        </li>
    )
}
