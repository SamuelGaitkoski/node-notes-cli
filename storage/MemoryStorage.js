import { BaseStorage } from "./BaseStorage";

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