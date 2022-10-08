import { AccountCircleRounded } from '@mui/icons-material'
import { Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

function ReqestsHighLight() {
    let router = useRouter()
    console.log(new Date().toString())
    let requests = [
        { userName: "Zeamanua Feleke", bloodType: 'A+', address: ['Addis Ababa', 'Dire Dewa'], requestDate: new Date() },
        { userName: "Zeamanua Feleke", bloodType: 'A+', address: ['Addis Ababa', 'Dire Dewa'], requestDate: new Date() },
        { userName: "Zeamanua Feleke", bloodType: 'A+', address: ['Addis Ababa', 'Dire Dewa'], requestDate: new Date() }

    ]
    return (
        <>
            <Typography sx={{ padding: 3 }} variant="h4" color='gray' align='center'>Requests That Match With Your Blood Type and Location</Typography>
            <List >
                {requests.map(request => {
                    return <>
                        <ListItem >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <AccountCircleRounded fontSize='large'></AccountCircleRounded>
                                </ListItemAvatar>
                                <ListItemText primary={request.userName} secondary={request.requestDate.toString()}>

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