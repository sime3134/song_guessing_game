import { Box, Typography, Paper, Button } from "@mui/material";

export default function Lyrics({
  lyrics,
  addLyrics,
  numOfLyricsState,
  loading,
}) {
  return (
    <Box mt={2} minWidth="100%">
      <Typography variant="h3" textAlign="center" gutterBottom>
        Lyrics
      </Typography>

      {Array.from({ length: numOfLyricsState }, (_, index) => (
        <Paper
          key={index}
          sx={{
            mt: 1,
            mb: index !== 4 ? 1 : 2,
            backgroundColor: "#CCCCCC",
            minWidth: "100%",
          }}
        >
          <Typography textAlign="center" sx={{ padding: "10px", fontSize: 20 }}>
            {lyrics[index]}
          </Typography>
        </Paper>
      ))}

      <Box display="flex" justifyContent="center" alignItems="center">
        {numOfLyricsState < 5 && (
          <Button onClick={addLyrics} variant="text">
            Show new row (Minus 1 point)
          </Button>
        )}
      </Box>
    </Box>
  );
}
