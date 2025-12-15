import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getPostById, getComments} from "../api/postsAPI";
const PostDetail = () => {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
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
  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <div className="post-info">
        <span>작성자 : {post.users.nickname}</span>
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  )
}

export default PostDetail