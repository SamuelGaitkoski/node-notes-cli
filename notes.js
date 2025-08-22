import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import chalk from "chalk";
import figures from "figures";
import boxen from "boxen";
import Table from "cli-table3";
import { loadNotes, saveNotes } from "./helpers/fileHelpers.js";

const headerStyle = { padding: 1, borderStyle: "round", borderColor: "green" };

export class NotesService {
  constructor(fileName = "notes.json") {
    this.fileName = fileName;
  }

  getAllNotes() {
    return loadNotes(this.fileName);
  }

  save(notes) {
    saveNotes(notes, this.fileName);
  }

  listNotes() {
    const notes = this.getAllNotes();
    if (!notes.length) {
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

  findNotesByText(query) {
    const notes = this.getAllNotes();
    const results = notes.filter(n => n.text.toLowerCase().includes(query.toLowerCase()));
    if (!results.length) {
      return console.log(chalk.yellow(figures.warning, "No matching notes."));
    }

    const table = new Table({
      head: ["ID", "Text", "Date"].map(h => chalk.cyan.bold(h)),
      colWidths: [38, 30, 25],
      style: { head: [], border: [] }
    });

    results.forEach(n => table.push([n.id, n.text, n.date]));
    console.log(boxen(table.toString(), { ...headerStyle, title: chalk.green(`Search results for "${query}"`) }));
  }

  findNoteById(id) {
    const notes = this.getAllNotes();
    const note = notes.find(n => n.id === id);
    if (!note) {
      return console.log(chalk.red(figures.cross, "No note found with that ID."));
    }

    console.log(boxen(
      `${chalk.green("ID:")} ${note.id}\n${chalk.green("Text:")} ${note.text}\n${chalk.green("Date:")} ${note.date}`,
      { ...headerStyle, title: chalk.green("Note Found") }
    ));
  }

  addNote(text) {
    const notes = this.getAllNotes();
    const newNote = {
      id: uuidv4(),
      text: text,
      date: format(new Date(), "dd/MM/yyyy HH:mm:ss")
    };
    notes.push(newNote);
    this.save(notes);
    console.log(chalk.green(figures.tick, "Note added:"), chalk.bold(text));
  }

  removeNoteById(id) {
    const notes = this.getAllNotes();
    const noteToRemove = notes.find(n => n.id === id);
    if (!noteToRemove) {
      spinner.stop();
      return console.log(chalk.red(figures.cross, "Note not found!"));
    }

    const filtered = notes.filter(n => n.id !== id);
    this.save(filtered);
    console.log(chalk.red(figures.cross, "Removed:"), chalk.bold(noteToRemove.text));
  }

  removeNoteByText(text) {
    let notes = this.getAllNotes();
    const noteToRemove = notes.find(n => n.text === text);
    if (!noteToRemove) {
      spinner.stop();
      return console.log(chalk.red(figures.cross, "Note not found!"));
    }

    notes = notes.filter(n => n.text !== text);
    this.save(notes);
    console.log(chalk.red(figures.cross, "Removed:"), chalk.bold(noteToRemove.text));
  }
}