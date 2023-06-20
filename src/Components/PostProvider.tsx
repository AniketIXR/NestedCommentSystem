import React,{useEffect,useMemo,useState} from 'react'
import { useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getPost } from '../Services/posts';
import { PostState,postState } from '../atom/atomstate';
import {useRecoilState,useSetRecoilState} from "recoil";
import {CommentState,commentsByParentIdState,rootCommentState,commentArrState} from '../atom/atomstate';

type PostProviderProps = {
    children: React.ReactNode;
}
interface MyObject {
    [key: string]: CommentState[];
  }
  
export const PostProvider = ({children}: PostProviderProps) => {

    const {id} =useParams();
    const {loading,error,value: post}=useAsync<PostState>(()=>getPost(id!?.toString()),[id]);
    const [postValue,setPostValue] = useRecoilState<PostState>(postState);  
   const setCommentsByParentId = useSetRecoilState(commentsByParentIdState);
   const setRootComment = useSetRecoilState(rootCommentState);

   //we will make a state comment so that when the a new comment is created the
   // the page will atomatically rerender
   //** we have made it seperately as when the comment is created , the post will not 
   //** change as the post only contains the comment id and not the comments itself
   //** so we will have to make a seperate state for the comments
  
    const [comments,setCommment] = useRecoilState<CommentState[]>(commentArrState);

    //this function helps to build the nested structure of the comment section
    const commentsByParentId = useMemo(
        ()=>{

            if(comments == null) return {};
            const group: MyObject = {};
            
            console.log(comments);

            comments.forEach((comment: CommentState) => {
                const parent = comment.parent ?? "root"; 
                if (!group[parent]) {
                  group[parent] = []; // Initialize the array if it doesn't exist
                }
                group[parent].push(comment);
              });

            return group;
        }
        ,[comments]);

    useEffect(()=>{
      if(post?.comments == null) return
        setCommment(post?.comments);
    },[post?.comments]);

    useEffect(() => {
            setCommentsByParentId(commentsByParentId);
            setRootComment(commentsByParentId["root"]);
    }, [commentsByParentId]);

    useEffect(() => {
        setPostValue(post!);
    }, [post]);


  return (
    <div>{loading?
    <div>Loading...</div>:error?
    <div>Error: {error.message}</div>:children
    }</div>
  )
}
