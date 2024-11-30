import * as path from "path";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Command: Compile and Run
  const runCommand = vscode.commands.registerCommand(
    "cCompileRunButton.compileRun",
    async (uri: vscode.Uri) => {
      handleCommand(uri, `clear && cd $3 && gcc $1 -o $2 && clear && ./$2`);
    }
  );

  // Command: Compile Only
  const compileCommand = vscode.commands.registerCommand(
    "cCompileRunButton.justCompile",
    async (uri: vscode.Uri) => {
      handleCommand(uri, `clear && cd $3 && gcc $1 -o $2`);
    }
  );

  // Command: Insert Command in Terminal (without executing)
  const insertCommand = vscode.commands.registerCommand(
    "cCompileRunButton.insertCommand",
    async (uri: vscode.Uri) => {
      handleCommand(
        uri,
        `clear && cd $3 && gcc $1 -o $2 && clear && ./$2`,
        false
      );
    }
  );

  // Register CodeLens Provider
  const codelensProvider = vscode.languages.registerCodeLensProvider(
    { language: "c" },
    new CRunCodeLensProvider()
  );

  context.subscriptions.push(
    runCommand,
    compileCommand,
    insertCommand,
    codelensProvider
  );
}

// CodeLens Provider
class CRunCodeLensProvider implements vscode.CodeLensProvider {
  provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    const topOfFile = new vscode.Range(0, 0, 0, 0);
    return [
      new vscode.CodeLens(topOfFile, {
        title: "Compile & Run",
        command: "cCompileRunButton.compileRun",
        arguments: [document.uri],
      }),
      new vscode.CodeLens(topOfFile, {
        title: "Just Compile",
        command: "cCompileRunButton.justCompile",
        arguments: [document.uri],
      }),
      new vscode.CodeLens(topOfFile, {
        title: "Insert Command",
        command: "cCompileRunButton.insertCommand",
        arguments: [document.uri],
      }),
    ];
  }
}

export function deactivate() {}

async function handleCommand(
  uri: vscode.Uri,
  command: string,
  execute: boolean | undefined = true
) {
  if (!uri) {
    vscode.window.showErrorMessage("No file selected.");
    return;
  }

  const properties = [];

  const fileName = uri.fsPath;
  properties.push(fileName);

  const fileBaseName = path.basename(fileName, ".c");
  properties.push(fileBaseName);

  const dirName = path.dirname(fileName);
  properties.push(dirName);

  const terminalName = path.basename(fileName);

  // Check for an existing terminal
  let terminal = vscode.window.terminals.find((t) => t.name === terminalName);

  // Create a new terminal if one doesn't already exist
  if (!terminal) {
    terminal = vscode.window.createTerminal(terminalName);
  } else {
    terminal.dispose();
    terminal = vscode.window.createTerminal(terminalName);
  }

  for (const [index, prop] of properties.entries()) {
    const regex = new RegExp(`\\$${index + 1}`, "g"); // This replace all occurrences
    command = command.replace(regex, prop);
  }

  terminal.show();
  terminal.sendText(command, execute);
}
