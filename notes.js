const { v4: uuidv4 } = require("uuid");
const { loadNotes, saveNotes } = require("./helpers/fileHelpers");

function listNotes() {
  const notes = loadNotes();

  if (notes.length === 0) {
    return console.log("No notes yet.");
  }

  console.log("📝 Your notes:");
  notes.forEach((n) => console.log(`- [${n.id}] ${n.text}`));
}

function findNotesByText(query) {
  const notes = loadNotes();
  const results = notes.filter(note =>
    note.text.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    console.log("No matching notes.");
  } else {
    console.log("Found notes:");
    results.forEach(n => console.log(`- [${n.id}] ${n.text}`));
  }
}

function findNoteById(id) {
  const notes = loadNotes();
  const note = notes.find(n => n.id === id);

  if (!note) {
    console.log("No note found with that ID.");
  } else {
    console.log(`📝 [${note.id}] ${note.text}`);
  }
}

function addNote(note) {
  const notes = loadNotes();
  const newNote = {
    id: uuidv4(),
    text: note,
    date: new Date().toISOString()
  };
  notes.push(newNote);
  saveNotes(notes);
  console.log("✅ Note added:", note);
}

function removeNoteById(id) {
  let notes = loadNotes();
  const noteToRemove = notes.find(n => n.id === id);
  if (!noteToRemove) {
    return console.log("❌ Note not found!");
  }

  notes = notes.filter(n => n.id !== id);
  saveNotes(notes);
  console.log("❌ Removed:", noteToRemove.text);
}

function removeNoteByText(note) {
  let notes = loadNotes();
  const filtered = notes.filter(n => n.text !== note);
  saveNotes(filtered);
  console.log("❌ Removed:", note);
}

module.exports = { listNotes, findNotesByText, findNoteById, addNote, removeNoteById, removeNoteByText };