# C Compiler Run Button Extension

This Visual Studio Code extension adds a **Run** button to C files that allows you to easily compile and run your C programs directly from the editor. It also offers an option to **just compile** or **insert the compile command** into the terminal without executing it.

## Features

- **Run Button**: Compiles and runs your C program with a single click.
- **Compile Only**: Option to compile the C file without running it.
- **Insert Command**: Adds the compile command to the terminal without executing it, so you can modify it if needed.

## Commands

- **Run**: Compiles and runs the selected C file.
- **Compile Only**: Compiles the C file without executing it.
- **Insert Compile Command**: Inserts the compile command into the terminal without executing it.

## Requirements

- Visual Studio Code (v1.x or higher)
- GCC (GNU Compiler Collection) installed and accessible in the system path.

## Installation

1. Install the extension from the Visual Studio Code Marketplace.
   - Search for "C Compiler Run Button" in the Extensions view (`Ctrl+Shift+X`).
   - Click "Install".

2. Or, you can install the extension manually from the `.vsix` file.

## Usage

1. Open a `.c` file in Visual Studio Code.
2. You should see a **Run** button in the editor toolbar.
3. Click the **Run** button to compile and run your program, or use the command palette (`Ctrl+Shift+P`) to choose other available options:
   - **Compile Only**: Compiles the C file without running it.
   - **Insert Compile Command**: Inserts the compile command in the terminal without executing it.

## Troubleshooting

- **GCC not found**: Make sure that GCC is installed and added to your system's path.
- **Terminal issues**: If a terminal doesn’t open or the command doesn’t execute, ensure that your VS Code has proper permissions to create and interact with terminals.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Thanks to the Visual Studio Code team for providing the great API and platform for building extensions.
- GCC for being the compiler we rely on for C programming.

---

Feel free to submit issues or pull requests to improve the extension!
