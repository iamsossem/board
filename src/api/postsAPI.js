import { supabase } from "./supabaseClient";

/**
 * 전체 게시글 가져오기
 * 타이틀, 작성자, 작성일
 */
export const getPosts = async ()=>{
  const {data,error} = await supabase
    .from('posts')
    .select('*')
}
