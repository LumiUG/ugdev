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
        "hover": "Try not to! (I will bite)"
    },
    "joke": {
        "image": "/assets/images/pronouns/joke.svg",
        "hover": "If said jokingly :>c"
    },
    "close": {
        "image": "/assets/images/pronouns/close.svg",
        "hover": "Only if you know. Nuh uh if you don't."
    },
    "sona": {
        "image": "/assets/images/pronouns/paw.svg",
        "hover": "LUMII HII LUMI BIRD LUMIIII"
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

// Bi flag (important)
AddTooltipEvent(document.getElementById("bi"), "HELLO MY BI PEOPLE ILY YALL");
AddTooltipEvent(document.getElementById("pan"), "...The BI flag is cooler.");
document.body.addEventListener("scroll", () => { tooltip.style.display = "none"; }, {passive: true});

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
    let tooltipContent = types[names[sectionName][entryName]["type"]]["hover"];
    if (names[sectionName][entryName].hasOwnProperty("hover")) tooltipContent = names[sectionName][entryName]["hover"]
    AddTooltipEvent(text, tooltipContent)
    entry.appendChild(image);
    entry.appendChild(text);
    list.appendChild(entry);
}

// Code from index.html, I am NOT making cross site stuff.
function AddTooltipEvent(toAdd, tooltipContent) {
    ["mouseover", "click"].forEach(event => {
        toAdd.addEventListener(event, () => {
            let rect = toAdd.getBoundingClientRect();
            tooltip.style.display = "block";
            toAdd.parentElement.append(tooltip);
            tooltip.textContent = tooltipContent;
            tooltip.style.top = rect.top - 60 + window.scrollY + "px";
            tooltip.style.left = rect.left - 60 + "px";
        })
    });
    toAdd.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
}