import { BaseStorage } from "./base.storage.js";
import { loadNotes, saveNotes } from "../helpers/fileHelpers.js";

export class FileStorage extends BaseStorage {
  constructor(fileName = "notes.json") {
    super();
    this.fileName = fileName;
  }
  
  load() {
    return loadNotes(this.fileName);
  }

  save(data) {
    saveNotes(data, this.fileName);
  }
}