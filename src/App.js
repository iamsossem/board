import { useState } from "react"
import UserLogin from "./components/UserLogin";
import Posts from "./components/Posts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";

const App = () => {
  const [loginUser,setLoginUser] = useState(null);
  const handleUserInfo = (user)=>{
    setLoginUser(user);
  }
  return (
    // 깃허브 :  HashRouter
    <BrowserRouter>
      <div id="app">
        {
          !loginUser ? (
            <UserLogin onUser={handleUserInfo}/>
           ) : (  
            <>
              <p>{loginUser.nickname}님 환영합니다</p> 
              <Routes>            
                {/* 목록페이지 */}
                <Route path="/" element={<Posts userID={loginUser.id}/>} />     
                {/* 상세 페이지  */}
                <Route path="/post/:id" element={<PostDetail userID={loginUser.id}/>}/>
                <Route path="/newpost" element={<NewPost userID={loginUser.id}/>}/>
                <Route path="/edit/:id" element={<EditPost userID={loginUser.id}/>}/>
              </Routes>
            </>
        )
        }
      </div>
    </BrowserRouter>
  )
}

export default App