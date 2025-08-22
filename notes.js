const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "data", "notes.json");

// Utility: load notes from file
function loadNotes() {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Utility: save notes to file
function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

// Add a note
function addNote(note) {
  const notes = loadNotes();
  const newNote = {
    id: uuidv4(),
    text,
    date: new Date().toISOString()
  };
  notes.push(newNote);
  saveNotes(notes);
  console.log("✅ Note added:", note);
}

// List notes
function listNotes() {
  const notes = loadNotes();

  if (notes.length === 0) {
    return console.log("No notes yet.");
  }

  console.log("📝 Your notes:");
  notes.forEach(n => console.log(`- ${n.text}`));
}

// Remove a note (by text)
function removeNote(note) {
  let notes = loadNotes();
  const filtered = notes.filter(n => n.text !== note);
  saveNotes(filtered);
  console.log("❌ Removed:", note);
}

module.exports = { addNote, listNotes, removeNote };