import { useEffect, useState } from "react"
import {getPosts} from '../api/postsAPI';
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const getPostData = async ()=>{
      try{
        const postData = await getPosts();
        setPosts(postData);
      } catch(error){
        console.log(error);
      }
    }
    getPostData();
  },[]);
  const formatDate = (dateString)=>{
    const date = new Date(dateString);
    const dateText = date.toLocaleDateString('ko-KR',{
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return dateText;
  }
  const style = {
    display : 'flex',
    listStyle:'none',
    gap: '1rem'
  }
  return (
    <div className="posts">
      <h2>자유게시판</h2>
      <ul>
        {
          posts.map((item)=>{
            return (
              <li key={item.id}>
                <Link to={`/post/${item.id}`} className="post-item" style={style}>
                  <p className="post-title">{item.title}</p>
                  <p className="post-nickname">{item.users.nickname}</p>
                  <p>{formatDate(item.update_at)}</p>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Posts