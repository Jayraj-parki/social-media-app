import React from 'react'
import style from "./sidebar.module.scss"
import { RssFeed, Chat, PlayCircle, Group, Bookmark, Help, Work, Event, School } from '@mui/icons-material';
import CloseFriend from '../closefriend/CloseFriend';
import { Users } from '../../dummyData';
export default function Sidebar() {
    return (
        <div className={style.sidebar}>
            <div className={style.sidebarWrapper}>
                <ul className={style.sidebarList}>
                    <li className={style.sidebarListItem}>
                        <RssFeed className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Feed</span>
                    </li>
                    <li className={style.sidebarListItem}>
                        <Chat className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Chat</span>
                    </li>
                    <li className={style.sidebarListItem}>
                        <PlayCircle className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Video</span>
                    </li>
                    <li className={style.sidebarListItem}>
                        <Group className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Groups</span>
                    </li>
                    <li className={style.sidebarListItem}>
                        <Bookmark className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Bookmark</span>
                    </li>
                    <li className={style.sidebarListItem}>
                        <Help className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Question</span>
                    </li>
                    <li className={style.sidebarListItem}>
                        <Work className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Job</span>
                    </li>
                    <li className={style.sidebarListItem}>
                        <Event className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Event</span>
                    </li>
                    <li className={style.sidebarListItem}>
                        <School className={style.sidebarListItemIcon} />
                        <span className={style.sidebarListItemText}>Course</span>
                    </li>
                </ul>
                <button className={style.sidebarBtn}>Show More</button>
                <hr className={style.sidebarHr} />
                <ul className={style.sidebarFriendList}>
                {
                        Users.map((val)=>
                            <CloseFriend key={val.id} user={val}/> 
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
