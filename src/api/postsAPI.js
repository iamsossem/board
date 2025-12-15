import { supabase } from "./supabaseClient";

/**
 * 전체 게시글 가져오기
 * 타이틀, 작성자, 작성일
 */
export const getPosts = async ()=>{
  const {data,error} = await supabase
    .from('posts')
    .select('*,users(nickname)')
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