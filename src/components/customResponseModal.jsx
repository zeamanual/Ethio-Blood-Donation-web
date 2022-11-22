import { Alert, Box, Button, Modal, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

function CustomResponseModal({open,path,msg,severity,btnName}) {
    let router = useRouter()
    return (
        <Modal open={open} onClose={() => { router.push(`${path}`) }} >
            <Box sx={{ position: 'absolute', top: {sm:'50%',xs:'40%'}, left: {sm:"50%",xs:'30%'}, transform: {sm:'translate(-50%, -50%)',xs:'translate(-20%, -20%)'}, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack sx={{ padding: {md:5,xs:2}, backgroundColor: 'white', borderRadius: 1 }} direction={'column'} gap={1}>
                    <Alert severity={severity} >{msg} </Alert>
                    <Box sx={{ display: 'flex', justifyContent: "center" }}>
                        <Button variant='contained' onClick={() => { router.push(`${path}`) }} >{btnName}</Button>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    )
}

export default CustomResponseModal