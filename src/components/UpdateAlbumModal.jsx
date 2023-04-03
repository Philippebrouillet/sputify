import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import Select from "react-select";
export default function UpdateAlbumModal({
  isShown,
  handleClose,
  handleConfirm,
  albums,
  songS,
  error,
  setError,
  setNewAlbumSongs,
  albumIdToUdapte,
}) {
  const [albumToUpdate, setAlbumToUpdate] = useState([]);
  const [songWithNoAlbum, setSongWithNoAlbum] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (!isShown) return;
    setSongWithNoAlbum(
      songS.filter(
        (song) => song.fkAlbumId === "00000000-0000-0000-0000-000000000000"
      )
    );
    const albumToChange = albums
      .filter((album) => album.id === albumIdToUdapte)
      .map((album) => ({
        ...album,
      }));

    setAlbumToUpdate(albumToChange);
  }, [isShown, songS, albums, albumIdToUdapte]);

  const options = [
    ...songWithNoAlbum.map((song) => ({
      label: song.name,
      value: song.id,
      durationSeconds: song.durationSeconds,
      fkAlbumId: song.fkAlbumId,
    })),
  ];

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    for (let i = 0; i < albumToUpdate.length; i++) {
      const album = albumToUpdate[i];
      console.log(album.releaseYear);
      const newErrors = [];
      if (
        album.releaseYear.length < 4 ||
        album.releaseYear.length === 0 ||
        album.releaseYear > 2023
      ) {
        newErrors.push({
          errorReleaseYear: "Veuillez entrer une Année correct",
        });
      }
      if (album.name.length === 0) {
        newErrors.push({ errorName: "Veuillez entrer un Nom" });
      }
      if (album.artist.length === 0) {
        newErrors.push({ errorArtiste: "Veuillez entrer un Artiste" });
      }
      if (album.genre.length === 0) {
        newErrors.push({ errorGenre: "Veuillez entrer un Genre" });
      }

      setError(newErrors);

      if (newErrors.length === 0) {
        handleConfirm(albumToUpdate);
        setSelectedOption(null);
      }
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setAlbumToUpdate((prev) => prev.map((e) => ({ ...e, [name]: value })));
  }

  const handleSelectChange = (option) => {
    setSelectedOption(option);

    setNewAlbumSongs(
      option.map((option) => ({
        id: option.value,
        name: option.label,
        durationSeconds: option.durationSeconds,
        fkAlbumId: "00000000-0000-0000-0000-000000000000",
      }))
    );
  };

  return (
    <>
      {albumToUpdate.map((album) => (
        <Modal key={album.id} show={isShown} onHide={handleClose} size="l">
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Modifier {album.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nom de l'album</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder={album.name}
                  value={albumToUpdate.name}
                  onChange={handleInputChange}
                  required={true}
                />
                {error &&
                  error.map((err) => (
                    <p style={{ color: "red" }}>{err.errorName}</p>
                  ))}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Artiste</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={album.artist}
                  name="artist"
                  value={albumToUpdate.artist}
                  onChange={handleInputChange}
                  required={true}
                />
                {error &&
                  error.map((err) => (
                    <p style={{ color: "red" }}>{err.errorArtiste}</p>
                  ))}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  placeholder={album.genre}
                  type="text"
                  name="genre"
                  value={albumToUpdate.genre}
                  onChange={handleInputChange}
                  required={true}
                />
                {error &&
                  error.map((err) => (
                    <p style={{ color: "red" }}>{err.errorGenre}</p>
                  ))}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Année de sortie</Form.Label>
                <Form.Control
                  placeholder={album.releaseYear}
                  type="number"
                  name="releaseYear"
                  value={albumToUpdate.releaseYear}
                  onChange={handleInputChange}
                  required={true}
                  maxLength={4} // Limiter le nombre de caractères à 4
                  pattern="[0-9]{4}" // Valider que la saisie de l'utilisateur contient exactement 4 chiffres
                />

                {error &&
                  error.map((err) => (
                    <p style={{ color: "red" }}>{err.errorReleaseYear}</p>
                  ))}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Url du cover</Form.Label>
                <Form.Control
                  placeholder={album.albumCoverUrl}
                  type="text"
                  name="albumCoverUrl"
                  value={albumToUpdate.albumCoverUrl}
                  onChange={handleInputChange}
                  required={true}
                />
              </Form.Group>
              <p>Ajouter une musique</p>
              <Select
                isMulti
                name="sound"
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                required={true}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button variant="primary" type="submit">
                Ajouter
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      ))}
    </>
  );
}
