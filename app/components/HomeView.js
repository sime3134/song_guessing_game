"use client";

import { MusicNote } from "@mui/icons-material";
import {
  Alert,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function HomeView({ trackList, firstLyrics }) {
  const [gameState, setGameState] = useState("off");
  const [currentLyrics, setCurrentLyrics] = useState(firstLyrics);
  const [titleInput, setTitleInput] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [scoreForCurrentSong, setScoreForCurrentSong] = useState(5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [numOfLyricsState, setNumOfLyricsState] = useState(1);
  const [error, setError] = useState("");

  const getLyricsForTrackId = async (id) => {
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=e897c43680faf0f22debd33edab6ae34&track_id=${id}`,
      {
        method: "GET",
      }
    );

    const lyrics = await response.json();
    return lyrics.message.body.lyrics.lyrics_body;
  };

  const getNewLyrics = async () => {
    const newLyrics = await getLyricsForTrackId(
      trackList[currentTrackIndex].track.track_id
    );
    setCurrentLyrics(newLyrics.split("\n"));
  };

  const checkAnswer = async () => {
    const trimmedTitleInput = titleInput.replace(/\s/g, "");
    const cleanedTitleInput = trimmedTitleInput.split("(")[0];

    if (cleanedTitleInput === "") {
      setError("Please enter a title");
      return;
    }

    const trackTitle = trackList[currentTrackIndex].track.track_name;
    const trimmedTrackTitle = trackTitle.replace(/\s/g, "");
    const cleanedTrackTitle = trimmedTrackTitle.split("(")[0];

    if (cleanedTitleInput.toLowerCase() === cleanedTrackTitle.toLowerCase()) {
      setTotalScore(totalScore + scoreForCurrentSong);
      setCurrentTrackIndex(currentTrackIndex + 1);
      setScoreForCurrentSong(5);
      setTitleInput("");

      const newLyrics = await getNewLyrics();
      setCurrentLyrics(newLyrics); //get new song and lyrics
      setNumOfLyricsState(1);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignContent="center"
    >
      <Box sx={{ maxWidth: { xs: "95%", sm: "50%" } }}>
        <Typography textAlign="center" variant="h2">
          Lyrics Game
        </Typography>
        <Alert icon={<MusicNote />}>
          Welcome to the amazing Lyrics Game! 🤕🤕 Take your lyrics knowledge to
          the next level!!! Sooo the game start by displaying some Lyrics! :3
          You have to correctly guess the song title by reading the lyrics! So
          gather your friends and Family and please have fun and remember that
          its just a game! 🤪 😍 🙏 😜 🥵 😘 🫡
        </Alert>

        <Typography mt={1} variant="body1">
          Current track: {currentTrackIndex + 1} / {trackList.length}
        </Typography>
        <Typography mt={1} variant="body1">
          Total score: {totalScore}
        </Typography>

        {gameState === "off" ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                setGameState("on");
              }}
              variant="contained"
              size="large"
              sx={{
                mt: 1,
              }}
            >
              Start Game
            </Button>
          </Box>
        ) : (
          <Box>
            <Box
              mt={2}
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
            >
              <TextField
                fullWidth={true}
                id="filled-basic"
                label="Your Guess"
                variant="filled"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
              <Box>
                <Button
                  sx={{ width: "fit-content", mt: 1, mr: 1 }}
                  variant="outlined"
                >
                  Skip
                </Button>
                <Button
                  onClick={checkAnswer}
                  sx={{ width: "fit-content", mt: 1 }}
                  variant="contained"
                >
                  Submit (+{scoreForCurrentSong} points)
                </Button>
              </Box>
            </Box>
            {/* Display lyrics here*/}
          </Box>
        )}
      </Box>
    </Box>
  );
}
