import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import NotesService from "./services/NotesService.js";
import { FileStorage } from "./services/FileStorage.js";

const storage = new FileStorage("notes.json");

// const storage = new MemoryStorage();

// const dbClient = new MockDbClient();
// const storage = new DatabaseStorage(dbClient);

const notesService = new NotesService(storage);

yargs(hideBin(process.argv))
  .command(
    "list",
    "List all notes",
    () => {},
    async () => await notesService.list()
  )
  .command(
    "search <query>",
    "Search notes by text",
    (yargs) => {
      yargs.positional("query", { describe: "Text to search", type: "string" });
    },
    async (argv) => await notesService.findByText(argv.query)
  )
  .command(
    "findById <id>",
    "Find a note by ID",
    (yargs) => {
      yargs.positional("id", { describe: "ID of the note to find", type: "string" });
    },
    async (argv) => await notesService.findById(argv.id)
  )
  .command(
    "add <text>",
    "Add a new note",
    (yargs) => {
      yargs.positional("text", { describe: "Note content", type: "string" });
    },
    async (argv) => await notesService.add(argv.text)
  )
  .command(
    "removeById <id>",
    "Remove a note by ID",
    (yargs) => {
      yargs.positional("id", { describe: "ID of the note to remove", type: "string" });
    },
    async (argv) => await notesService.removeById(argv.id)
  )
  .command(
    "remove <text>",
    "Remove a note by text",
    (yargs) => {
      yargs.positional("text", { describe: "Text of the note to remove", type: "string" });
    },
    async (argv) => await notesService.removeByText(argv.text)
  )
  .help()
  .parse();