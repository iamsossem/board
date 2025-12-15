import { useState } from "react"
import UserLogin from "./components/UserLogin";
import Posts from "./components/Posts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetail from "./components/PostDetail";

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
          loginUser ? 
            <p>{loginUser.nickname}님 환영합니다</p> :
            <UserLogin onUser={handleUserInfo}/>
        }
        <Routes>
          {/* 목록페이지 */}
          <Route path="/" element={<Posts />} />     
          {/* 상세 페이지  */}
          <Route path="/post/:id" element={<PostDetail />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App