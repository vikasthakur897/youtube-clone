import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import { fetchApi } from "../utils/fetchApi";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchApi(`channels?part=snippet,brandingSettings&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchApi(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id]);

  // 🔹 Force high-resolution banner (fix blur)
  const bannerUrl =
    channelDetail?.brandingSettings?.image?.bannerExternalUrl
      ? `${channelDetail.brandingSettings.image.bannerExternalUrl}=w2560-fcrop64=1,32b42d5ffffcd6e`
      : "/defaultBanner.jpg"; // optional fallback

  return (
    <Box minHeight="95vh">
      {/* Channel Banner */}
      <Box
        sx={{
          backgroundImage: `url(${bannerUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "150px", sm: "220px", md: "300px" },
        }}
      />

      {/* Channel Info */}
      <ChannelCard channelDetail={channelDetail} marginTop="-93px" />

      {/* Channel Videos */}
      <Box display="flex" p={2}>
        <Box sx={{mr: {sm: '100px'}}} />
        <Videos video={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
