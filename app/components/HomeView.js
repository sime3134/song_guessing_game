"use client";

import { MusicNote } from "@mui/icons-material";
import {
  Alert,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import Lyrics from "./Lyrics";
import getLyricsForTrackId from "../actions";

export default function HomeView({ trackList, firstLyrics }) {
  const [gameState, setGameState] = useState("off");
  const [currentLyrics, setCurrentLyrics] = useState(firstLyrics);
  const [titleInput, setTitleInput] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [scoreForCurrentSong, setScoreForCurrentSong] = useState(5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [numOfLyricsState, setNumOfLyricsState] = useState(1);
  const [error, setError] = useState();
  const [displayInstructions, setDisplayInstructions] = useState(false);

  const addLyrics = () => {
    if (numOfLyricsState < 5) {
      setNumOfLyricsState(numOfLyricsState + 1);
      setScoreForCurrentSong(scoreForCurrentSong - 1);
    }
  };

  const setNewLyrics = async () => {
    const newLyrics = await getLyricsForTrackId(
      trackList[currentTrackIndex + 1].track.track_id
    );
    setCurrentLyrics(newLyrics.split("\n"));
  };

  const checkAnswer = async () => {
    const trimmedTitleInput = titleInput.replace(/\s/g, "");
    const cleanedTitleInput = trimmedTitleInput.split("(")[0];

    if (cleanedTitleInput === "") {
      setError("Please enter a song title");
      return;
    }
    setError("");

    const trackTitle = trackList[currentTrackIndex].track.track_name;
    const trimmedTrackTitle = trackTitle.replace(/\s/g, "");
    const cleanedTrackTitle = trimmedTrackTitle.split("(")[0];

    if (cleanedTitleInput.toLowerCase() === cleanedTrackTitle.toLowerCase()) {
      setTotalScore(totalScore + scoreForCurrentSong);
      setCurrentTrackIndex(currentTrackIndex + 1);
      setScoreForCurrentSong(5);
      setTitleInput("");

      await setNewLyrics();
      setNumOfLyricsState(1);
    }
  };

  const skipSong = async () => {
    if (currentTrackIndex === trackList.length - 1) {
      if (window) {
        window.location.reload();
      }
    } else {
      setError(null);
      setCurrentTrackIndex(currentTrackIndex + 1);
      setScoreForCurrentSong(5);
      setTitleInput("");

      await setNewLyrics();
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
      <Box
        sx={{
          maxWidth: { xs: "95%", sm: "40%" },
          minWidth: { xs: "95%", sm: "40%" },
        }}
      >
        <Typography textAlign="center" variant="h2" mb={2} mt={2}>
          Guess the Song
        </Typography>
        {gameState === "on" && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="text"
              onClick={() => setDisplayInstructions(!displayInstructions)}
            >
              {displayInstructions ? "Hide Instructions" : "Show Instructions"}
            </Button>
          </Box>
        )}
        {(gameState === "off" || displayInstructions) && (
          <Alert icon={<MusicNote />} sx={{ mb: 2, fontSize: "10px" }}>
            How to Play:{" "}
            <List component="nav" aria-label="game instructions">
              <ListItem>
                <ListItemText primary="1. Start the Game: Click 'Start Game' to display the first set of lyrics from a song." />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. Guess the Song: Enter your guess for the song title based on the lyrics shown in the text field." />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. Submit Your Answer: Hit 'Submit' to check if your guess is correct. You only get one chance to guess each song correctly. Earn up to 5 points for a correct answer." />
              </ListItem>
              <ListItem>
                <ListItemText primary="4. Need a Hint? Click 'Add More Lyrics' to reveal additional lyrics. Each hint reduces the potential score by 1 point, down to a minimum of 1 point." />
              </ListItem>
              <ListItem>
                <ListItemText primary="5. Skip: If you decide not to guess, click 'Skip' to move to the next song without earning points." />
              </ListItem>
            </List>
          </Alert>
        )}

        {gameState === "on" && (
          <Alert icon={false} severity="info">
            <Typography mt={1} variant="body1">
              Current track: {currentTrackIndex + 1} / {trackList.length}
            </Typography>
            <Typography mt={1} variant="body1">
              Total score: {totalScore}
            </Typography>
          </Alert>
        )}

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
                mb: 2,
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
                error={Boolean(error)}
                helperText={error}
              />
              <Box>
                <Button
                  onClick={skipSong}
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
            <Lyrics
              lyrics={currentLyrics.filter((lyric) => lyric !== "")}
              numOfLyricsState={numOfLyricsState}
              addLyrics={addLyrics}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
