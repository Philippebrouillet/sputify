import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AlbumCard from "../components/AlbumCard";
import UpdateAlbumModal from "../components/UpdateAlbumModal";
import songService from "../services/songService";
import CreateAlbumModal from "./../components/CreateAlbumModal";
import albumService from "./../services/albumService";
import "./../styles/Albums.css";

export default function Albums() {
  const [songS, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isModalUdapteShown, setIsModalUpdateShown] = useState(false);
  const [newAlbumSongs, setNewAlbumSongs] = useState([]);
  const [error, setError] = useState([]);
  const [albumIdToUdapte, setAlbumIdToUpdate] = useState("");
  console.log(albumIdToUdapte);
  useEffect(() => {
    refreshAlbums();

    function refreshSongs() {
      setSongs(songService.getAllSongs());
      function newEditSong() {
        for (let i = 0; i < newAlbumSongs.length; i++) {
          let editedSong = Object.assign({}, newAlbumSongs[i]);
          songService.editSong(editedSong);
        }
      }
      newEditSong();
    }
    refreshSongs();
  }, [newAlbumSongs]);

  function refreshAlbums() {
    setAlbums(albumService.getAllAlbums());
  }

  function addNewAlbum(newAlbum) {
    albumService.insertAlbum(newAlbum);

    setNewAlbumSongs((prev) =>
      prev.map((previous) => ({ ...previous, fkAlbumId: newAlbum.id }))
    );

    setIsModalShown(false);
  }
  function updateAlbum(album) {
    albumService.editAlbum(album[0]);

    setNewAlbumSongs((prev) =>
      prev.map((previous) => ({ ...previous, fkAlbumId: album[0].id }))
    );

    setIsModalUpdateShown(false);
  }
  /* eslint-disable no-restricted-globals */
  function reMoveAlbum(album) {
    let dialog = confirm("Etes vous sur de vouloir supprimer l'album?");
    if (dialog) {
      albumService.deleteAlbum(album);
      refreshAlbums();
    } else {
    }
  }
  return (
    <>
      <CreateAlbumModal
        newAlbumSongs={newAlbumSongs}
        songS={songS}
        setNewAlbumSongs={setNewAlbumSongs}
        isShown={isModalShown}
        handleClose={() => {
          setIsModalShown(false);
          setError([]);
        }}
        error={error}
        setError={setError}
        handleConfirm={addNewAlbum}
      />
      <UpdateAlbumModal
        error={error}
        setError={setError}
        albumIdToUdapte={albumIdToUdapte}
        albums={albums}
        songS={songS}
        setNewAlbumSongs={setNewAlbumSongs}
        isShown={isModalUdapteShown}
        handleClose={() => {
          setIsModalUpdateShown(false);
          setAlbumIdToUpdate("");
        }}
        handleConfirm={updateAlbum}
      />
      <div className="d-flex mb-4">
        <h2 className="me-4">Albums</h2>

        <Button variant="primary" onClick={() => setIsModalShown(true)}>
          Ajouter
        </Button>
      </div>

      <section id="albums-container">
        {albums &&
          albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              reMoveAlbum={reMoveAlbum}
              setAlbumIdToUpdate={setAlbumIdToUpdate}
              setIsModalUpdateShown={setIsModalUpdateShown}
              songS={songS}
            />
          ))}
      </section>
    </>
  );
}
