import {makeRequest} from "./makeRequest";

type CommentProp = {
    postId: string,
    message: string, 
    parent?: string
}

type UpdateCommentProp = {
    postId: string,
    message: string, 
    id: string
}

export const createComment = ({postId, message, parent}: CommentProp) => {
    console.log(`createComment: ${postId}, ${message}, ${parent}`);
    return makeRequest(`/posts/${postId}/comments`, {
        method: "POST",
        data: {
            message,
            parent
        }
    });
}

export const updateComment =({postId,message,id}: UpdateCommentProp)=>{
    console.log(`updateComment: ${postId}, ${message}, ${id}`);
     return makeRequest(`/posts/${postId}/comments/${id}`,{
            method:"PUT",
            data:{
                message
            }
     });
}