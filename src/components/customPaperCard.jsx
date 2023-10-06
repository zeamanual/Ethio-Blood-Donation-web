import { Box } from '@mui/material'
import React from 'react'

function CustomPaperCard({children}) {
  return (
    <Box
    borderRadius={3}
    boxShadow={5}
    display={'flex'} 
    justifyContent='center' 
    alignItems={'center'}
    mx={{xs:4,md:8,lg:10}}
    mt={14}
    p={{xs:3,md:6}}
    sx={{minHeight:'80vh',widht:'100%'}}
    >{children}</Box>
  )
}

export default CustomPaperCard