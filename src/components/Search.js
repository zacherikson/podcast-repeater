import React, { useState } from "react";
import styled from "styled-components";
import SpotifyWebApi from "spotify-web-api-js";

const SearchContainer = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  margin-right: 10px;
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ResultCard = styled.div`
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
`;

function Search({ token }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const spotify = new SpotifyWebApi();

  spotify.setAccessToken(token);

  const handleSearch = async () => {
    try {
      const results = await spotify.search(
        searchQuery,
        ["track", "show", "episode"],
        { limit: 20 }
      );
      setSearchResults([
        ...results.tracks.items,
        ...results.shows.items,
        ...results.episodes.items,
      ]);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for songs, podcasts, or audiobooks..."
      />
      <button onClick={handleSearch}>Search</button>

      <ResultsContainer>
        {searchResults.map((item) => (
          <ResultCard key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.type}</p>
          </ResultCard>
        ))}
      </ResultsContainer>
    </SearchContainer>
  );
}

export default Search;
