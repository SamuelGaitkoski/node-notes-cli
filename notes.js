import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";
import figures from "figures";
import boxen from "boxen";
import Table from "cli-table3";
import { loadNotes, saveNotes } from "./helpers/fileHelpers.js";

export function listNotes() {
  const notes = loadNotes();

  if (notes.length === 0) {
    return console.log(chalk.yellow(figures.warning, "No notes yet."));
  }

  const table = new Table({
    head: ["ID", "Text", "Date"],
    colWidths: [38, 30, 25]
  });

  notes.forEach(n => table.push([n.id, n.text, n.date]));

  console.log(table.toString());
}

export function findNotesByText(query) {
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

export function findNoteById(id) {
  const notes = loadNotes();
  const note = notes.find(n => n.id === id);

  if (!note) {
    console.log("No note found with that ID.");
  } else {
    console.log(`📝 [${note.id}] ${note.text}`);
  }
}

export function addNote(note) {
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

export function removeNoteById(id) {
  let notes = loadNotes();
  const noteToRemove = notes.find(n => n.id === id);
  if (!noteToRemove) {
    return console.log("❌ Note not found!");
  }

  notes = notes.filter(n => n.id !== id);
  saveNotes(notes);
  console.log("❌ Removed:", noteToRemove.text);
}

export function removeNoteByText(note) {
  let notes = loadNotes();
  const filtered = notes.filter(n => n.text !== note);
  saveNotes(filtered);
  console.log("❌ Removed:", note);
}