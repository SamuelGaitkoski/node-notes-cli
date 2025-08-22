import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { NotesService } from "./notesService.js";

const notesService = new NotesService();

yargs(hideBin(process.argv))
  .command(
    "list",
    "List all notes",
    () => {},
    () => notesService.listNotes()
  )
  .command(
    "search <query>",
    "Search notes by text",
    (yargs) => {
      yargs.positional("query", { describe: "Text to search", type: "string" });
    },
    (argv) => notesService.findNotesByText(argv.query)
  )
  .command(
    "findById <id>",
    "Find a note by ID",
    (yargs) => {
      yargs.positional("id", { describe: "ID of the note to find", type: "string" });
    },
    (argv) => notesService.findNoteById(argv.id)
  )
  .command(
    "add <text>",
    "Add a new note",
    (yargs) => {
      yargs.positional("text", { describe: "Note content", type: "string" });
    },
    (argv) => notesService.addNote(argv.text)
  )
  .command(
    "removeById <id>",
    "Remove a note by ID",
    (yargs) => {
      yargs.positional("id", { describe: "ID of the note to remove", type: "string" });
    },
    (argv) => notesService.removeNoteById(argv.id)
  )
  .command(
    "remove <text>",
    "Remove a note by text",
    (yargs) => {
      yargs.positional("text", { describe: "Text of the note to remove", type: "string" });
    },
    (argv) => notesService.removeNoteByText(argv.text)
  )
  .help()
  .parse();