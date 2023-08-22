import { AccountCircleRounded } from '@mui/icons-material'
import { Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Pagination, Stack, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import moment from 'moment'

function ReqestsHighLight({ requests,pageChangeHandler,totalPageItems,requestClickHandler }) {
    let router = useRouter()
    let theme = useTheme()

    return (
        <Box>
            <List  >
                {requests.map((request,index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemButton onClick={() => {requestClickHandler(request)}}>
                                <ListItemAvatar>
                                    <AccountCircleRounded sx={{color:theme.palette.secondary.main}} fontSize='large'></AccountCircleRounded>
                                </ListItemAvatar>
                                <ListItemText  sx={{color:theme.palette.secondary.main}} primary={request.userRef.userName} secondary={moment(request.date.toString()).fromNow()}>
                                    
                                </ListItemText>
                                <Stack sx={{padding:'0em'}} direction={'column'} justifyContent='center'>
                                    <Typography align='right' variant='h6'>{request.bloodType}</Typography>
                                    <Typography sx={{display:{xs:'none',sm:'block'}}} variant='subtitle1' color='gray'> {request.address.map(address => ` ${address},`)}</Typography>
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
                <Box display={'flex'} justifyContent='center'>
                    <Pagination defaultPage={1} onChange={pageChangeHandler} size='large' variant='text' color='primary' count={Math.ceil( totalPageItems/10)}></Pagination>
                </Box>
            </List>
        </Box>
    )
}

export default ReqestsHighLight