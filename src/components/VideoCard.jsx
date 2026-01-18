import React from 'react'
import {Link} from 'react-router-dom'
import {Typography, Card, CardContent, CardMedia} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants'

const VideoCard = ({ video: { id, snippet } }) => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 360,
        boxShadow: 'none',
        borderRadius: '10px',
        border: 'none'
      }}
    >
      <Link to={id?.videoId ? `/video/${id.videoId}` : demoVideoUrl}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          title={snippet?.title}
          sx={{
            width: '100%',
            aspectRatio: '16 / 9',
          }}
        />
      </Link>

      <CardContent sx={{ backgroundColor: '#1e1e1e' }}>
        <Link to={id?.videoId ? `/video/${id.videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {snippet?.title?.slice(0, 60) || demoVideoTitle}
          </Typography>
        </Link>

        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}


export default VideoCard