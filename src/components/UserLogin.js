import {loginUser} from '../api/usersAPI';
import { useState } from 'react';
const UserLogin = ({onUser}) => {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleLogin = async ()=>{    
    try{
      //API 호출
      const userData = await loginUser({email,password});
      //성공 시
      onUser(userData);
    } catch(error){
      alert(error.message);
    }
  }
  return (
    <div className="user-login">
      {/* input을 이용해서 사용자로부터 email,password 입력받기 */}
      <input
        type="email" 
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
      />
      <input 
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

export default UserLogin