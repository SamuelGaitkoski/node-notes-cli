const { v4: uuidv4 } = require("uuid");
const { loadNotes, saveNotes } = require("./helpers/fileHelpers");

// List notes
function listNotes() {
  const notes = loadNotes();

  if (notes.length === 0) {
    return console.log("No notes yet.");
  }

  console.log("📝 Your notes:");
  notes.forEach(n => console.log(`- ${n.text}`));
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


// Remove a note (by text)
function removeNote(note) {
  let notes = loadNotes();
  const filtered = notes.filter(n => n.text !== note);
  saveNotes(filtered);
  console.log("❌ Removed:", note);
}

module.exports = { listNotes, addNote, removeNote };