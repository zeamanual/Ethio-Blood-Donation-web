import { AccountCircleRounded } from '@mui/icons-material'
import { Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

function ReqestsHighLight({requests}) {
    let router = useRouter()

    return (
        <>
            <List >
                {requests.map(request => {
                    return <>
                        <ListItem >
                            <ListItemButton onClick={()=>router.push({pathname:'/request',query:{reqId:request._id}})}>
                                <ListItemAvatar>
                                    <AccountCircleRounded fontSize='large'></AccountCircleRounded>
                                </ListItemAvatar>
                                <ListItemText primary={request.userRef.userName} secondary={request.date.toString()}>

                                </ListItemText>
                                <Stack direction={'column'} justifyContent='center'>
                                    <Typography align='right' variant='h6'>{request.bloodType}</Typography>
                                    <Typography variant='subtitle1' color='gray'> { request.address.map(address=>` ${address},`)}</Typography>

                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    </>
                })}
            </List>
        </>
    )
}

export default ReqestsHighLight