const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const notes = require('./notes');

yargs(hideBin(process.argv))
  .command(
    "list",
    "List all notes",
    () => {},
    () => {
      notes.listNotes();
    }
  )
  .command(
    "search <query>",
    "Search notes by text",
    (yargs) => {
      yargs.positional("query", { describe: "Text to search", type: "string" });
    },
    (argv) => {
      const results = notes.findNotesByText(argv.query);

      if (results.length === 0) {
        return console.log("No matching notes.");
      }
      
      console.log("Found notes:");
      results.forEach((n) => console.log(`- ${n.text}`));
    }
  )
  .command(
    "add <text>",
    "Add a new note",
    (yargs) => {
      yargs.positional("text", { describe: "Note content", type: "string" });
    },
    (argv) => {
      notes.addNote(argv.text);
    }
  )
  .command(
    "remove <text>",
    "Remove a note by text",
    (yargs) => {
      yargs.positional("text", { describe: "Text of the note to remove", type: "string" });
    },
    (argv) => {
      notes.removeNoteByText(argv.text);
    }
  )
  .help()
  .parse();