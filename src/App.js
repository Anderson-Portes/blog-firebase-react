import './App.css'
import { Routes, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? <Link to="/login">Login</Link> : (
          <>
            <Link to="/create" isAuth={isAuth}>Create Post</Link>
            <button className="btn-logout" onClick={signUserOut}>Log out</button>
          </>
        )
        }
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  )
}