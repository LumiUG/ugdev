// JSON Imports.
var structure = await fetch('/assets/data/terminal/structure.json')
    .then((response) => response.json())
    .then((data) => { return data });

// Global variables
var userHTML = document.getElementById("user");
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
    {
        "name": "help",
        "description": "Display information about builtin commands.",
        "helptopic": "Command usages:\nhelp - Shows a list of all visible commands.\nhelp <command> - Shows in-depth command help.",
        "hidden": false,
        "run": CommandHelp
    },
    {
        "name": "echo",
        "description": "Display a line of text.",
        "helptopic": "",
        "hidden": false,
        "run": CommandEcho
    },
    {
        "name": "history",
        "description": "Display the history list.",
        "helptopic": "",
        "hidden": false,
        "run": CommandHistory
    },
    {
        "name": "whoami",
        "description": "Print effective user name.",
        "helptopic": "",
        "hidden": false,
        "run": CommandWhoAmI
    },
    {
        "name": "clear",
        "description": "Clear the terminal screen.",
        "helptopic": "",
        "hidden": false,
        "run": null
    },
    {
        "name": "ls",
        "description": "List directory contents.",
        "helptopic": "",
        "hidden": false,
        "run": CommandLS
    },
    {
        "name": "pwd",
        "description": "Prints working directory.",
        "helptopic": "",
        "hidden": false,
        "run": CommandPWD
    },
    {
        "name": "cd",
        "description": "Change the working directory.",
        "helptopic": "",
        "hidden": false,
        "run": CommandCD
    },
    {
        "name": "cat",
        "description": "Prints file contents",
        "helptopic": "",
        "hidden": false,
        "run": CommandCat
    },
    {
        "name": "su",
        "description": "Change user ID or become superuser.",
        "helptopic": "",
        "hidden": false,
        "run": CommandSU
    },
    {
        "name": "exit",
        "description": "Go back to ugdev.",
        "helptopic": "",
        "hidden": false,
        "run": CommandExit
    },
    {
        "name": "uname",
        "description": "Hidden...",
        "helptopic": "",
        "hidden": true,
        "run": CommandUname
    }
];
var users = [
    {
        "username": "guest",
        "password": null
    },
    {
        "username": "lumi",
        "password": "&b**X&lw^YX&d!z^Y&X!Jl^YmlnY*&W5k*^c2!9m^dHB*he&X&Bhb!!G1*lMj!Bid*!W&Nr*c&zoz^"
    },
    {
        "username": "root",
        "password": "*cm&9^v^dG&F*kbW!!&lu^"
    }
]

// Run on start
CommandCD("/home/guest");

// Anywhere typing
document.addEventListener("keypress",
    function (event) {
        event.preventDefault();
        
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
            case "Delete":
            case "Backspace":
                userInput.textContent = userInput.textContent.slice(0, -1)
                break;
            
            case "Tab":
                event.preventDefault();
                console.log("hii")
                break;
            
            // Loads command history from index
            case "ArrowUp":
                event.preventDefault();
                if (historyIndex <= 0) break;
                historyIndex--;
                userInput.textContent = commandHistory[historyIndex];
                break;
            
            // Loads command history from index
            case "ArrowDown":
                event.preventDefault();
                if (historyIndex > commandHistory.length - 1) break;
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
    if (!validCommand) TypeOutput(`[r]EOS: ${userInput.textContent} command not found.[/]`);
}

// Type something in the output field
function TypeOutput(content = "", override = true) {
    // Sanitize text (no html tags)
    // TODO.

    // Apply color codes and send the text.
    if (override) output.innerHTML = StyleText(content);
    else output.innerHTML += StyleText(content);
}

// Color codes!
function StyleText(content = "") {
    let validColors = ["\\[r\\]", "\\[g\\]", "\\[b\\]", "\\[y\\]"];

    // Apply color codes to the text.
    validColors.forEach(
        color => {
            let match = `${color}*`;
            content = content.replaceAll(RegExp(match, "g"), `<span class="${color[2]}">`);
        }
    );

    // Close span tags and return!
    let match = "\\[/\\]*";
    content = content.replace(RegExp(match, "g"), "</span>");
    return content;
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

function NoSuchFileOrDirectory(path, currPath, doPermissions = false) {
    CommandCD(currPath);
    (doPermissions) ? TypeOutput(`[r]EOS: ${path}: Permission denied.[/]`) : TypeOutput(`[r]EOS: ${path}: No such file or directory.[/]`)
}

// Nothing!! (this is badly named just to make it harder, sorry!)
function ClearPassword(p) {
    if (!p) return p;
    ["SVE9PQ==", "WGc9PQ==", "S2c9PQ==", "Smc9PQ=="].forEach(e => {
        let r = new RegExp(`\\${window.atob(window.atob(e))}*`, "g");
        p = p.replace(r, "");
    });
    return p;
}

// Pathing
function Pathing(path) {
    let pathAsArray;

    // Sanitize path
    path = path.replace(/\/{2,}/, "/");
    
    // Absolute path
    if (path.startsWith("/")) {
        // Return if ".." on absolute
        if (path.includes("..")) { NoSuchFileOrDirectory(path, currentPath); return false; }
        
        // Do the thing
        pathAsArray = ["/"].concat(path.toLowerCase().split("/").filter(i => i));
        ResetOS();
    }
    
    // Relative path
    else {
        // Do the thing
        pathAsArray = path.toLowerCase().split("/").filter(i => i);
        path = (currentPath == "/") ? `${currentPath}${path}` : `${currentPath}/${path}`;
    }

    // Find if the path is valid and navigate there
    let noPermission = false;
    pathAsArray.some(
        folder => {
            if (os == undefined) return;
            
            // Does the folder exist?
            if (folder == "permissions" || !os.hasOwnProperty(folder))
            {
                os = undefined;
                return;
            }

            // Is it a file?
            if (/(\..+)/.test(folder)) return;

            // Folder permissions? Let's check them.
            if (os[folder]["permissions"] != null) {
                // Is the current user inside the allowed users list?
                if (!os[folder]["permissions"]["allowedUsers"].includes(currentUser))
                {
                    noPermission = true;
                    os = undefined;
                    return;
                }
            }

            // No folder permissions? All good? Go right in!
            os = os[folder];
        }
    );
    
    // Check if path *was* valid
    if (os == undefined) { NoSuchFileOrDirectory(path, currentPath, noPermission); return false; } // duplicate!
    return path;
}

// --------------------- COMMANDS ---------------------

// Help command
function CommandHelp() {
    let extensiveHelp = userInput.textContent.split(" ")[1];
    
    // In depth command help
    if (extensiveHelp != undefined) {
        extensiveHelp = extensiveHelp.toLowerCase();

        // No help topic was found.
        let topic = commands.find(command => { return command.name == extensiveHelp; });
        if (!topic) {
            TypeOutput(`[r]EOS: No help topics match[/] '${extensiveHelp}'[r].[/]`)
            return;
        }

        // Show help topic!
        TypeOutput(`---- ${topic.name} : Command help ----\n\n${topic.helptopic}`);
        return;
    }

    // Regular help command
    commands.forEach(
        command => {
            if (!command.hidden)
                TypeOutput(`${command.name} - ${command.description}\n`, false);
        }
    );
}

// Repeats something with user input
function CommandEcho() {
    TypeOutput(userInput.textContent.substring(
        userInput.textContent.indexOf(' ') + 1));
}

// Shows a complete history of user commands
function CommandHistory() {
    commandHistory.forEach(
        function (used, i) {
            TypeOutput(`${i}) ${used}\n`, false);
        }
    )
}

// Goes back to main website
function CommandExit() {
    TypeOutput("EOS: Have a nice day!");
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
            if (match == "permissions") return;

            // File or folder?
            match = (/(\..+)/.test(match)) ?
                match : `[b]${match}/[/]`;
            
            // Is it a hidden file?
            if (currentUser != "root" && match.startsWith("!")) return;
            else match = (match.startsWith("!")) ? `${match.slice(1)}*` : match;

            // Sends the output
            TypeOutput(`${match}\n`, false)
        }
    );
}

// Changes directory to desired path
function CommandCD(forcePath = null) {
    let path = (forcePath) ? forcePath : (userInput.textContent == "") ? null : userInput.textContent.split(" ")[1].toLowerCase();
    if (!path) return;

    // Navigate there
    path = Pathing(path);
    if (!path) return;
    
    // Wtf stop dont do that
    if (/(\..+)/.test(path)) {
        TypeOutput("[r]EOS: Cannot CD into a file![/]");
        return;
    }
    
    // Update current path
    UpdateCurrentPath(path);
}

// Uname?
function CommandUname() {
    TypeOutput("EOS 4 bit system");
}

// Change users
function CommandSU() {
    let changeUser = (userInput.textContent == "") ? null : userInput.textContent.split(" ")[1];
    let passwordUser = (userInput.textContent == "") ? null : userInput.textContent.split(" ")[2];
    let userToLoginAs = users.find(user => { if (changeUser) if (user.username == changeUser.toLowerCase()) return user });
    
    // Invalid user?
    if (!changeUser || !userToLoginAs) {
        TypeOutput(`[r]EOS: User[/] ${(!changeUser)? "" : changeUser} [r]does not exist.[/]`);
        return;
    }

    // Already logged in!
    if (userToLoginAs.username == currentUser) {
        TypeOutput(`[r]EOS: You are already logged in as[/] ${currentUser}[r]![/]`);
        return;
    }

    // Wrong password?
    if ((!passwordUser || ClearPassword(userToLoginAs.password) != window.btoa(passwordUser)) && userToLoginAs.password != null) {
        TypeOutput(`[r]EOS: Incorrect password.[/]`);
        return;
    }
    
    // Changes the user!
    currentUser = userToLoginAs.username;
    userHTML.textContent = `${userToLoginAs.username}@ugdev.xyz`;
    TypeOutput(`[g]EOS: You are now logged in as[/] ${userToLoginAs.username}[g]![/]`);
    
    // Changes the current path to the user's home.
    UpdateCurrentPath(`/home/${userToLoginAs.username}`);
    CommandCD(`/home/${userToLoginAs.username}`)

}

// Show the contents of a file.
function CommandCat() {
    let path = (userInput.textContent == "") ? null : userInput.textContent.split(" ")[1];
    if (!path) return;

    // Navigate there
    path = Pathing(path);
    if (!path) return;
    
    // Get the file to cat later
    let catFile = path.split("/");
    catFile = catFile.splice(catFile.length - 1, 1).toString();

    // CAT THE FILE!!! MEOWW MRROW MRRPT MEOWWWWWWW
    let contents = os[catFile];
    TypeOutput(contents);
}

// Prints current path
function CommandPWD() {
    TypeOutput(currentPath);
}