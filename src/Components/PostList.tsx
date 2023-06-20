import { useEffect,useState } from 'react'
import { getPosts } from '../Services/posts';
import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ButtonCom } from './ButtonCom';
import { useAsync } from '../hooks/useAsync';

interface Post {
  _id: string;
  title: string;
}

export const PostList = () => {

    const {loading ,error,value: posts}= useAsync<Post[]>(getPosts);

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={2} m={2}>
      <GridItem colSpan={2} border='1px'>ss</GridItem>
      <GridItem colSpan={3} border='1px'>
      {
      posts?.map((post: Post)=>(
        <Flex key={post._id} 
        border='1px' 
        flexDirection='column' 
        alignItems='center' 
        justifyContent='center'
        gap={1} m={2}>
        <ButtonCom>
        <Link to={`/post/${post._id}`}>{post.title}</Link>
        </ButtonCom>
       </Flex>
    )
    )
      }
       </GridItem>
       <GridItem colSpan={2} border='1px'>ss</GridItem>
    </Grid>
   
  )
}
