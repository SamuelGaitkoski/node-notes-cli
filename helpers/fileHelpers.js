const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "notes.json");

// Load notes from file (sorted by date)
function loadNotes() {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const dataBuffer = fs.readFileSync(filePath, "utf-8");

    if (!dataBuffer) {
      return [];
    }

    const notes = JSON.parse(dataBuffer);
    return notes.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    return [];
  }
}

// Save notes to file
function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

module.exports = { loadNotes, saveNotes };