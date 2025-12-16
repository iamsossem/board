import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, getComments, deletePost} from "../api/postsAPI";
const PostDetail = ({userID}) => {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        //게시글을 불러온다.
        const postData = await getPostById(id);
        setPost(postData);
        const commentData = await getComments(id);
        setComments(commentData);
      } catch (error ){
        console.error(error);
      }
    }
    fetchData();  // 실행
  },[id]);  
  if( !post ){
    return;
  }
  const handleUpdate = ()=>{
    navigate(`/edit/${id}`);
  }
  const handleDelete = async ()=>{
    try{
      const data = await deletePost({id});
      if(data){
        alert('삭제되었습니다');
        navigate('/');
      }
    } catch(error){
      console.log(error);
    }
  }
  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <div className="post-info">
        <span>작성자 : {post.users.nickname}</span>
      </div>
      <p className="post-content">{post.content}</p>

      {/* 로그인한 사용자가 작성자와 같다면 수정/삭제 */}
      {
        (userID === post.user_id) && (
          <div className="btn-wrap">
            <button onClick={handleDelete}>삭제</button>
            <button onClick={handleUpdate}>수정</button>
          </div>
        )
      }
      <h3>댓글</h3>
      {
        comments.length > 0 && (
          <ul>
            {
              comments.map((item)=>{
                return (
                  <li key={item.id}>
                    <p>{item.content}</p>
                    <p>{item.users.nickname}</p>
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  )
}

export default PostDetail