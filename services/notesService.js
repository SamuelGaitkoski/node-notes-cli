import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import chalk from "chalk";
import figures from "figures";
import { loadNotes, saveNotes } from "../helpers/fileHelpers.js";
import * as ui from "./ui.js";

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

  list() {
    const notes = this.getAllNotes();
    ui.printNotesTable(notes, "All Notes");
  }

  findByText(query) {
    const notes = this.getAllNotes();
    const results = notes.filter(n => n.text.toLowerCase().includes(query.toLowerCase()));
    ui.printNotesTable(results, `Search results for "${query}"`);
  }

  findById(id) {
    const notes = this.getAllNotes();
    const note = notes.find(n => n.id === id);
    if (!note) {
      return console.log(chalk.red(figures.cross, "No note found with that ID."));
    } else {
      ui.printNote(note, "Note Found");
    }
  }

  add(text) {
    return ui.withSpinner(() => {
      const notes = this.getAllNotes();
      const newNote = {
        id: uuidv4(),
        text: text,
        date: format(new Date(), "dd/MM/yyyy HH:mm:ss")
      };
      notes.push(newNote);
      this.save(notes);
      console.log(chalk.green(figures.tick, "Note added:"), chalk.bold(text));
    });
  }

  removeById(id) {
    return ui.withSpinner(() => {
      const notes = this.getAllNotes();
      const noteToRemove = notes.find(n => n.id === id);
      if (!noteToRemove) {
        return console.log(chalk.red(figures.cross, "Note not found!"));
      }

      const filtered = notes.filter(n => n.id !== id);
      this.save(filtered);
      console.log(chalk.red(figures.cross, "Removed:"), chalk.bold(noteToRemove.text));
    });
  }

  removeByText(text) {
    return ui.withSpinner(() => {
      let notes = this.getAllNotes();
      const noteToRemove = notes.find(n => n.text === text);
      if (!noteToRemove) {
        return console.log(chalk.red(figures.cross, "Note not found!"));
      }

      notes = notes.filter(n => n.text !== text);
      this.save(notes);
      console.log(chalk.red(figures.cross, "Removed:"), chalk.bold(noteToRemove.text));
    });
  }
}