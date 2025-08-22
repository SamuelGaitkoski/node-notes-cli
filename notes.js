import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";
import figures from "figures";
import boxen from "boxen";
import Table from "cli-table3";
import { loadNotes, saveNotes } from "./helpers/fileHelpers.js";

const headerStyle = { padding: 1, borderStyle: "round", borderColor: "green" };

export function listNotes() {
  const notes = loadNotes();

  if (notes.length === 0) {
    return console.log(chalk.yellow(figures.warning, "No notes yet."));
  }

  const table = new Table({
    head: ["ID", "Text", "Date"].map(h => chalk.blue.bold(h)),
    colWidths: [38, 30, 25],
    style: { head: [], border: [] }
  });

  notes.forEach(n => table.push([n.id, n.text, n.date]));

  console.log(boxen(table.toString(), { ...headerStyle, title: chalk.green("All Notes") }));
}

export function findNotesByText(query) {
  const notes = loadNotes();
  const results = notes.filter(note =>
    note.text.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    console.log(chalk.yellow(figures.warning, "No matching notes."));
    return;
  }

  const table = new Table({
    head: ["ID", "Text", "Date"].map(h => chalk.cyan.bold(h)),
    colWidths: [38, 30, 25],
    style: { head: [], border: [] }
  });

  results.forEach(n => table.push([n.id, n.text, n.date]));

  console.log(boxen(table.toString(), { ...headerStyle, title: chalk.green(`Search results for "${query}"`) }));
}

export function findNoteById(id) {
  const notes = loadNotes();
  const note = notes.find(n => n.id === id);

  if (!note) {
    console.log(chalk.red(figures.cross, "No note found with that ID."));
  } else {
    console.log(boxen(
      `${chalk.green("ID:")} ${note.id}\n${chalk.green("Text:")} ${note.text}\n${chalk.green("Date:")} ${note.date}`,
      { ...headerStyle, title: chalk.green("Note Found") }
    ));
  }
}

export function addNote(text) {
  const notes = loadNotes();
  const newNote = {
    id: uuidv4(),
    text: text,
    date: new Date().toISOString()
  };
  notes.push(newNote);
  saveNotes(notes);
  console.log(chalk.green(figures.tick, "Note added:"), chalk.bold(text));
}

export function removeNoteById(id) {
  let notes = loadNotes();
  const noteToRemove = notes.find(n => n.id === id);
  if (!noteToRemove) {
    return console.log(chalk.red(figures.cross, "Note not found!"));
  }

  notes = notes.filter(n => n.id !== id);
  saveNotes(notes);
  console.log(chalk.red(figures.cross, "Removed:"), chalk.bold(noteToRemove.text));
}

export function removeNoteByText(text) {
  let notes = loadNotes();
  const noteToRemove = notes.find(n => n.text === text);
  if (!noteToRemove) {
    return console.log(chalk.red(figures.cross, "Note not found!"));
  }

  notes = notes.filter(n => n.text !== text);
  saveNotes(notes);
  console.log(chalk.red(figures.cross, "Removed:"), chalk.bold(noteToRemove.text));
}