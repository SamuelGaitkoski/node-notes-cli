import chalk from "chalk";
import figures from "figures";
import boxen from "boxen";
import Table from "cli-table3";
import ora from "ora";

const headerStyle = { padding: 1, borderStyle: "round", borderColor: "green" };

// Spinner wrapper
export function withSpinner(action) {
  const spinner = ora({ spinner: "dots" }).start();
  const result = action();
  spinner.stop();
  return result;
}

// Print a single note in a box
export function printNote(note, title = "Note") {
  console.log(
    boxen(
      `${chalk.green("ID:")} ${note.id}\n${chalk.green("Text:")} ${note.text}\n${chalk.green("Date:")} ${note.date}`,
      { ...headerStyle, title: chalk.green(title) }
    )
  );
}

// Print multiple notes in a table
export function printNotesTable(notesArray, title = "Notes") {
  if (!notesArray.length) {
    console.log(chalk.yellow(figures.warning, "No notes found."));
    return;
  }

  const table = new Table({
    head: ["ID", "Text", "Date"].map(h => chalk.blue.bold(h)),
    colWidths: [38, 30, 25],
    style: { head: [], border: [] }
  });

  notesArray.forEach(n => table.push([n.id, n.text, n.date]));
  console.log(boxen(table.toString(), { ...headerStyle, title: chalk.green(title) }));
}