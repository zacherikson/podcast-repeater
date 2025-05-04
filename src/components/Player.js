import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PlayerContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

function Player({ token, interval }) {
  const [player, setPlayer] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spanish Practice Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setPlayer(player);
      });

      player.addListener("player_state_changed", (state) => {
        if (state) {
          setCurrentTrack(state.track_window.current_track);
          setIsPaused(state.paused);
        }
      });

      player.connect();
    };
  }, [token]);

  const togglePlay = () => {
    if (player) {
      player.togglePlay();

      if (isPaused) {
        // Start the interval timer when playing
        const newTimer = setInterval(() => {
          player.pause();
          setTimeout(() => {
            player.resume();
          }, interval * 1000);
        }, interval * 2000); // Double the interval to account for pause time
        setTimer(newTimer);
      } else {
        // Clear the timer when pausing
        if (timer) {
          clearInterval(timer);
          setTimer(null);
        }
      }
    }
  };

  return (
    <PlayerContainer>
      <h2>Now Playing</h2>
      {currentTrack && (
        <div>
          <p>
            {currentTrack.name} - {currentTrack.artists[0].name}
          </p>
        </div>
      )}
      <Controls>
        <button onClick={togglePlay}>{isPaused ? "Play" : "Pause"}</button>
      </Controls>
    </PlayerContainer>
  );
}

export default Player;
