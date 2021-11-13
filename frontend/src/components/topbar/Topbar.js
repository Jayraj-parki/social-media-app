import React, { useContext } from 'react'
import style from "./topbar.module.scss"
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
export default function Topbar() {
    const { user } = useContext(AuthContext)
    return (
        <div className={style.topbarContainer + ""}>
            <div className={style.topbarLeft + ""}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className={style.logo}>jsSocialApp</span>
                </Link>
            </div>
            <div className={style.topbarCenter + ""}>
                <div className={style.searchbar + ""}>
                    <Search className={style.searchIcon} />
                    <input type="text" placeholder="Search for friend, post or video" className={style.searchInput} />
                </div>
            </div>
            <div className={style.topbarRight + ""}>
                <div className={style.topbarLinks}>
                    <Link to="/">
                        <span className={style.topbarLink}>Home</span>
                    </Link>
                    {/* <Link to="/profile/name"> */}
                    <span className={style.topbarLink}>Timeline</span>
                    {/* </Link> */}
                </div>
                <div className={style.topbarIcons}>
                    <div className={style.topbarIconItem}>
                        <Person />
                        <span className={style.topbarIconBadge}>1</span>
                    </div>
                    <div className={style.topbarIconItem}>
                        <Link to="/messenger"><Chat /></Link>
                        <span className={style.topbarIconBadge}>2</span>
                    </div>
                    <div className={style.topbarIconItem}>
                        <Notifications />
                        <span className={style.topbarIconBadge}>1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? user.profilePicture : process.env.PUBLIC_URL + "/assets/person/2.jpeg"} className={style.topbarImg} alt="" />
                </Link>

            </div>
        </div>
    )
}
