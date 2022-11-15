import { Box, ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'

function Gallery() {
  let [customWindowSize,setWindowSize] = React.useState('md')
  React.useEffect(()=>{
    setWindowSize(window.innerWidth > 600 ? 'md' : 'xs')
    window.addEventListener('resize',()=>{
      setWindowSize(window.innerWidth>600?'md':'xs')
    })
  },[])
  let galleryList = [
    {
      url: '/gallery/gallery1.jpg',
      title: 'Donation'
    },
    {
      url: '/gallery/gallery2.jpg',
      title: 'Donation'
    },
    {
      url: '/gallery/gallery5.jpg',
      title: 'Donation'
    },
    {
      url: '/gallery/gallery4.jpg',
      title: 'Donation'
    },
    {
      url: '/gallery/gallery3.jpg',
      title: 'Donation'
    },
    {
      url: '/gallery/gallery1.jpg',
      title: 'Donation'
    },
    {
      url: '/gallery/gallery1.jpg',
      title: 'Donation'
    },

    {
      url: '/gallery/gallery6.jpg',
      title: 'Donation'
    },
    {
      url: '/gallery/gallery1.jpg',
      title: 'Donation'
    },
  ]
  return (
    <Box>
      <Box sx={{ padding: '2em 1em' }}>
        <Typography variant='h3' color='gray' align='center' >Blood Donation Moments Gallery</Typography>
      </Box>
      <Box padding={2}>
        <ImageList 
        // cols={{xs:1,md:2,lg:3}}
        cols={customWindowSize=='md'?3:1} 
        variant='masonry'
        >
          {
            galleryList.map((gallery,index) => {
              return <ImageListItem key={index} sx={{
                transition:'all 0.3s linear',
                '&:hover':{
                  zIndex:'1000',
                  boxShadow:'0 0 1em black',
                  transform:'scale(1.2) rotatez(5deg)',
                }
              }} >
                <img src={gallery.url}></img>
              </ImageListItem>
            })
          }
        </ImageList>
      </Box>
    </Box>
  )
}

export default Gallery