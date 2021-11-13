import axios from 'axios';
import React, { useRef } from 'react'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import style from "./register.module.scss"
export default function Register() {
    const email = useRef();
    const username = useRef();
    const password = useRef()
    const passwordAgain = useRef()
    const history=useHistory()
    const handleClick = async(e) => {
        e.preventDefault()
        if(password.current.value!==passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Password don't match");
        }
        else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try{
                const res=await axios.post("/auth/register",user)
                history.push("/login")
                
            }
            catch(err){
                console.log(err)
            }    
        }
       
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
                <div className={style.loginRight} >
                    <form className={style.loginBox} onSubmit={handleClick}>
                        <input type="text" ref={username} required placeholder="Username" className={style.LoginInput} />
                        <input type="email" ref={email} required placeholder="Email" className={style.LoginInput} />
                        <input type="password" minLength="6" ref={password} required placeholder="Password" className={style.LoginInput} />
                        <input type="password" minLength="6" ref={passwordAgain} required placeholder="Password Again" className={style.LoginInput} />
                        <button type="submit" className={style.loginBtn}>Sign Up</button>
                        <NavLink to="/login"  className={style.loginRegisterBtn}>Log into Account</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}
