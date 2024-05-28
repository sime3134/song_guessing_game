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
  Snackbar,
} from "@mui/material";
import { useState, useEffect } from "react";
import Lyrics from "./Lyrics";
import getLyricsForTrackId from "../actions";

export default function HomeView({ trackList, firstLyrics, currentPage }) {
  const [gameState, setGameState] = useState("off");
  const [currentLyrics, setCurrentLyrics] = useState(firstLyrics);
  const [titleInput, setTitleInput] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [scoreForCurrentSong, setScoreForCurrentSong] = useState(5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [numOfLyricsState, setNumOfLyricsState] = useState(1);
  const [error, setError] = useState();
  const [displayInstructions, setDisplayInstructions] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

    const trackTitle = trackList[currentTrackIndex].track.track_name;
    const cleanedTrackTitle = trackTitle.split("(")[0];
    const trimmedTrackTitle = cleanedTrackTitle.replace(/\s/g, "");

    if (cleanedTitleInput.toLowerCase() === trimmedTrackTitle.toLowerCase()) {
      setTotalScore(totalScore + scoreForCurrentSong);
      setSnackbarMessage(`Correct!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      await nextSong();
    } else {
      setSnackbarMessage(
        `Sorry, incorrect! The song was "${cleanedTrackTitle}".`
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      await nextSong();
    }
  };

  const nextSong = async () => {
    if (currentTrackIndex === trackList.length - 1) {
      if (window) {
        alert("The game has ended. Your score is: " + totalScore);
        if (currentPage < 8) {
          document.cookie = `page=${currentPage + 1}; path=/;`;
        } else {
          document.cookie = `page=1; path=/;`;
        }
        if (localStorage.getItem("highScore")) {
          let currentHighScore = parseInt(localStorage.getItem("highScore"));
          if (currentHighScore < totalScore) {
            localStorage.setItem("highScore", totalScore.toString());
          }
        } else {
          localStorage.setItem("highScore", totalScore.toString());
        }
        window.location.reload();
      }
    } else {
      setError(null);
      setCurrentTrackIndex(currentTrackIndex + 1);
      setScoreForCurrentSong(5);
      setTitleInput("");
      console.log(
        "currentTrackTitle: ",
        trackList[currentTrackIndex].track.track_name
      );

      await setNewLyrics();
      setNumOfLyricsState(1);
    }
  };

  useEffect(() => {
    console.log(
      "currentTrackTitle: ",
      trackList[currentTrackIndex].track.track_name
    );
  }, [currentTrackIndex, trackList]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignContent="center"
      >
        <Box
          sx={{
            maxWidth: { xs: "95%", md: "70%", lg: "40%" },
            minWidth: { xs: "95%", md: "70%", lg: "40%" },
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
                {displayInstructions
                  ? "Hide Instructions"
                  : "Show Instructions"}
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
                Current score: {totalScore} / 50
              </Typography>
              <Typography mt={1} variant="body1">
                Highscore:{" "}
                {localStorage.getItem("highScore")
                  ? localStorage.getItem("highScore")
                  : 0}{" "}
                / 50
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
                component="form"
                action={checkAnswer}
              >
                <TextField
                  fullWidth={true}
                  id="guess-input"
                  label="Your guess"
                  variant="filled"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  error={Boolean(error)}
                  helperText={error}
                />
                <Box>
                  <Button
                    onClick={nextSong}
                    sx={{ width: "fit-content", mt: 1, mr: 1 }}
                    variant="outlined"
                  >
                    Skip (0 points)
                  </Button>
                  <Button
                    sx={{ width: "fit-content", mt: 1 }}
                    variant="contained"
                    type="submit"
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
