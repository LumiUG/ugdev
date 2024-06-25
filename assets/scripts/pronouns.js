// JSON Imports.
var names = await fetch('/assets/data/pronouns.json')
    .then((response) => response.json())
    .then((data) => { return data });

// Defines types and its data
var types = {
    "yes": {
        "image": "/assets/images/pronouns/heart.svg",
        "hover": "Perfect <3"
    },
    "okay": {
        "image": "/assets/images/pronouns/thumbsup.svg",
        "hover": "This is alright!"
    },
    "no": {
        "image": "/assets/images/pronouns/thumbsdown.svg",
        "hover": "Try not to, okay anyways!"
    },
    "joke": {
        "image": "/assets/images/pronouns/joke.svg",
        "hover": "If said jokingly."
    },
    "close": {
        "image": "/assets/images/pronouns/close.svg",
        "hover": "IYKYK, nuh uh if you don't."
    },
    "sona": {
        "image": "/assets/images/pronouns/paw.svg",
        "hover": "LUMII HII LUMI LUMIIII"
    }
}

// Creates HTML based on json (why do I always do this...)
var tooltip = document.getElementById("tooltip");
var elements = Array.from(document.body.getElementsByTagName("section"));
elements.forEach(element => ProcessSection(element));

// Extra (words section)
names = names["words"] // This is a bit hacky, but it works LMAO
Array.from(document.body.getElementsByClassName("wordsExtra"))
    .forEach(element => ProcessSection(element));

// Populates a section
function ProcessSection(base)
{
    let sectionName = base.firstElementChild.textContent.toLowerCase();
    Object.keys(names[sectionName]).forEach(entry => CreateEntry(entry, sectionName, base.children[1]));
}

// Populates a list
function CreateEntry(entryName, sectionName, list)
{
    // Create span entry
    let entry = document.createElement("span");
    entry.classList += "entry";

    // Create img
    let image = document.createElement("img");
    image.classList += names[sectionName][entryName]["type"];
    image.src = types[names[sectionName][entryName]["type"]]["image"];
    image.alt = "bleh";

    // Create p
    let text = document.createElement("p");
    text.classList += names[sectionName][entryName]["type"];
    text.textContent = entryName.replace("*", "");

    // Append everything to the DOM
    AddTooltipEvent(text, types[names[sectionName][entryName]["type"]]["hover"])
    entry.appendChild(image);
    entry.appendChild(text);
    list.appendChild(entry);
}

// Code from index.html, I am NOT making cross site stuff.
export function AddTooltipEvent(toAdd, tooltipContent) {
    ["mouseover", "click"].forEach(event => {
        toAdd.addEventListener(event, () => {
            let rect = toAdd.getBoundingClientRect();
            tooltip.style.display = "block";
            toAdd.parentElement.append(tooltip);
            tooltip.textContent = tooltipContent;
            tooltip.style.top = rect.top + 25 + "px";
            tooltip.style.left = rect.left - tooltip.offsetWidth / 2 + 20 + "px";
        })
    });
    toAdd.addEventListener("mouseleave", () => { tooltip.style.display = "none";  });
}