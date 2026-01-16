import React,{ useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import Videos from './Videos'
import { fetchApi } from '../utils/fetchApi'
const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchApi(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data?.items));
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant="h4" mb={2} ml={4} sx={{ color: 'white' }}>
        Search Results for : <span style={{ color: '#f80808', fontWeight: 'bold' }}>{searchTerm}</span>
      </Typography>
      <Videos video={videos} />
    </Box>
  )
}

export default SearchFeed
