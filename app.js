const notes = require('./notes');

// get command + arguments from CLI
const command = process.argv[2];
const input = process.argv.slice(3).join(" ");

if (command === "add") {
  notes.addNote(input);
} else if (command === "list") {
  notes.listNotes();
} else if (command === "remove") {
  notes.removeNote(input);
} else {
  console.log("Unknown command. Try: add, list, remove");
}