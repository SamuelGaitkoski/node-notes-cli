import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "..", "data", "notes.json");

// Load notes from file (sorted by date)
export function loadNotes() {
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
export function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}