import { AccountCircleRounded } from '@mui/icons-material'
import { Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Pagination, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

function ReqestsHighLight({ requests,pageChangeHandler,totalPageItems }) {
    let router = useRouter()

    return (
        <>
            <List >
                {requests.map((request,index) => {
                    return <>
                        <ListItem key={index}>
                            <ListItemButton onClick={() => router.push({ pathname: '/request', query: { reqId: request._id } })}>
                                <ListItemAvatar>
                                    <AccountCircleRounded fontSize='large'></AccountCircleRounded>
                                </ListItemAvatar>
                                <ListItemText primary={request.userRef.userName} secondary={request.date.toString()}>

                                </ListItemText>
                                <Stack direction={'column'} justifyContent='center'>
                                    <Typography align='right' variant='h6'>{request.bloodType}</Typography>
                                    <Typography variant='subtitle1' color='gray'> {request.address.map(address => ` ${address},`)}</Typography>

                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    </>
                })}
                <Box display={'flex'} justifyContent='center'>
                    <Pagination defaultPage={1} onChange={pageChangeHandler} size='large' variant='text' color='primary' count={Math.ceil( totalPageItems/10)}></Pagination>
                </Box>
            </List>
        </>
    )
}

export default ReqestsHighLight