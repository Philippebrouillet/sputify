import { Button, Card } from "react-bootstrap";
import albumService from "../services/albumService";
import defaultCover from "../assets/default.jpg";

export default function AlbumCard({
  album,
  songS,
  setIsModalUpdateShown,
  setAlbumIdToUpdate,
  reMoveAlbum,
}) {
  // Fonction pour vérifier si une URL est valide
  function isValidImageUrl(url) {
    // Créer un objet Image pour charger l'image
    const image = new Image();
    image.src = url;
    // Vérifier que l'image a une hauteur et une largeur (ce qui signifie qu'elle a été chargée avec succès)
    return image.height > 0 && image.width > 0;
  }
  // Calcul de la durée totale de l'album
  const songFilter = songS.filter((song) => song.fkAlbumId === album.id);

  const totalDurationSeconds = songFilter.reduce(
    (total, song) => total + song.durationSeconds,
    0
  );

  const totalHours = Math.floor(totalDurationSeconds / 3600);
  const totalMinutes = Math.floor(
    (totalDurationSeconds - totalHours * 3600) / 60
  );
  let totalDuration;
  if (totalDurationSeconds >= 3600) {
    // Affichage en heures
    totalDuration = `${totalHours}H${
      totalMinutes < 10 ? "0" : ""
    }${totalMinutes}`;
  } else {
    // Affichage en minutes
    totalDuration = (totalDurationSeconds / 60).toFixed() + " min";
  }

  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img
        variant="top"
        src={
          isValidImageUrl(album.albumCoverUrl)
            ? album.albumCoverUrl
            : defaultCover
        }
      />

      <Card.Body>
        <Card.Title>{`${album.name} - ${album.artist}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{album.genre}</Card.Subtitle>
        <Card.Text>{`Année de sortie : ${album.releaseYear}`}</Card.Text>
        {totalDuration > 0 + "min" ? (
          <Card.Text>{`Durée totale : ${totalDuration}`}</Card.Text>
        ) : (
          <></>
        )}
        <div style={{ display: "flex", gap: "5px" }}>
          <Button
            variant="primary"
            onClick={() => {
              setIsModalUpdateShown(true);
              setAlbumIdToUpdate(album.id);
            }}
          >
            Modifier
          </Button>

          <Button onClick={() => reMoveAlbum(album)}>Supprimer</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
