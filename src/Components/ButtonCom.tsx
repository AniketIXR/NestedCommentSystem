import { Button } from "@chakra-ui/react"
import React from 'react'

type LinkProp = {
  children: React.ReactNode;
};

const buttonStyle={
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '3px',
  padding: '5px',
  margin: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
};

export const ButtonCom:React.FC<LinkProp> = (prop: LinkProp) => {
  return (
    <Button sx={buttonStyle}>{prop.children}</Button>
  )
}
