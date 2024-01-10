"use strict";

const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

//* get data from local storage and displayed
getNotes().forEach((note) => {
  const noteEl = createNote(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

//* create note fucntion
function createNote(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  //* delete note when double click on note
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete your note ?");
    if (warning) deleteNote(id, element);
  });

  //* save date when we write in note
  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

//* delete note function
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  appEl.removeChild(element);
}

//* update note function
function updateNote(id, elementValue) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id === id)[0];
  target.content = elementValue;
  saveNotes(notes);
}

//* create random id and note then store in local storage
function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 1000),
    content: "",
  };

  const noteEl = createNote(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);

  saveNotes(notes);
}

//* save note to local storage
function saveNotes(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

//* get note from local storage
function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click", addNote);
