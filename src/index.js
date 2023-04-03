import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import albumService from "./services/albumService";
import songService from "./services/songService";
import "./styles/index.css";

let albums = albumService.getAllAlbums();
let songs = songService.getAllSongs();

if (albums.length === 0 && songs.length === 0) {
  albumService.seedAlbums();
  songService.seedSongs();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
