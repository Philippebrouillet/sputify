import React, { useEffect, useState } from "react";
import songService from "../services/songService";

export default function Home() {
  const [songS, setSongs] = useState([]);

  useEffect(() => {
    function refreshSongs() {
      setSongs(songService.getAllSongs());
    }
    refreshSongs();
  }, []);
  console.log(songS);
  return (
    <div>
      <h1>Bienvenue sur Sputify</h1>

      <ul>
        {songS.map((song, i) => (
          <li>
            <h2>{song.name}</h2>
            <p>
              {Math.floor(song.durationSeconds / 60) +
                "." +
                (song.durationSeconds % 60) +
                "min"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
