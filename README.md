# Notes CLI

A command-line tool to manage notes (add, list, remove) using only Node.js core modules.

## 🚀 Features
- List all notes
- Search notes  
  - By text  
  - By id  
- Add a new note
- Remove notes  
  - By id  
  - By text  
- Store notes in a JSON file

## 🛠️ Technologies
- [Node.js](https://nodejs.org/) (core runtime)
  - Core modules: `fs`, `path`, `process`, `url`

## 🏛️ Architecture & Principles

This project applies several software design principles:

- **Single Responsibility Principle (SRP, SOLID):**  
  Each file has one clear responsibility:
  - `app.js` → CLI handling  
  - `NotesService.js` → business logic for notes  
  - `fileHelpers.js` → persistence

- **Open/Closed Principle (OCP, SOLID):**  
  `NotesService` is open for extension but closed for modification. You can add new storage types (`FileStorage`, `MemoryStorage`, `DatabaseStorage`) without changing `NotesService` itself.

- **Liskov Substitution Principle (LSP, SOLID):**  
  Any class extending `BaseStorage` can replace another without breaking `NotesService`. For example, `MemoryStorage` or `DatabaseStorage` can be used interchangeably.

- **Interface Segregation Principle (ISP, SOLID):**  
  `BaseStorage` defines only the methods `load` and `save` that `NotesService` actually uses. Classes do not have to implement unnecessary methods.

- **Dependency Inversion Principle (DIP, SOLID):**  
  `fileHelpers.js` accepts a filename parameter, making the storage mechanism flexible and not hardcoded.
  `NotesService` depends on the `BaseStorage` abstraction, not a concrete implementation like `FileStorage` or `DatabaseStorage`. This allows easy swapping of storage mechanisms.

- **Module Pattern:**  
  `NotesService` is a default export, exposing only the public API needed by the application.

- **Clean Architecture mindset:**  
  Clear separation between:
  - **Interface (CLI)** → `app.js`
  - **Business logic** → `services/notesService.js`
  - **Infrastructure** → `helpers/fileHelpers.js`

## 📦 Installation
Clone the repository and install dependencies (if any):

```bash
git clone https://github.com/SamuelGaitkoski/node-notes-cli
cd notes-cli
npm install
