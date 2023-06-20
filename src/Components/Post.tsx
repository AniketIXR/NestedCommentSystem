import React from 'react'
import {useRecoilValue,useRecoilState} from "recoil"
import { postState,rootCommentState } from '../atom/atomstate'
import { Box, Heading, Text,Flex } from '@chakra-ui/react';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
import { useAsyncFn } from '../hooks/useAsync';
import { createComment } from '../Services/comments';
import { CommentState } from '../atom/atomstate';
import { commentArrState } from '../atom/atomstate';

export const Post = () => {

    const post = useRecoilValue(postState);
    const rootComments = useRecoilValue(rootCommentState);
    const {loading,error,execute: createCommentFn}= useAsyncFn<CommentState>(createComment);
    const [comments, setComments] = useRecoilState<CommentState[]>(commentArrState);

    const onCreateComment = (message: string) => {
      return createCommentFn({ postId: post._id, message: message }).then((comment) => {
        setComments((oldComments) => [comment, ...oldComments]);
      });
    };

    console.log(post);

    const headinStyle={
        fontSize:'2rem',
        fontWeight:'bold',
        fontFamily:'sans-serif',
        color:'red',
        width:'20vw',
        margin:'10px',
        padding:'10px',
        border:'1px solid black',
        borderRadius:'5px',
        boxShadow:'0 0 5px rgba(0,0,0,0.3)',
        transition:'all 0.2s ease-in-out',
        ':hover':{
            transform:'scale(1.05)',
            boxShadow:'0 0 10px rgba(0,0,0,0.5)',
        }
    }

    const postStyle={
        bg:'#dce6e2',
        color:'black',
        margin:'10px',
        padding:'10px',
        border:'1px solid black',
        borderRadius:'5px',
        boxShadow:'0 0 5px rgba(0,0,0,0.3)',
    }

  return (
    <Box border="1px" m={2} px={2} py={1} h="100%">
        <Heading sx={headinStyle} >{post?.title}</Heading>
        <Box sx={postStyle}>
        <Text >{post?.body}</Text>

        </Box>
        
        <Heading as='h4' size='md' m="10px">Comments</Heading>
        <CommentForm loading={loading} error={error} onSubmit={onCreateComment}/>
          <Box>{rootComments != null && rootComments.length>0 && (
               <CommentList comments={rootComments}/>
            )}</Box>
    </Box>
  )
}
