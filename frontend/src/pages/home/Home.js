import React from 'react'
import style from "./home.module.scss"
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
export default function Home() {
    return (
        <>
            <Topbar />
            <div className={style.homeContainer}>
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}
