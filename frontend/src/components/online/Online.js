import React from 'react'
import style from "./online.module.scss"
export default function Online({user}) {
    return (
        <li className={style.rightbarFriend}>
            <div className={style.rightbarProfileImgContainer}>
                <img className={style.rightbarProfileImg} src={process.env.PUBLIC_URL+"/"+user.profilePicture} alt="" />
                <span className={style.rightbarOnline}></span>
            </div>
            <span className={style.rightbarUsername}>{user.username}</span>
        </li>
    )
}
