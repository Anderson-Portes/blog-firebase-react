import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

export default function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("")
  const [post, setPost] = useState("")
  const postCollectionRef = collection(db, "posts")
  const navigate = useNavigate()
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      post,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    })
    navigate("/")
  }
  
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input placeholder="Title..." value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea placeholder='Post...' value={post} onChange={e => setPost(e.target.value)}/>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}