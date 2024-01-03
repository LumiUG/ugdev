// Global variables
var userInput = document.getElementById("input");
var output = document.getElementById("output");
var keypressBlacklist = ["Enter", "Delete"]
var commandHistory = [];
var historyIndex = 0;
var commands = [
    { "name": "echo", "run": CommandEcho },
    { "name": "history", "run": CommandHistory },
    { "name": "exit", "run": CommandExit }
];

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
                if (userInput.textContent.trim()) commandHistory.push(userInput.textContent)
                historyIndex = commandHistory.length;
                ClearOutput();
                CheckForCommand();
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
function ClearOutput() { output.textContent = ""; }

// Checks for a command on screen
function CheckForCommand() {
    // Checks every command
    commands.forEach(
        command => {
            // Runs command if one of them passes the check, then breaks out
            if (userInput.textContent.startsWith(command.name)) {
                command.run();
                return;
            } else {
                // Command not found error
                // output.textContent = `bash: ${userInput.textContent} command not found`
            }
        }
    )
}


// --------------------- COMMANDS ---------------------

// Repeats something with user input
function CommandEcho() {
    output.textContent = userInput.textContent.substring(
        userInput.textContent.indexOf(' ') + 1);
}

// Shows a complete history of user commands
function CommandHistory() {
    commandHistory.forEach(
        function (used, i) {
            output.textContent += `${i}) ${used}\r\n`;
        }
    )
}

// Goes back to main website
function CommandExit() {
    output.textContent = "Have a nice day!";
    window.location.replace("https://ugdev.xyz");
}