const { v4: uuidv4 } = require("uuid");
const { loadNotes, saveNotes } = require("./helpers/fileHelpers");

// List notes
function listNotes() {
  const notes = loadNotes();

  if (notes.length === 0) {
    return console.log("No notes yet.");
  }

  console.log("📝 Your notes:");
  notes.forEach((n) => console.log(`- [${n.id}] ${n.text}`));
}

// Find notes by text
function findNotesByText(query) {
  const notes = loadNotes();

  return notes.filter(note =>
    note.text.toLowerCase().includes(query.toLowerCase())
  );
}

// Find note by ID
function findNoteById(id) {
  const notes = loadNotes();
  return notes.find(n => n.id === id);
}

// Add a note
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

// Remove a note by text
function removeNoteByText(note) {
  let notes = loadNotes();
  const filtered = notes.filter(n => n.text !== note);
  saveNotes(filtered);
  console.log("❌ Removed:", note);
}

module.exports = { listNotes, findNotesByText, findNoteById, addNote, removeNoteByText };