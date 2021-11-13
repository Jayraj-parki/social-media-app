import React, { useContext } from 'react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import {Redirect} from "react-router"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { AuthContext } from './context/AuthContext'
import Messenger from './pages/messenger/Messenger'
export default function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login" >
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register" >
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger" >
          {user ? <Messenger />:<Register />}
        </Route>
        <Route path="/profile/:name" >
          <Profile />
        </Route>
        <Route path="/*" >
          <Login />
        </Route>

      </Switch>
    </Router>
  )
}

