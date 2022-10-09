import { Box } from '@mui/material'
import React from 'react'

function CustomPaperCard({children}) {
  return (
    <Box
    borderRadius={3}
    boxShadow={5}
    mx={{xs:4,md:8,lg:10}}
    my={3}
    p={{xs:3,md:6}}
    >{children}</Box>
  )
}

export default CustomPaperCard