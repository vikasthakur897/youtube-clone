import { Stack, Box } from '@mui/material'
import React from 'react'
import ChannelCard from './ChannelCard'
import VideoCard from './VideoCard'

const Videos = ({ video = [] }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        px: 2,
        minHeight: '100vh',
      }}
    >
      <Stack
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        {video.map((item, idx) => (
          <Box key={idx}>
            {item?.id?.videoId && <VideoCard video={item} />}
            {item?.id?.channelId && (
              <ChannelCard channelDetail={item} />
            )}
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}



export default Videos
