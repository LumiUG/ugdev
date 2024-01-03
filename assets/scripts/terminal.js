// JSON Imports.
var structure = await fetch('/assets/data/terminal/structure.json')
    .then((response) => response.json())
    .then((data) => { return data });

// Global variables
var pathHTML = document.getElementById("path");
var userInput = document.getElementById("input");
var output = document.getElementById("output");
var blinkLine = document.getElementById("blink");
var keypressBlacklist = ["Enter", "Delete"]
var currentUser = "guest";
var currentPath = "/home/guest"
var commandHistory = [];
var historyIndex = 0;
var os = null;
var commands = [
    { "name": "help", "description": "Display information about builtin commands.", "run": CommandHelp },
    { "name": "echo", "description": "Display a line of text.", "run": CommandEcho },
    { "name": "history", "description": "Display the history list.", "run": CommandHistory },
    { "name": "exit", "description": "Go back to ugdev.", "run": CommandExit },
    { "name": "whoami", "description": "Print effective user name.", "run": CommandWhoAmI },
    { "name": "clear", "description": "Clear the terminal screen.", "run": null },
    { "name": "ls", "description": "Placeholder.", "run": CommandLS },
    { "name": "cd", "description": "Placeholder.", "run": CommandCD }
];

// Run on start
CommandCD("/home/guest");

// Anywhere typing
document.addEventListener("keypress",
    function (event) {
        // Keypress blacklist!
        if (keypressBlacklist.includes(event.key)) return;

        // Adds key to the user input
        userInput.textContent += event.key;
    }
);

// Special keyboard events
document.addEventListener("keydown",
    function (event) {
        switch (event.key) {
            // Submits the current user input and resets stuff
            case "Enter":
                ClearOutput();
                if (userInput.textContent.trim()) {
                    commandHistory.push(userInput.textContent)
                    historyIndex = commandHistory.length;
                    CheckForCommand();
                }
                ClearUserInput();
                break;
        
            // Removes a letter
            case "Backspace":
                userInput.textContent = userInput.textContent.slice(0, -1)
                break;
            
            // Loads command history from index
            case "ArrowUp":
                if (historyIndex <= 0) break;
                historyIndex--;
                userInput.textContent = commandHistory[historyIndex];
                break;
            
            // Loads command history from index
            case "ArrowDown":
                if (historyIndex >= commandHistory.length - 1) break;
                historyIndex++;
                userInput.textContent = commandHistory[historyIndex];
                break;
            
            default:
                break;
        }
    }
);

// Clears user input
function ClearUserInput() { userInput.textContent = ""; }

// Clears output field
function ClearOutput() { TypeOutput(); }

// Checks for a command on screen
function CheckForCommand() {
    // Checks every command
    let validCommand = false;
    commands.forEach(
        command => {
            // Runs command if one of them passes the check, then breaks out
            if (userInput.textContent.toLowerCase().startsWith(command.name)) {
                if (command.run) command.run();
                validCommand = true;
                return;
            }
        }
    )

    // Command not found?
    if (!validCommand) TypeOutput(`bash: ${userInput.textContent} command not found`);
}


// Type something in the output field
function TypeOutput(content = "", override = true) {
    if (override) output.textContent = content
    else output.textContent += content
}

// Resets the OS structure to its default state
function ResetOS() { os = structuredClone(structure); }

// Updates the current path
function UpdateCurrentPath(newPath) {
    newPath = (newPath.endsWith("/")) ? newPath.slice(0, -1) : newPath;
    newPath = (newPath.startsWith("/")) ? newPath : `/${newPath}`;
    pathHTML.textContent = newPath;
    currentPath = newPath;
}

function NoSuchFileOrDirectory(path, currPath) {
    CommandCD(currPath);
    TypeOutput(`bash: cd: ${path}: No such file or directory.`)
}

// --------------------- COMMANDS ---------------------

// Help command
function CommandHelp() {
    let extensiveHelp = userInput.textContent.split(" ")[1];
    
    // In depth help
    if (extensiveHelp != undefined) {
        TypeOutput(`bash: help: no help topics match '${extensiveHelp}'.`)
        return;
    }

    // Regular help command
    commands.forEach(
        command => { TypeOutput(`${command.name} - ${command.description}\r\n`, false); }
    );
}

// Repeats something with user input
function CommandEcho() {
    output.textContent = userInput.textContent.substring(
        userInput.textContent.indexOf(' ') + 1);
}

// Shows a complete history of user commands
function CommandHistory() {
    commandHistory.forEach(
        function (used, i) {
            TypeOutput(`${i}) ${used}\r\n`, false);
        }
    )
}

// Goes back to main website
function CommandExit() {
    TypeOutput("Have a nice day!");
    window.location.replace("https://ugdev.xyz");
}

// Returns the user
function CommandWhoAmI() {
    TypeOutput(currentUser);
}

// LS command, returns all files/folders in current directory.
function CommandLS() {
    let lsObjects = Object.keys(os);
    lsObjects.forEach(
        match => {
            // File or folder?
            match = (/(\..+)/.test(match)) ?
                match : `${match}/`;
            
            // Is it a hidden file?
            match = (match.startsWith("!")) ?
                `${match.slice(1)}*` : match;

            // Sends the output
            TypeOutput(`${match}\r\n`, false)
        }
    );
}

// Changes directory to desired path
function CommandCD(forcePath = null) {
    let path = (forcePath) ? forcePath : (userInput.textContent == "") ? null : userInput.textContent.split(" ")[1];
    if (!path) return;
    let pathAsArray;
    
    
    // Absolute path
    if (path.startsWith("/")) {
        if (path.includes("..")) { NoSuchFileOrDirectory(path, currentPath); return; }
        pathAsArray = ["/"].concat(path.toLowerCase().split("/").filter(i => i));
        ResetOS();
    }

    // Relative path
    else {
        pathAsArray = path.toLowerCase().split("/").filter(i => i);
        path = `${currentPath}/${path}`
    }

    // Find if the path is valid and navigate there
    pathAsArray.forEach(folder => os = os[folder]);
    
    // Check if path was valid
    if (os == undefined) { NoSuchFileOrDirectory(path, currentPath); return; }
    
    // Update current path
    UpdateCurrentPath(path);
}