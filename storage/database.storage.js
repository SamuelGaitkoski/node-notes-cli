import { BaseStorage } from "./base.storage.js";

export class DatabaseStorage extends BaseStorage {
  constructor(dbClient) {
    super();

    if (!dbClient) {
      throw new Error("dbClient is required");
    }

    this.dbClient = dbClient;
  }

  async load() {
    return this.dbClient.getAllNotes();
  }

  async save(data) {
    await this.dbClient.saveNotes(data);
  }
}