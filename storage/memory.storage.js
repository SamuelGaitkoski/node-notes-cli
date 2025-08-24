import { BaseStorage } from "./base.storage.js";

export class MemoryStorage extends BaseStorage {
  constructor() {
    super();
    this.data = [];
  }

  load() {
    return this.data;
  }

  save(data) {
    this.data = data;
  }
}