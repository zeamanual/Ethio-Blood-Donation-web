import { TextField } from '@mui/material'
import React from 'react'

const StyledTextField = (props) => {
  return (
    <TextField
    {...props}
    sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'secondary.main' } }}
    >
    </TextField>
  )
}

export default StyledTextField