import React, { useEffect, useState } from "react"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { auth, db } from "../firebase-config"

export default function Home({ isAuth }) {
  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, "posts")
  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef)
    setPostList(data.docs.map(doc => ({...doc.data(), id: doc.id})))
  }
  useEffect(() => {
    getPosts()
  }, [])

  const deletePost = async id => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
    getPosts()
  }

  return (
    <div className="homePage">
      {postList?.map(post => (
        <div className="post">
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="deletePost">
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button onClick={() => deletePost(post.id)}>&#128465;</button>
              )}
            </div>
          </div>
          <div className="postTextContainer">
            {post.post}
          </div>
          <h3>@{post.author.name}</h3>
        </div>
      ))}
    </div>
  )
}