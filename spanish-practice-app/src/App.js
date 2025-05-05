import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Player from "./components/Player";
import Search from "./components/Search";

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  const [token, setToken] = useState(null);
  const [interval, setInterval] = useState(5); // Default 5 seconds

  useEffect(() => {
    // Get token from URL after Spotify OAuth redirect
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <AppContainer>
      {!token ? (
        <Login />
      ) : (
        <>
          <h1>Spanish Practice App</h1>
          <Search token={token} />
          <Player
            token={token}
            interval={interval}
          />
        </>
      )}
    </AppContainer>
  );
}

export default App;
