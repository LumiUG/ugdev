/*
    Hey, I've worked really hard on this.
    If you're looking to skip content, or datamine keys/files...
    Don't! There's a lot of things that are better experienced without doing this.

    That being said, there are tons of secrets and little quirks everywhere
    and I feel like you'd be missing out if you checked for user passwords,
    hidden commands or just the entire .json folder structure.

    That being said... Have fun! Enjoy viewing my spaghetti code <3
    (I love spaghetti code)
*/

// JSON Imports:
//   The entire os structure path + permissions, if you're interested.
//   I recommend not viewing this, and I would like to ask for you to not talk
//   about anything, or use whatever you found while investigating.
//   Thank you! <3
var structure = await fetch('/assets/data/terminal/structure.json')
    .then((response) => response.json())
    .then((data) => { return data });

// Global variables
var userHTML = document.getElementById("user");
var pathHTML = document.getElementById("path");
var userInput = document.getElementById("input");
var output = document.getElementById("output");
var blinkLine = document.getElementById("blink");
var validColors = ["\\[re\\]", "\\[gr\\]", "\\[bl\\]", "\\[ye\\]", "\\[pi\\]", "\\[lb\\]", "\\[or\\]", "\\[lg\\]", "\\[mg\\]", "\\[rw\\]", "\\[gh\\]"];
var keypressBlacklist = ["Enter", "Delete"];
var closestAutocomplete = [];
var availableKeys = ["maze", "slug", "light", "lab", "universe"];
var keySolutions = ["209", "cat", "dark", "carlsagan", "ego"];
var createdKeys = [];
var currentUser = "guest";
var currentPath = "/home/guest";
var commandHistory = [];
var historyIndex = 0;
var eggCount = 0;
var currentAudio = null;
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
        "helptopic": "Command usage:\necho <text> - Displays a line of text. HTML and color codes supported!\n\n[re]Color[/] [ye]codes[/] [gr]usage[/]:\nUse [bl][][/] with a valid color to apply it.\nThen, use [bl][>/<][/] to mark the end of the coloring.\nNote: you must remove the \"[bl]><[/]\" in order for color codes to work (it was a showcase!!)\n\nValid colors:\n- Red: [re]re[/]\n- Green: [gr]gr[/]\n- Blue: [bl]bl[/]\n- Yellow: [ye]ye[/]\n- Orange: [or]or[/]\n- Pink: [pi]pi[/]\n- Light blue: [lb]lb[/]\n- Light grey: [lg]lg[/]\n- Muted green: [mg]mg[/]\n\nExample (Removing \"><\"):\n- [>re<]Hey[>/<] [>lb<]there![>/<]\n- [re]Hey[/] [lb]there![/]",
        "hidden": false,
        "run": CommandEcho
    },
    {
        "name": "history",
        "description": "Display the history list.",
        "helptopic": "Command usage:\nhistory - Displays your past commands.\n\nTerminal tip:\nYou can use the [gr]UP[/]/[re]DOWN[/] arrow keys to navigate through your recently used commands.",
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
        "helptopic": "Command usage:\nclear - Clears your terminal screen.\n\nUseful tips:\nDid you know that you can press [gr]CTRL[/]+[gr]L[/] to clear your terminal screen?\nPressing enter also clears your terminal. Oh, the wonders of technology.",
        "hidden": false,
        "run": CommandClear
    },
    {
        "name": "ls",
        "description": "List directory contents.",
        "helptopic": "Command usage:\nls - Lists all the [re]visible[/] files on your terminal.\n\nDisplay rules:\n- [bl]Folder[/]: \"/\"\n- [gr]Image[/]: \".png/webp/gif/ico\"\n- [ye]Hidden file[/] (root only): \"!\"",
        "hidden": false,
        "run": CommandLS
    },
    {
        "name": "cd",
        "description": "Change the working directory.",
        "helptopic": "Command usage:\ncd {path/folder} - Changes the working directory to the specified directory.\n[bl]Absolute[/] and [bl]relative[/] paths are allowed!\nYou can also \"[gr]cd ..[/]\"!\n\nAutocomplete:\nYou can press [gr]TAB[/] to show the nearest files on your CURRENT directory, press it again, and it'll autocomplete to the first result. Neat!\n\nFolder permissions:\n- [bl]User-based[/]: The current logged user is only allowed into its own [gr]/home[/] folder.\nAnd, of course, everyone can use the [gr]/home/guest[/] folder.\n\nAn example would be:\nUser \"[lb]lumi[/]\" can access [gr]/home/lumi[/] and [gr]/home/guest[/], but would [re]NOT[/] be able to access [re]/home/root[/].",
        "hidden": false,
        "run": CommandCD
    },
    // {
    //     "name": "rm",
    //     "description": "Removes files. (TODO)",
    //     "helptopic": "Command usage:\nrm {file} - Removes a file from the filesystem.",
    //     "hidden": true, // hidden as per TODO's
    //     "run": CommandRM
    // },
    // {
    //     "name": "touch",
    //     "description": "Creates files. (TODO)",
    //     "helptopic": "Command usage:\ntouch {file} {content?} - Creates a file with (optionally) content inside of it.",
    //     "hidden": true, // hidden as per TODO's
    //     "run": CommandTouch
    // },
    {
        "name": "cat",
        "description": "Prints file contents.",
        "helptopic": "Command usage:\ncat {path/file} - Prints the contents of a file.\n\nRoot user info:\nTo open a [re]hidden[/] file (marked with \"[re]*[/]\"), you must use \"[re]![/]\" before typing the file name.\nThat way, the filesystem knows it's a hidden file.[ye]\n\n\nMEOWOW- MEOWWW, MEW. MRRROWW :3 purrr...[/]\n...sorry, cat command.",
        "hidden": false,
        "run": CommandCat
    },
    {
        "name": "imcat",
        "description": "Shows image on screen.",
        "helptopic": "Command usage:\nimcat {path/file} - Shows image on the terminal screen.\n\nRoot user info:\nTo open a [re]hidden[/] file (marked with \"[re]*[/]\"), you must use \"[re]![/]\" before typing the file name.\nThat way, the filesystem knows it's a hidden file.[ye]",
        "hidden": false,
        "run": CommandIMCat
    },    {
        "name": "play",
        "description": "Play a song.",
        "helptopic": "Command usage:\play {file} - TBD",
        "hidden": false,
        "run": CommandPlay
    },
    {
        "name": "sign",
        "description": "Sign a key.",
        "helptopic": "Command usage:\nsign {key} {value} - \"Creates\" a signed key with the specified value, usually used to access signed folders.\n\nThis might not look too clear, here's an example:\n> \"[or]sign lab carlsagan[/]\".\n\nThe command [re]will fail[/] if the key doesn't exist, or the key's value is incorrect.\nThink of it like a [gr]password[/]!",
        "hidden": false,
        "run": CommandSign
    },
    {
        "name": "su",
        "description": "Change active user.",
        "helptopic": "Command usage:\nsu {user} {password?} - Changes the active user. Guest user has no password.",
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
        "name": "eos",
        "description": null,
        "helptopic": "Displays information about the current operating sytem.",
        "hidden": true,
        "run": CommandEOS
    },
    {
        "name": "avali",
        "description": null,
        "helptopic": "Toggle avali scratch as the main terminal font.\n\n<span style='font-family: avaliScratch;'>Chirp!</span>",
        "hidden": true,
        "run": CommandAvaliScratch
    },
    {
        "name": "bird",
        "description": null,
        "helptopic": "Meet [lb]the bird[/].\n<img src='/assets/images/artwork/lumi/wiggle.gif'>",
        "hidden": true,
        "run": CommandBird
    },
    {
        "name": "egg",
        "description": null,
        "helptopic": "Where do chickens come from?\n...What about space chickens?\n\nI wonder if they have space KFC's.\nActually, I'd rather not know.",
        "hidden": true,
        "run": CommandEgg
    }
];
var users = [
    {
        "username": "guest",
        "color": null,
        "password": null,
        "home": "/home/guest"
    },
    {
        "username": "root",
        "color": "or",
        "password": "*cm&9^v^dG&F*kbW!!&lu^",
        "home": "/home/root"
    },
    {
        "username": "lumi",
        "color": "lb",
        "password": "&b**X&lw^YX&d!z^Y&X!Jl^YmlnY*&W5k*^c2!9m^dHB*he&X&Bhb!!G1*lMj!Bid*!W&Nr*c&zoz^",
        "home": "/home/lumi"
    },
    {
        "username": "neoma",
        "color": "pi",
        "password": "*&U&El*O^^Sw*=!!^=",
        "home": "/home/neoma"
    },
    {
        "username": "sickle",
        "color": "mg",
        "password": "*d!!2*^F&&!3^Y!Q^&=**=",
        "home": "/home/sickle"
    }
]

// Run on start
if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent)) document.getElementById("mobile").style.display = "flex";
CommandCD("/home/guest");

// Post command?
let postCMD = new URLSearchParams(window.location.search).getAll("cmd");
if (postCMD.length == 1) {
    userInput.textContent = postCMD[0];
    CheckForCommand();
    userInput.textContent = "";
}


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
                ClearOutput();
                
                // User typed anything yet?
                let auto = GetUserInput().split(" ");
                if (!auto[auto.length - 1]) {
                    closestAutocomplete = [];
                    CommandLS();
                    return;
                }
                
                // Autocomplete?!
                if (auto[auto.length - 1] == closestAutocomplete[0]) {
                    userInput.textContent = GetUserInput().replace(new RegExp(closestAutocomplete[0] + '$'), closestAutocomplete[1]);
                    closestAutocomplete = [];
                }

                // Check for matching files in CURRENT FOLDER and store them
                let matching = Object.keys(os).filter(
                    entry => {
                        return entry.startsWith(auto[auto.length - 1]) && !(currentUser != "root" && entry.startsWith("!") && entry != "permissions");
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
    pathHTML.innerHTML = StyleText(CustomFolder(newPath, true));
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

// Navigate and check that a path is valid.
function Pathing(path) {
    let pathAsArray;

    // Clear multiple "/" in path 
    path = path.replace(/\/{2,}/, "/").toLowerCase();
    
    // Go back a directory
    if (path == "..") {
        if (currentPath == "/") { NoSuchFileOrDirectory(path, currentPath); return false; }
        let backOneDir = currentPath.split("/").slice(0, -1).join("/");
        if (backOneDir == "") backOneDir = "/";
        Pathing(backOneDir);
        return backOneDir;
    }

    // Absolute path
    if (path.startsWith("/")) {        
        // Do the thing
        pathAsArray = ["/"].concat(path.split("/").filter(i => i));
        ResetOS();
    }
    
    // Relative path
    else {
        // Do the thing
        pathAsArray = path.split("/").filter(i => i);
        path = (currentPath == "/") ? `${currentPath}${path}` : `${currentPath}/${path}`;
    }

    // Find if the path is valid and navigate there
    let noPermission = null;
    pathAsArray.some(
        folder => {
            if (os == undefined) return;
            
            // Does the folder exist
            if (folder == "permissions" || !os.hasOwnProperty(folder))
            {
                os = undefined;
                return;
            }

            // Is it a file?
            if (/(\..+)/.test(folder)) return;

            // Folder permissions? (Doing a guard case here doesnt work ?????)
            if (os[folder].hasOwnProperty("permissions")) {
                // Is the current user inside the allowed users list?
                if (os[folder]["permissions"].hasOwnProperty("allowedUsers")) {
                    if (!os[folder]["permissions"]["allowedUsers"].includes(currentUser) && !path.includes("/public"))
                    {
                        noPermission = `Allowed users: ${os[folder]["permissions"]["allowedUsers"].join(", ")}`;
                        os = undefined;
                        return;
                    }
                }
    
                // Password protected? (Not buggy anymore!)
                if (os[folder]["permissions"].hasOwnProperty("password"))
                {
                    if (!createdKeys.find(key => { return key == os[folder]["permissions"]["password"] }))
                    {
                        noPermission = `Unsigned key. Please sign key \"${os[folder]["permissions"]["password"]}\" before connecting.`;
                        os = undefined;
                        return;
                    }
                }
            }

            // Updates path.
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
        (!FileIsImage(file)) ?
            `[gr]${file}[/]` : CustomType(file)
        : CustomFolder(file);

    return file;
}

function CustomFolder(text, isPath = false) {
    // Custom handling for paths, make into a for loop with two []'s later?
    if (isPath)
    {
        if (text.includes("universe")) text = text.replace("universe", `[rw]universe[/]`);
        if (text.includes("tobedetermined")) text = text.replace("tobedetermined", `[rw]tobedetermined[/]`);
        if (text.includes("devoid")) text = text.replace("devoid", `[lg]devoid[/]`);
        if (text.includes("avalon")) text = text.replace("avalon", `[lb]avalon[/]`);
        return text;
    }

    // Normally print (eg: ls)
    if (text == "universe" || text == "tobedetermined") return `[rw]${text}/[/]`;
    else if (text == "devoid") return `[lg]${text}/[/]`;
    else if (text == "avalon") return `[lb]${text}/[/]`;
    return `[bl]${text}/[/]`;
}

function CustomType(file)
{
    if (file.endsWith(".wav")) file = `[gr]${file}[/]`
    if (file.endsWith(".chat")) file = `[lg]${file}[/]`
    return file
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

// Checks if a file ends with an image extension
function FileIsImage(file) {
    return !file.endsWith("png") && !file.endsWith("webp") && !file.endsWith("gif") && !file.endsWith("ico");
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
    TypeOutput(">> [lb]Last updated: 23/08/2025 (Earth Time-Scale)[/] <<\n");
    if (currentUser != "root") TypeOutput(">> [or]Log in as root to view full list.[/] <<\n\n", false);
    commands.forEach(
        command => {
            if (!command.hidden || currentUser == "root")
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

// Sign
function CommandSign() {
    let key = (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    let value = (GetUserInput() == "") ? null : GetUserInput().toLowerCase().split(" ")[2];
    if (key == null) { TypeOutput("[re]EOS: Please enter a valid key![/]"); return; }
    if (createdKeys.find(stored => { return stored == key })) { TypeOutput("[re]EOS: Specified key has already been signed.[/]"); return; }
    if (value == null) { TypeOutput("[re]EOS: Please enter a value![/]"); return; }

    let i = availableKeys.findIndex(stored => { return stored == key });
    if (i == -1) { TypeOutput("[re]EOS: Invalid key. No key was found with that name.[/]"); return; }
    if (keySolutions[i] != value ) { TypeOutput("[re]EOS: Incorrect value. Key was not signed.[/]"); return; }
    TypeOutput(`[gr]EOS: Key \"[/]${key}[gr]\" was created and signed correctly.[/]`);
    createdKeys.push(key);
}

// Play
function CommandPlay()
{
    TypeOutput("[re]EOS: Out of service![/]");
    return;

    let path = (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    if (!path) { TypeOutput("[re]EOS: Please specify a file![/]"); return; }

    // Navigate there
    path = path.toLowerCase();
    path = Pathing(path);
    if (!path) return;
    
    // Get the file to cat later
    let soundPath = path.split("/");
    soundPath = soundPath.splice(soundPath.length - 1, 1).toString();
    if (!/(\..+)/.test(soundPath)) { TypeOutput("[re]EOS: That isn't a file.[/]"); return; };
    
    let sound = os[soundPath];
    
    // Terminate old sound
    if (currentAudio != null)
    {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Play new sound.
    currentAudio = new Audio(sound);
    currentAudio.loop = true;
    currentAudio.play();
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
    if (lsObjects.length <= 0) TypeOutput("[re]EOS: This folder is empty.[/]");
}

// Changes directory to desired path
function CommandCD(forcePath = null) {
    let path = (forcePath) ? forcePath : (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    if (!path) { TypeOutput("[re]EOS: Please specify a folder![/]"); return; }

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
    if (changeUser == "-") changeUser = "root";
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
    UpdateCurrentPath(userToLoginAs.home);
    CommandCD(userToLoginAs.home);
}

// Show the contents of a file.
function CommandCat() {
    let path = (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    if (!path) { TypeOutput("[re]EOS: Please specify a file![/]"); return; }

    // Navigate there
    path = path.toLowerCase();
    path = Pathing(path);
    if (!path) return;
    
    // Get the file to cat later
    let catFile = path.split("/");
    catFile = catFile.splice(catFile.length - 1, 1).toString();
    if (!/(\..+)/.test(catFile)) { TypeOutput("[re]EOS: That isn't a file.[/]"); return; };

    // CAT THE FILE!!! MEOWW MRROW MRRPT MEOWWWWWWW
    let contents = os[catFile];
    TypeOutput(contents);
}

// Shows an image
function CommandIMCat() {
    let path = (GetUserInput() == "") ? null : GetUserInput().split(" ")[1];
    if (!path) { TypeOutput("[re]EOS: Please specify a file![/]"); return; }

    // Navigate there
    path = path.toLowerCase();
    path = Pathing(path);
    if (!path) return;
    
    // Get the file to cat later
    let catFile = path.split("/");
    catFile = catFile.splice(catFile.length - 1, 1).toString();
    
    // Check for a valid file extension
    if (FileIsImage(catFile)) {
        TypeOutput("[re]EOS: Invalid file extension, please select a valid image.[/]");
        return;
    }

    // IMCAT THE FILE!!! 
    let contents = `<img src="${os[catFile]}">`;
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

// Egg OS
function CommandEOS() {
    TypeOutput(`&nbsp;&nbsp;,'"\`.&nbsp;&nbsp;&nbsp; ${AddUsernameColor(users.find(user => user.username == currentUser))}@██████
    &nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp; ---------------
    :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; OS: Egg x16
    :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; Model: ██████ (Modified)
    &nbsp;\`.___,'&nbsp;&nbsp; Kernel: A1.Z26-Generic
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Uptime: Unknown
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Packages: 12.9_7.8.20 (KEY)
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Shell: Intact
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Resolution: ${window.screen.availHeight}x${window.screen.availWidth}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Terminal: ████ ████
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CPU: Value 4-1███, Model 18-11 ███
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GPU: None
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Memory: 502MiB / 1024MiB`);
}

// Rainbow!!!!
function CommandRainbow() {
    if (document.body.style.animation != "") { TypeOutput("EOS: No more partying? :("); document.body.style.animation = ""; }
    else { TypeOutput("EOS: Let the party begin."); document.body.style.animation = "rainbow 2.5s linear infinite"; }
}

// Avali scratch command
function CommandAvaliScratch() {
    if (document.body.style.fontFamily == "Ubuntu Mono" || document.body.style.fontFamily == "") { document.body.style.fontFamily = "avaliScratch"; TypeOutput("Enjoy!\n\nCredits to <a href='https://fontstruct.com/fontstructions/show/1108804/avali_scratch'>SomeGuyNamedDavid</a>"); }
    else { document.body.style.fontFamily = "Ubuntu Mono"; TypeOutput("Alright, alright."); }
}

// bird secret page
function CommandBird() {
    window.location.replace("https://ugdev.xyz/bird");
}

// egg command
function CommandEgg() {
    eggCount++;
    TypeOutput(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp;,'"\`.&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp&nbsp;\`.___,'`);
    if (document.body.style.animation != "") TypeOutput(`\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The egg dances...`, false)
    else TypeOutput(`\nYou have witnessed the egg ${eggCount} time(s).`, false)
}