import React, { useEffect, useState } from 'react'
import style from "./profile.module.scss"
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import  {useParams} from "react-router"
import axios from "axios"
export default function Profile() {
    const [user, setUser] = useState({})
    const username=useParams().name
    const fetchUser = async () => {
        try {
            const res = await axios.get(`/users/${username}`)
            setUser(res.data)
        } 
        catch (err) {
            console.log(err)
        } 
    }
    useEffect(() => { 
        fetchUser() 
    }, [username])
    return (
        <> 
            <Topbar />
            <div className={style.profile}>
                <Sidebar />
                <div className={style.profileRightbar}>
                    <div className={style.profileTop}>
                        <div className={style.profileCover}>
                            <img className={style.profileCoverImg} src={user.coverPicture||process.env.PUBLIC_URL+"/assets/person/2.jpeg"} alt="" />
                            <img className={style.profileUserImg} src={user.profilePicture||process.env.PUBLIC_URL+"/assets/person/2.jpeg"} alt="" />
                        </div>
                        <div className={style.profileInfo}>
                            <h4 className={style.profileInfoName}> {user.username}</h4>
                            <span className={style.profileInfoDesc}> {user.desc}</span>
                        </div>
                    </div>
                    <div className={style.profileBottom}>
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div> 
        </>
    )
}
