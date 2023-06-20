import { Box, Button, FormControl, FormErrorMessage, Input,Textarea } from '@chakra-ui/react'
import React,{useState} from 'react'
import { Spinner } from '@chakra-ui/react'

type CommmentFormProp ={
    loading: boolean,
    error: any,
    autoFocus?:boolean
    onSubmit:(message: string) => Promise<void>,
    initialValue?:string
}

const textAreaStyle ={
    resize: "none",
    outline: "none",
    width: "50%",
    height: "50%",
}

export const CommentForm = ({loading,error,autoFocus=false,onSubmit,initialValue=""}: CommmentFormProp) => {
    const [message,setMessage]= useState(initialValue);
    const handleSubmit=(e: React.FormEvent)=>{
        e.preventDefault();
        console.log("Button Clicked...");
        onSubmit(message).then(()=>setMessage(""));
    }   
  return (
    <form onSubmit={handleSubmit}>
         <FormControl m="0.7rem" w='50vw'>
        <Textarea display="block" autoFocus={autoFocus} sx={textAreaStyle} value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <Button type="submit" mt={2} disabled={loading}>{
            loading?<Spinner/>:"Post"
        }</Button>
        <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
    </form>
   
  )
}
