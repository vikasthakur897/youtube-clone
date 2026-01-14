
import { Box, Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Videos from './Videos'
import  {fetchApi}  from '../utils/fetchApi'





const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])
  useEffect(() => {
    fetchApi(`search?part=snippet&q=${selectedCategory}`).then((data) => setVideos(data.items))
  }, [selectedCategory])
  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box sx={{ height: { sx: 'auto', md: '92vh' }, borderRight: '1px solid rgb(61, 61, 61)', px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: '#fff' }}>
          Copyright 2024 YouTube Clone
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: 'white' }}>
         {selectedCategory} <span style={{ color: 'white' }}>videos</span>
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={10}>
        
        <Videos  video={videos} />
    
      </Stack>

      </Box>
    </Stack>
  )
}

export default Feed
