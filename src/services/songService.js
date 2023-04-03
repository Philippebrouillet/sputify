import { NIL as NIL_UUID } from "uuid";
import seededSongs from "../seedData/songs.json";
import persistenceService from "./persistenceService";

const SONG_STORAGE_KEY = "songs";

const EMPTY_SONG = {
  id: NIL_UUID,
  name: "",
  durationSeconds: 0,
  fkAlbumId: NIL_UUID,
};

function seedSongs() {
  persistenceService.insertList(SONG_STORAGE_KEY, seededSongs);
}

function getAllSongs() {
  return persistenceService.getAll(SONG_STORAGE_KEY);
}

function insertSong(songToInsert) {
  return persistenceService.insertValue(SONG_STORAGE_KEY, songToInsert);
}

function editSong(editedSong) {
  return persistenceService.editValue(SONG_STORAGE_KEY, editedSong);
}

function deleteSong(songToDelete) {
  persistenceService.deleteValue(SONG_STORAGE_KEY, songToDelete);
}

let songService = {
  seedSongs,
  getAllSongs,
  insertSong,
  editSong,
  deleteSong,
  EMPTY_SONG,
};
export default songService;
