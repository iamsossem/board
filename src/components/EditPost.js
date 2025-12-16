import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {getPostById, updatePost} from "../api/postsAPI"

const EditPost = ({userID}) => {
  const {id} = useParams();  //url에서 글 번호를 가져오기
  const [title,setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async ()=>{
      const data = await getPostById(id);  //수정할 게시글 가져오기
      setTitle(data.title);
      setContent(data.content);
    }
    fetchData();
  },[id]);
  const handleUpdate = async ()=>{
    //api에 있는 update 함수
    try{
      const data = updatePost({id,title,content});
      if( data ) {
        alert('수정이 완료되었습니다');
        navigate(`/post/${id}`);  //postDetail page 로 이동
      }
    } catch(error){
      console.log(error);
    }
  }
  return (
    <div className="new-post">
      <h3>게시글 수정</h3>
      <div>
        <input 
          type="text"
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
        />
        <textarea 
          value={content}
          onChange={(e)=>{setContent(e.target.value)}}
        />
        <div className="btn-wrap">
          <button onClick={handleUpdate}>수정완료</button>
          <button onClick={()=>{navigate(-1)}}>수정취소</button>
        </div>
      </div>
    </div>
  )
}

export default EditPost