import React, { useContext, useEffect, useRef, useState } from 'react'
import style from "./share.module.scss"
import { AuthContext } from '../../context/AuthContext'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import axios from 'axios'
import { storage } from '../firebase/index'
export default function Share(props) {
    const { user } = useContext(AuthContext)
    const desc = useRef()
    const [file, setFile] = useState(null)

    // const handleUpload = (e) => {

    //     const path = "" + file.name + Date.now()
    //     const uploadTask = storage.ref("/images/" + path).put(file)
    //     uploadTask.on(
    //         "state_changed",
    //         snapshot => {
    //         },
    //         error => {
    //             console.log(error);
    //         },
    //         () => {
    //             storage.ref("images")
    //                 .child(path)
    //                 .getDownloadURL()
    //                 .then(url => {
    //                     console.log(url)
    //                 })
    //         }
    //     )
    // }

    const submitHandler = async () => {

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if (file) {

            const path = "" + file.name + Date.now()
            const uploadTask = storage.ref("/images/" + path).put(file)
            uploadTask.on(
                "state_changed",
                snapshot => {
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage.ref("images")
                        .child(path)
                        .getDownloadURL()
                        .then(async(url) => {
                            newPost.img = url
                            try {
                                await axios.post("/posts/", newPost)
                                setFile(null)
                                setFile(null)
                                desc.current.value = ""
                                props.handle()
                            }
                            catch (err) {
                                console.log("err in saving new post")
                            }
                        })
                }
            )
        }
        else if(desc.current.value){
            try {
                await axios.post("/posts/", newPost)
                setFile(null)
                setFile(null)
                desc.current.value = ""
                props.handle()
            }
            catch (err) {
                console.log("err in saving new post")
            }
            
        }
        else{
            window.alert("PLease upload image/video or write a desc before uploaing post")
        }
    }
    return (
        <div className={style.share}>
            <div className={style.shareWrapper}>
                <div className={style.shareTop}>
                    <img src={user.profilePicture ? user.profilePicture : process.env.PUBLIC_URL + "/assets/person/2.jpeg"} className={style.shareProfileImg} alt="" />
                    <input ref={desc} placeholder={"What's in your mind " + user.username + " ?"} className={style.shareInput} />
                </div>
                <hr className={style.shareHr} />

                {
                    file && (

                        <div className={style.shareImageContainer}>
                            <img className={style.selectedImg} src={URL.createObjectURL(file)} alt="not found" />
                            <Cancel className={style.shareCancel} onClick={() => setFile(null)} />
                        </div>

                    )
                }
                <div className={style.shareBottom} >
                    <div className={style.shareOptions}>
                        <label htmlFor="file" className={style.shareOption}>
                            <PermMedia htmlColor="tomato" className={style.shareIcon} />
                            <span className={style.shareOptionText}>Photo or Video</span>
                            <input type="file" id={"file"} onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className={style.shareOption}>
                            <Label htmlColor="blue" className={style.shareIcon} />
                            <span className={style.shareOptionText}>Tag</span>
                        </div>
                        <div className={style.shareOption}>
                            <Room htmlColor="green" className={style.shareIcon} />
                            <span className={style.shareOptionText}>Location</span>
                        </div>
                        <div className={style.shareOption}>
                            <EmojiEmotions htmlColor="goldenrod" className={style.shareIcon} />
                            <span className={style.shareOptionText}>Feelings</span>
                        </div>
                    </div>
                    <button className={style.shareButton} type="submit" onClick={submitHandler}>Share</button>
                </div>
            </div>
        </div>
    )
}
