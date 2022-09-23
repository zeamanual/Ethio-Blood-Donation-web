import { Alert, Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

function Summary({msg,btnName,path}) {
    let router = useRouter()
  return (
    <Box display={'flex'} flexDirection='column' alignItems={'center'}>
        <Alert severity='success'>{msg}</Alert>
        <Button onClick={()=>{router.push(path)}}>{btnName}</Button>
    </Box>
  )
}

export default Summary