import { supabase } from "./supabaseClient";

/**
 * 전체 게시글 가져오기
 * 타이틀, 작성자, 작성일
 */
export const getPosts = async ()=>{
  const {data,error} = await supabase
    .from('posts')
    .select('*,users(nickname)')
    .eq('is_active',true)
    .order('create_at');
  if( error ){
    throw new Error('게시글 가져오기 오류');
  }
  return data;
}

export const getPostById = async (id)=>{
  // posts : 상세내용
  const {data,error} = await supabase
    .from('posts')
    .select(`*, users(nickname)`)
    .eq('id',id)
    .single();
  if( error ){
    throw new Error('id별 게시글 가져오기 오류');
  }
  return data;
} 

// 게시글에 작성된 댓글 가져오기
export const getComments = async (postID)=>{
  const {data,error} = await supabase
    .from('comments')
    .select('*, users(nickname)')
    .eq('post_id', postID)
    .order('create_at',{ascending:false});
  if( error ){
    throw new Error('comments 데이터 가져오기 오류');
  }
  return data;
}
// 새 글 작성
export const createPost = async ({title,content,userID})=>{
  const {data,error} = await supabase
    .from('posts')
    .insert([{
      title:title,
      content: content,
      user_id: userID
    }])
    .select();
    if( error ){
      throw new Error('새글 작성 시 insert에러');
    }
    return data;
}
// 게시글 수정 : 타이틀, 컨텐츠, update_at
export const updatePost = async ({id,title,content})=>{  
  const { data, error } = await supabase
    .from('posts')
    .update({ title:title, content:content, update_at: new Date() })
    .eq('id', id)
    .select();
  if( error ){
    throw new Error('게시글 업데이트 오류');
  }
  return data;
}

//
export const deletePost = async ({id})=>{
  //게시글
  const { data, error } = await supabase
    .from('posts')
    .update({ is_active:false })
    .eq('id', id)
    .select();
  //댓글
  const { comment, commentError} = await supabase
    .from('comments')
    .update({is_active:false})
    .eq('post_id',id)
    .select();
  if( error || commentError ){
    throw new Error('게시글 업데이트 오류');
  }
  return data;
}
