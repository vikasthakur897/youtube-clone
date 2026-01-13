import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const VideoCard = ({ videos }) => {
  const {
    id: { videoId },
    snippet: {
      title,
      channelTitle,
      thumbnails,
    },
  } = videos

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 260, md: 300 },
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail */}
      <Link to={`/video/${videoId}`} style={{ textDecoration: 'none' }}>
        <Box
          component="img"
          src={thumbnails.medium.url}
          alt={title}
          sx={{
            width: '100%',
            height: 170,
            borderRadius: '12px',
            objectFit: 'cover',
            mb: 1,
          }}
        />
      </Link>

      {/* Info */}
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="white"
          sx={{
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="subtitle2"
          color="gray"
          mt={0.5}
        >
          {channelTitle}
        </Typography>
      </Box>
    </Box>
  )
}

export default VideoCard
