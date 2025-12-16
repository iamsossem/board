import { useState } from "react"
import {createPost} from "../api/postsAPI"
import { useNavigate } from "react-router-dom";

const NewPost = ({userID}) => {
  //  작성자 : userID
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const navigate = useNavigate();  //페이지 이동 훅
  const handleSubmit = async ()=>{
    //값이 다 입력이 되었다는 가정
    try{
      // API호출
      const data = await createPost({title,content,userID});
      if( data ){
        alert('게시글이 등록되었습니다.');
        navigate("/");  //메인 목록 페이지로 이동.
      }
    }catch(error){
      console.log( error );
    }
  }
  return (
    <div className="new-post">
      <input 
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
      />
      <textarea 
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e)=>{setContent(e.target.value)}}
      />
      <button onClick={handleSubmit}>등록하기</button>
    </div>
  )
}

export default NewPost