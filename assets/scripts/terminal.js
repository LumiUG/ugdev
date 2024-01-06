/*
    Hey, I've worked really hard on this.

    I'd appreciate if you could check the source code AFTER
    having experienced a bit of the terminal beforehand.

    There are tons of secrets and little quirks everywhere,
    and I feel like you'd be missing out if you checked for user passwords,
    hidden commands or just the entire .json folder structure.

    That being said... Have fun! Enjoy viewing my spaghetti code <3
    (omg i love spaghetti code)
*/

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
var validColors = ["\\[re\\]", "\\[gr\\]", "\\[bl\\]", "\\[ye\\]", "\\[pi\\]", "\\[lb\\]", "\\[or\\]", "\\[lg\\]", "\\[mg\\]"];
var keypressBlacklist = ["Enter", "Delete"];
var closestAutocomplete = [];
var currentUser = "guest";
var currentPath = "/home/guest";
var commandHistory = [];
var historyIndex = 0;
var os = null;
var commands = [
    {
        "name": "help",
        "description": "Display information about builtin commands.",
        "helptopic": "Command usages:\nhelp - Shows a list of all [re]visible[/] commands.\nhelp {command} - Shows in-depth command help.",
        "hidden": false,
        "run": CommandHelp
    },
    {
        "name": "echo",
        "description": "Display a line of text.",
        "helptopic": "Command usage:\necho <text> - Displays a line of text. HTML and color codes supported!\n\n[re]Color[/] [ye]codes[/] [gr]usage[/]:\nUse [bl][][/] with a valid color to apply it.\nThen, use [bl][>/<][/] to mark the end of the coloring.\nNote: you must remove the \"[bl]><[/]\" in order for color codes to work (it was a showcase!!)\n\nValid colors:\n- Red: [re]re[/]\n- Green: [gr]gr[/]\n- Blue: [bl]bl[/]\n- Yellow: [ye]ye[/]\n- Orange: [or]or[/]\n- Pink: [pi]pi[/]\n- Light blue: [lb]lb[/]\n- Muted green: [mg]mg[/]\n\nExample (Removing \"><\"):\n- [>re<]Hey[>/<] [>lb<]there![>/<]\n- [re]Hey[/] [lb]there![/]",
        "hidden": false,
        "run": CommandEcho
    },
    {
        "name": "history",
        "description": "Display the history list.",
        "helptopic": "Command usage:\nhistory - Displays your past commands.",
        "hidden": false,
        "run": CommandHistory
    },
    {
        "name": "whoami",
        "description": "Print effective user name.",
        "helptopic": "Command usage:\nwhoami - Shows on-screen the current working user.",
        "hidden": false,
        "run": CommandWhoAmI
    },
    {
        "name": "pwd",
        "description": "Prints working directory.",
        "helptopic": "Command usage:\npwd - Shows your current path. That's it!",
        "hidden": false,
        "run": CommandPWD
    },
    {
        "name": "clear",
        "description": "Clear the terminal screen.",
        "helptopic": "Command usage:\nclear - Clears your terminal! ...You can also just press enter.",
        "hidden": false,
        "run": CommandClear
    },
    {
        "name": "ls",
        "description": "List directory contents.",
        "helptopic": "Command usage:\nls - Lists all the [re]visible[/] files on your terminal.\n\nDisplay rules:\n- [bl]Folder[/]: \"/\"\n- [ye]Hidden file[/] (root only): \"!\"",
        "hidden": false,
        "run": CommandLS
    },
    {
        "name": "cd",
        "description": "Change the working directory.",
        "helptopic": "Command usage:\ncd {path/folder} - Changes the working directory to the specified directory.\n[bl]Absolute[/] and [bl]relative[/] paths are allowed!\nSorry, [re]no \"cd ..\" yet[/].\n\nFolder permissions:\n- [gr]User-based[/]: The current logged user is only allowed into its own [gr]/home[/] folder.\nAnd, of course, everyone can use the [gr]/home/guest[/] folder.\n\nAn example would be:\nUser \"lumi\" can access [gr]/home/lumi[/] and [gr]/home/guest[/], but would [re]NOT[/] be able to access [re]/home/root[/].",
        "hidden": false,
        "run": CommandCD
    },
    {
        "name": "rm",
        "description": "Removes files. (TODO)",
        "helptopic": "Command usage:\nrm {file} - Removes a file from the filesystem.",
        "hidden": false,
        "run": CommandRM
    },
    {
        "name": "touch",
        "description": "Creates files. (TODO)",
        "helptopic": "Command usage:\ntouch {file} {content?} - Creates a file with (optionally) content inside of it.",
        "hidden": false,
        "run": CommandTouch
    },
    {
        "name": "cat",
        "description": "Prints file contents.",
        "helptopic": "Command usage:\ncat {path/file} - Prints the contents of a file.\n\nRoot user info:\nTo open a [re]hidden[/] file (marked with \"[re]*[/]\"), you must use \"[re]![/]\" before typing the file name.\nThat way, the filesystem knows it's a hidden file.\n\n\n[ye]MEOWOW- MEOWWW, MEW. MRRROWW :3 purrr...[/]\n...sorry, cat command.",
        "hidden": false,
        "run": CommandCat
    },
    {
        "name": "su",
        "description": "Change active user.",
        "helptopic": "Command usage:\nsu {user} {password?} - Changes the active user. Guest user has no password.\n\n<h4>P.S: Please [re]don't ruin the fun[/] by checking the terminal's source code for the passwords.\n\nIf you do that then um... no [ye]cookies[/] for you!\n\n...And, and you stink. Yeah. Yeah! ([gr]please[/])</h4>",
        "hidden": false,
        "run": CommandSU
    },
    {
        "name": "exit",
        "description": "Go back to ugdev.",
        "helptopic": "Command usage:\nexit - Goes back to <a href='https://ugdev.xyz'>ugdev.xyz</a>",
        "hidden": false,
        "run": CommandExit
    },
    {
        "name": "rainbow",
        "description": null,
        "helptopic": "Command usage:\n[re]r[/][or]a[/][ye]i[/][gr]n[/][lb]b[/][bl]o[/][pi]w[/] - Toggles on/off the terminal's [re]r[/][or]a[/][ye]i[/][gr]n[/][lb]b[/][bl]o[/][pi]w[/] effect.\nView everything like a [re]r[/][or]a[/][ye]i[/][gr]n[/][lb]b[/][bl]o[/][pi]w[/]!\n\n<h4>[re]I am not responsible for damaging your eyes.[/]</h4>",
        "hidden": true,
        "run": CommandRainbow
    },
    {
        "name": "uname",
        "description": null,
        "helptopic": "Wait... You shouldn't be seeing this!\n[re]<h3>You.</h3> <h2>Sneaky.</h2> <h1>Aren't you?</h1>[/]",
        "hidden": true,
        "run": CommandUname
    },
    {
        "name": "eos",
        "description": null,
        "helptopic": ":3",
        "hidden": true,
        "run": CommandEOS
    }
];
var users = [
    {
        "username": "guest",
        "color": null,
        "password": null
    },
    {
        "username": "root",
        "color": "or",
        "password": "*cm&9^v^dG&F*kbW!!&lu^"
    },
    {
        "username": "lumi",
        "color": "lb",
        "password": "&b**X&lw^YX&d!z^Y&X!Jl^YmlnY*&W5k*^c2!9m^dHB*he&X&Bhb!!G1*lMj!Bid*!W&Nr*c&zoz^"
    },
    {
        "username": "neoma",
        "color": "pi",
        "password": "*&U&El*O^^Sw*=!!^="
    },
    {
        "username": "ying",
        "color": "mg",
        "password": "*d!!2*^F&&!3^Y!Q^&=**="
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
                if (GetUserInput()) {
                    commandHistory.push(GetUserInput())
                    historyIndex = commandHistory.length;
                    CheckForCommand();
                }
                ClearUserInput();
                break;
        
            // Removes a letter
            case "Delete":
            case "Backspace":
                userInput.textContent = GetUserInput().slice(0, -1)
                break;
            
            // Autocomplete
            case "Tab":
                event.preventDefault();
                
                // User typed anything yet?
                let auto = GetUserInput().split(" ");
                if (!auto[auto.length - 1]) { closestAutocomplete = []; return; }
                ClearOutput();
                
                // Autocomplete?!
                if (auto[auto.length - 1] == closestAutocomplete[0]) {
                    userInput.textContent = GetUserInput().replace(new RegExp(closestAutocomplete[0] + '$'), closestAutocomplete[1]);
                    closestAutocomplete = [];
                }

                // Check for matching files in CURRENT FOLDER and store them
                let matching = Object.keys(os).filter(
                    entry => {
                        return entry.startsWith(auto[auto.length - 1]) && !(currentUser != "root" && entry.startsWith("!"));
                    }
                );
                    
                // Print all matches
                if (matching.length <= 0) return;
                closestAutocomplete = [auto[auto.length - 1], matching[0]];
                matching.forEach(
                    match => {
                        match = SetFileSyntax(match);
                        if (!match) return;
                        TypeOutput(`${match}\n`, false);
                    }
                );
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
            
            // Special keys
            default:
                // Clear terminal
                if ((event.ctrlKey || event.metaKey) && event.key == "l") {
                    event.preventDefault();
                    CommandClear();
                }
                break;
        }
    }
);

// Paste to terminal
document.addEventListener("paste", function (event) {
        userInput.textContent += event.clipboardData.getData('text/plain');
    }
)

// Copy terminal input
document.addEventListener("copy", function () {
        navigator.clipboard.writeText(userInput.textContent);
    }
)

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
            if (GetUserInput().toLowerCase().startsWith(command.name)) {
                if (command.run) command.run();
                validCommand = true;
                return;
            }
        }
    )

    // Command not found?
    if (!validCommand) TypeOutput(`[re]EOS: ${GetUserInput()} command not found.[/]`);
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
    // Apply color codes to the text.
    validColors.forEach(
        color => {
            let match = `${color}`; // /\[\w+\]/ regex
            content = content.replaceAll(RegExp(match, "g"), `<span class="${color.match(/\w+/)}">`);
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
    (doPermissions) ? TypeOutput(`[re]EOS: ${path}: Permission denied.[/] ${doPermissions}`) : TypeOutput(`[re]EOS: ${path}: No such file or directory.[/]`)
    CommandCD(currPath);
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
        if (path.includes("..")) { NoSuchFileOrDirectory(path, currentPath, false); return false; }
        
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
    let noPermission = null;
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
                    noPermission = `Allowed users: ${os[folder]["permissions"]["allowedUsers"].join(", ")}`;
                    os = undefined;
                    return;
                }
            }

            // No folder permissions? All good? Go right in!
            os = os[folder];
        }
    );
    
    // Check if path *was* valid
    if (os == undefined) { NoSuchFileOrDirectory(path, currentPath, noPermission); return false; }
    return path;
}

// Returns a file string with its correct syntax
function SetFileSyntax(file) {
    if (file == "permissions") return;

    // Is it a hidden file/folder?
    if (currentUser != "root" && file.startsWith("!")) return null;

    // File or folder?
    file = (/(\..+)/.test(file)) ?
    file : `[bl]${file}/[/]`;
    

    return file;
}

// Return the user's input as trimmed to avoid undefined errors.
function GetUserInput() {
    return userInput.textContent.trim();
}

// Apply the user's color and return it
function AddUsernameColor(user) {
    if (!user.color) return user.username;
    return StyleText(`[${user.color}]${user.username}[/]`);
}

// --------------------- COMMANDS ---------------------

// Help command
function CommandHelp() {
    let extensiveHelp = GetUserInput().split(" ")[1];
    
    // In depth command help
    if (extensiveHelp != undefined) {
        extensiveHelp = extensiveHelp.toLowerCase();

        // No help topic was found.
        let topic = commands.find(command => { return command.name == extensiveHelp; });
        if (!topic) {
            TypeOutput(`[re]EOS: No help topics match[/] '${extensiveHelp}'[re].[/]`)
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
    TypeOutput(GetUserInput().substring(
        GetUserInput().indexOf(' ') + 1));
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
    TypeOutput(AddUsernameColor(users.find(user => user.username == currentUser)));
}

// LS command, returns all files/folders in current directory.
function CommandLS() {
    let lsObjects = Object.keys(os);
    lsObjects.forEach(
        match => {
            // Prepare the file string
            match = SetFileSyntax(match);
            if (!match) return;

            // Sends the output
            TypeOutput(`${match}\n`, false)
        }
    );
}

// Changes directory to desired path
function CommandCD(forcePath = null) {
    let path = (forcePath) ? forcePath : (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    if (!path) return;

    // Navigate there
    path = path.toLowerCase();
    path = Pathing(path);
    if (!path) return;
    
    // Wtf stop dont do that
    if (/(\..+)/.test(path)) {
        TypeOutput("[re]EOS: Cannot CD into a file![/]");
        return;
    }
    
    // Update current path
    UpdateCurrentPath(path);
}

// Change users
function CommandSU() {
    let changeUser = (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    let passwordUser = (GetUserInput() == "") ? null : GetUserInput().split(" ")[2];
    let userToLoginAs = users.find(user => { if (changeUser) if (user.username == changeUser.toLowerCase()) return user });
    
    // Invalid user?
    if (!changeUser || !userToLoginAs) {
        TypeOutput(`[re]EOS: User[/] ${(!changeUser)? "" : changeUser} [re]does not exist.[/]`);
        return;
    }

    // Already logged in!
    if (userToLoginAs.username == currentUser) {
        TypeOutput(`[re]EOS: You are already logged in as ${currentUser}![/]`);
        return;
    }

    // Wrong password?
    if ((!passwordUser || ClearPassword(userToLoginAs.password) != window.btoa(passwordUser)) && userToLoginAs.password != null) {
        TypeOutput(`[re]EOS: Incorrect password.[/]`);
        return;
    }
    
    // Changes the user!
    currentUser = userToLoginAs.username;
    let stylizedUsername = AddUsernameColor(userToLoginAs);
    userHTML.innerHTML = `${stylizedUsername}@ugdev.xyz`;
    TypeOutput(`[gr]EOS: You are now logged in as[/] ${stylizedUsername}[gr]![/]`);
    
    // Changes the current path to the user's home.
    UpdateCurrentPath(`/home/${currentUser}`);
    CommandCD(`/home/${currentUser}`)

}

// Show the contents of a file.
function CommandCat() {
    let path = (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    if (!path) return;

    // Navigate there
    path = path.toLowerCase();
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

// Removes a file (not a folder!)
function CommandRM() {
    TypeOutput("[re]EOS: Out of service![/]");
    return;
}

// Touch a file (creates a text file)
function CommandTouch() {
    TypeOutput("[re]EOS: Out of service![/]");
    return;

    let file = (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    if (!file) return;

    // Naming rules
    if (file.includes("!") || file.includes("/") || file.includes("*"))
        { TypeOutput("[re]EOS: Invalid filename, cannot use '!', '/' or '*'.[/]"); return; }


    // Extension check (we dont want to create a folder...)
    if (!/(\..+)/.test(file))
        { TypeOutput("[re]EOS: Missing file extension.[/]"); return; }
        
    // Create the file
    structure[file] = (GetUserInput().split(" ")[2] == undefined) ? "" : GetUserInput().split(" ")[2];

    // // Navigate there
    // path = path.toLowerCase();
    // let check, errorType = Pathing(path, false);
    // if (!check && errorType != "doesNotExist") return;
    
    // // Get the file to create
    // let touchFile = path.split("/");
    // touchFile = touchFile.splice(touchFile.length - 1, 1).toString();

    // // Create the file
    // structure = (GetUserInput().split(" ")[2] == undefined) ? "" : GetUserInput().split(" ")[2];
    console.log(structure);
}

// Clears the terminal screen
function CommandClear() {
    output.textContent = "";
}

// Uname?
function CommandUname() {
    TypeOutput("EOS 4 bit system");
}

// EOS
function CommandEOS() {
    TypeOutput("Not yet.");
}

// Rainbow!!!!
function CommandRainbow() {
    if (document.body.style.animation != "") { TypeOutput("EOS: No more partying? :("); document.body.style.animation = ""; }
    else { TypeOutput("EOS: Let the party begin."); document.body.style.animation = "rainbow 2.5s linear infinite"; }
}