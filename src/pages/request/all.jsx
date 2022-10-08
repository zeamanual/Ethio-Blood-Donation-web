import { AccountCircleRounded } from '@mui/icons-material'
import { Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/layout'
import ReqestsHighLight from '../../components/requestHighLight'

function Reqests() {
  let router = useRouter()
  return (
    <Layout>
      All Reqests

      <Box boxShadow={5} borderRadius={2} mx={{ xs: 2, md: '10%' }} my={2} >
      <ReqestsHighLight></ReqestsHighLight>
      </Box>
    </Layout>
  )
}

export default Reqests