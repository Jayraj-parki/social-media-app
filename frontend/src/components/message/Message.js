import React from 'react'
import style from "./message.module.scss"
import {format} from "timeago.js"
export default function Message({message,own}) {
    return (
        <div id={own? style.own :""} className={style.message +" " }>
            <div className={style.messageTop}>
                <img className={style.mesageImg}  src={process.env.PUBLIC_URL+"/assets/person/1.jpeg"} alt="" />
                <p className={style.messageText}>{message.text}</p>
            </div>
            <div className={style.messageBottom}>
                   {format(message.createdAt)}
            </div>
            
        </div>
    )
}
