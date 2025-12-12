import {loginUser} from '../api/usersAPI';
const UserLogin = ({onUser}) => {
  const handleLogin = async ()=>{
    const email = 'chulsu@test.com';
    const password = '1234';
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
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

export default UserLogin