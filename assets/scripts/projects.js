// JSON imports
var projects = await fetch('/assets/data/projects.json')
    .then((response) => response.json())
    .then((data) => { return data });

// Adds the event listenters to the buttons and builds all the projects.
let projectsList = Object.keys(projects).toString().split(",");
for (let key of projectsList) {
    if (key == "art") continue; // temporary
    document.getElementById(key).addEventListener("click", function () { showProject(key) }, false);
    GenProjects(key);
}

// Builds the "Projects" section.
function GenProjects(id) {
    let toAppend = document.getElementById("projects");
    let elements = ["h3", "img", "p", "a", "a"];
    let keys = ["name", "image", "desc", "website", "source"];
    let extraClass = "";

    // Art uses different entries.
    if (id == "art") {
        keys = ["name", "image", "timestamp", "program"];
        elements = ["h3", "img", "p", "p"];
        extraClass = " artContainer";
    }

    // Anything that isnt artwork generates here.
    for (const key in projects[id]) {
        // Set the default div(s).
        let projContainer = document.createElement("div");
        projContainer.classList += `${id} projContainer drop-blurry-black${extraClass}`;
        projContainer.style.display = "none";

        // Iterate through the default values and generate the outcome.
        for (let i = 0; i < elements.length; i++) {
            if (!projects[id][key][keys[i]]) continue;
            let toAdd = document.createElement(elements[i]);

            // Logic to add tags and elements.
            if (elements[i] == "img") AddImage(toAdd, id, key, keys, i);
            else if (elements[i] == "a") AddA(toAdd, id, key, keys, i);
            else toAdd.innerText = projects[id][key][keys[i]];

            projContainer.append(toAdd);
        }
        toAppend.appendChild(projContainer);
    }
    // If the json is empty, we create a "sorry" message. Aw...
    if (Object.keys(projects[id]).length === 0) {
        let projContainer = document.createElement("div");
        projContainer.classList = `${id} projEmpty`;
        projContainer.style.display = "none";

        let noProjects = document.createElement("p");
        if (id == "music") noProjects.innerText = "Sorry! Nothing to see here yet, stay tuned for more.\nYou can check some cool artists in the meantime:\n\nhttps://soundcloud.com/frums\nhttps://www.youtube.com/@Cametek.CamelliaOfficial\nhttps://soundcloud.com/jazzemu";
        else noProjects.innerText = "Sorry! Nothing to see here yet, stay tuned for more.";
        projContainer.appendChild(noProjects);
        toAppend.appendChild(projContainer);
    }
}

// Adds a src tag to an element.
function AddImage(toAdd, id, key, keys, i) {
    toAdd.src = projects[id][key][keys[i]];
    if (projects[id][key]["tooltip"]) {
        AddTooltipEvent(toAdd, projects[id][key]["tooltip"]);
        toAdd.alt = projects[id][key]["tooltip"];
    }
}

// Adds a href to an <a> tag.
function AddA(toAdd, id, key, keys, i) {
    (keys[i] == "source") ? toAdd.innerText = "Click me to view the repository!" : toAdd.innerText = "Check out the website!";
    toAdd.target = "_blank";
    toAdd.rel = "noreferrer noopener";
    toAdd.href = projects[id][key][keys[i]];
}

// Adds tooltip events to an element. Any element.
function AddTooltipEvent(toAdd, tooltipContent) {
    ["mouseover", "click"].forEach(event => {
        toAdd.addEventListener(event, () => {
            tooltip.style.display = "block";
            toAdd.parentElement.append(tooltip);
            tooltip.style.top = toAdd.offsetTop + toAdd.style.offsetHeight + "px";
            tooltip.style.left = toAdd.offsetLeft + toAdd.style.offsetWidth + "px";
            tooltip.textContent = tooltipContent;
        })
    });
    toAdd.addEventListener("mouseleave", () => { tooltip.style.display = "none";  });
}

// Turns on/off a project. (called by click events)
function showProject(id) {
    if (document.getElementById(id).classList.contains(`selected {id.charAt(0).toUpperCase() + id.slice(1)}`)) return;
    let projects = document.getElementById("projects");
    let btns = document.getElementById("buttons");

    // Change selected button.
    for (let btn of btns.children) {
        btn.classList.remove(`selected${btn.id.charAt(0).toUpperCase() + btn.id.slice(1)}`);
        if (btn.id == id) btn.classList += " " + `selected${id.charAt(0).toUpperCase() + id.slice(1)}`;
    }

    // Show/Hide projects.
    for (let main of projects.children) {
        if (main.classList.contains(id)) main.style.display = "flex";
        else main.style.display = "none";
    }
}

showProject("games");