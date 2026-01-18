import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { fetchApi } from "../utils/fetchApi";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchApi(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setVideos(data.items || [])
    );
  }, [selectedCategory]);

  return (
    <>
      <Stack direction={{ xs: "column", md: "row" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", md: "240px" },
            borderRight: { md: "1px solid rgb(61, 61, 61)" },
            px: { xs: 0, md: 2 },
            position: { md: "fixed" },
            height: { md: "100vh" }, 
            top: 0,
            left: 0,
            backgroundColor: "black",
            zIndex: 1000,
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>

        {/* Main content */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "1600px" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={4}
              sx={{ color: "white" }}
            >
              {selectedCategory} videos
            </Typography>

            <Videos video={videos} />
          </Box>
        </Box>
      </Stack>

      {/* Footer */}
      <Typography
        variant="body2"
        sx={{
          color: "#fff",
          textAlign: "center",
          py: 2,
          fontSize: 15,
        }}
      >
        © Copyright 2026 YouTube Clone
      </Typography>
    </>
  );
};

export default Feed;
