import { NIL as NIL_UUID } from "uuid";
import seededAlbums from "../seedData/albums.json";
import persistenceService from "./persistenceService";

const ALBUM_STORAGE_KEY = "albums";

const EMPTY_ALBUM = {
  id: NIL_UUID,
  name: "",
  artist: "",
  releaseYear: 2000, // Définir la valeur initiale en tant que chaîne de caractères
  genre: "",
  albumCoverUrl: "",
};

function seedAlbums() {
  persistenceService.insertList(ALBUM_STORAGE_KEY, seededAlbums);
}

function getAllAlbums() {
  return persistenceService.getAll(ALBUM_STORAGE_KEY);
}

function insertAlbum(albumToInsert) {
  return persistenceService.insertValue(ALBUM_STORAGE_KEY, albumToInsert);
}

function editAlbum(editedAlbum) {
  return persistenceService.editValue(ALBUM_STORAGE_KEY, editedAlbum);
}

function deleteAlbum(albumToDelete) {
  persistenceService.deleteValue(ALBUM_STORAGE_KEY, albumToDelete);
}

let albumService = {
  seedAlbums,
  getAllAlbums,
  insertAlbum,
  editAlbum,
  deleteAlbum,
  EMPTY_ALBUM,
};
export default albumService;
