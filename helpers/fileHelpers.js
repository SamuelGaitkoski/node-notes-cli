import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFilePath(filename = "notes.json") {
  return path.join(__dirname, "..", "data", filename);
}

// Load notes from file (sorted by date)
export function loadNotes(filename) {
  const filePath = getFilePath(filename);
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
export function saveNotes(notes, filename) {
  const filePath = getFilePath(filename);
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}