import { useState } from "react"
import UserLogin from "./components/UserLogin";
import Posts from "./components/Posts";

const App = () => {
  const [loginUser,setLoginUser] = useState(null);
  const handleUserInfo = (user)=>{
    setLoginUser(user);
  }
  return (
    <div id="app">
      {
        loginUser ? 
          <p>{loginUser.nickname}님 환영합니다</p> :
          <UserLogin onUser={handleUserInfo}/>
      }
      <Posts />
    </div>
  )
}

export default App