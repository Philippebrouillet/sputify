import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import albumService from "./../services/albumService";

import Select from "react-select";
export default function CreateAlbumModal({
  isShown,
  handleClose,
  handleConfirm,
  songS,
  setNewAlbumSongs,
  error,
  setError,
}) {
  const [newAlbum, setNewAlbum] = useState(albumService.EMPTY_ALBUM);
  const [songWithNoAlbum, setSongWithNoAlbum] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (!isShown) return;
    setSongWithNoAlbum(
      songS.filter(
        (song) => song.fkAlbumId === "00000000-0000-0000-0000-000000000000"
      )
    );
  }, [isShown, songS]);

  const options = [
    ...songWithNoAlbum.map((song) => ({
      label: song.name,
      value: song.id,
      durationSeconds: song.durationSeconds,
      fkAlbumId: song.fkAlbumId,
    })),
  ];

  function handleSubmit(event) {
    const newErrors = [];
    if (
      newAlbum.releaseYear.length < 4 ||
      newAlbum.releaseYear.length === 0 ||
      newAlbum.releaseYear > 2023
    ) {
      newErrors.push({ errorReleaseYear: "Veuillez entrer une Année correct" });
    }
    if (newAlbum.name.length === 0) {
      newErrors.push({ errorName: "Veuillez entrer un Nom" });
    }
    if (newAlbum.artist.length === 0) {
      newErrors.push({ errorArtiste: "Veuillez entrer un Artiste" });
    }
    if (newAlbum.genre.length === 0) {
      newErrors.push({ errorGenre: "Veuillez entrer un Genre" });
    }

    setError(newErrors);

    if (newErrors.length === 0) {
      handleConfirm(newAlbum);
      setSelectedOption(null);
    }
  }
  console.log(selectedOption);
  console.log(newAlbum);
  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewAlbum((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      <Modal show={isShown} onHide={handleClose} size="l">
        <Form noValidate onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un album</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nom de l'album</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newAlbum.name}
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
                name="artist"
                value={newAlbum.artist}
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
                type="text"
                name="genre"
                value={newAlbum.genre}
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
                type="number"
                name="releaseYear"
                value={newAlbum.releaseYear}
                onChange={handleInputChange}
                required={true}
                maxLength={4} // Limiter le nombre de caractères à 4
                pattern="[0-9]{4}" // Valider que la saisie de l'utilisateur contient exactement 4 chiffres
              />
              {newAlbum.releaseYear.length > 4 && (
                <p style={{ color: "red" }}>Veuillez entrer une date valide</p>
              )}
              {error &&
                error.map((err) => (
                  <p style={{ color: "red" }}>{err.errorReleaseYear}</p>
                ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Url du cover</Form.Label>
              <Form.Control
                type="text"
                name="albumCoverUrl"
                value={newAlbum.albumCoverUrl}
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
    </>
  );
}
