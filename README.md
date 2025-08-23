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

- **Single Responsibility Principle (SOLID):**  
  Each file has one clear responsibility (`app.js` = CLI, `notesService.js` = note logic, `fileHelpers.js` = persistence).

- **Dependency Inversion (SOLID):**  
  `fileHelpers.js` accepts a filename parameter, making the storage mechanism flexible and not hardcoded.

- **Module Pattern:**  
  `notesService` is a default export, exposing only the necessary API.

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
