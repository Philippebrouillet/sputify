import { NIL as NIL_UUID, v4 as uuid } from "uuid";

function insertList(storageKey, valueList) {
  if (storageKey == null || storageKey.length === 0) return;

  localStorage.setItem(storageKey, JSON.stringify(valueList));
}

function getAll(storageKey) {
  let strJson = localStorage.getItem(storageKey) || "[]";

  return JSON.parse(strJson);
}

function insertValue(storageKey, newValue) {
  if (newValue.id === NIL_UUID) {
    newValue.id = uuid();
  }

  let currentValues = getAll(storageKey);
  currentValues.push(newValue);

  insertList(storageKey, currentValues);

  return newValue;
}

function editValue(storageKey, editedValue) {
  if (editedValue == null || editedValue.id === NIL_UUID) return;

  let currentValues = getAll(storageKey);
  let index = currentValues.findIndex((value) => value.id === editedValue.id);
  if (index === -1) return;

  currentValues[index] = editedValue;

  insertList(storageKey, currentValues);

  return editedValue;
}

function deleteValue(storageKey, valueToDelete) {
  if (valueToDelete == null || valueToDelete.id === NIL_UUID) return;

  let currentValues = getAll(storageKey);
  let index = currentValues.findIndex((value) => value.id === valueToDelete.id);
  if (index === -1) return;

  currentValues.splice(index, 1);

  insertList(storageKey, currentValues);
}

let persistenceService = {
  insertList,
  getAll,
  insertValue,
  editValue,
  deleteValue,
};
export default persistenceService;
