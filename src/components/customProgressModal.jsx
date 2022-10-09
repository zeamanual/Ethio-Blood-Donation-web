import { Alert, Backdrop, CircularProgress, Stack } from '@mui/material'
import React from 'react'

function CustomProgressModal({ message,open }) {
    return (
        <>
            <Backdrop sx={{ zIndex: 1000 }} open={open}>
                <Stack direction={'column'} justifyContent='center' gap={2} p={3} borderRadius={2}  alignItems={'center'} bgcolor={'white'}>
                    <Alert severity='info'>{message}</Alert>
                    <CircularProgress></CircularProgress>
                </Stack>
            </Backdrop>
        </>
    )
}

export default CustomProgressModal