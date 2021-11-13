import React, { useContext, useRef } from 'react'
import style from "./login.module.scss"
import {loginCall} from "../../apiCalls"
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';
export default function Login() {
    const email=useRef();
    const password=useRef()
    const {isFetching,dispatch}=useContext(AuthContext)
    const handleClick=(e)=>{
        e.preventDefault()
        loginCall({email:email.current.value,password:password.current.value},dispatch)
    }
    return (
        <div className={style.login}>
            <div className={style.loginWrapper}>
                <div className={style.loginLeft}>
                    <h3 className={style.loginLogo}> JsSocialApp</h3>
                    <span className={style.loginDesc}>
                        Connect with friends and the world around you on jsSocialApp
                    </span>
                </div>
                <div className={style.loginRight}>
                    <form className={style.loginBox} onSubmit={handleClick}>
                        <input type="email" placeholder="Email" className={style.LoginInput} ref={email} required/>
                        <input type="password" placeholder="Password" className={style.LoginInput} ref={password} required minLength="6"/>
                        <button type="submit" disabled={isFetching} className={style.loginBtn}>{isFetching? <CircularProgress color="inherit" size="25px" />:"Log In"}</button>
                        <span className={style.loginForgot}>Forgot Password?</span>
                        <NavLink to="/register"  disabled={isFetching} className={style.loginRegisterBtn}>Create a New Account</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}
