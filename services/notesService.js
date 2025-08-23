import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import chalk from "chalk";
import figures from "figures";
import * as ui from "../ui.js";

export default class NotesService {
  constructor(storage) {
    if (!storage) {
      throw new Error("Storage instance is required");
    }
    this.storage = storage;
  }

  async getAllNotes() {
    return await this.storage.load();
  }

  async save(notes) {
    await this.storage.save(notes);
  }

  async list() {
    const notes = this.getAllNotes();
    ui.printNotesTable(notes, "All Notes");
  }

  async findByText(query) {
    const notes = this.getAllNotes();
    const results = notes.filter(n => n.text.toLowerCase().includes(query.toLowerCase()));
    ui.printNotesTable(results, `Search results for "${query}"`);
  }

  async findById(id) {
    const notes = this.getAllNotes();
    const note = notes.find(n => n.id === id);
    if (!note) {
      return console.log(chalk.red(figures.cross, "No note found with that ID."));
    } else {
      ui.printNote(note, "Note Found");
    }
  }

  async add(text) {
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

  async removeById(id) {
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