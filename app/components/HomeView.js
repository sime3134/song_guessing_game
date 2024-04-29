"use client";

import { Box, List, Typography } from "@mui/material";

export default function HomeView({ trackList, firstLyrics }) {
  return (
    <Box>
      <Typography variant="h1">LyriczGaim</Typography>
      <List>
        {trackList.map(({ track }) => (
          <Typography key={track.track_id}>{track.track_name}</Typography>
        ))}
      </List>
      <Typography variant="h2">Lyrics</Typography>

      <Typography variant="h3">{firstLyrics[0]}</Typography>
    </Box>
  );
}
