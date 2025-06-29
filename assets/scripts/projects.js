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
    let elements = ["h3", "img", "p", "div"];
    let keys = ["name", "image", "desc", "links"];
    let extraClass = "";
    
    // Anything that isnt artwork generates here.
    for (const key in projects[id]) {
        // Set the default div(s).
        let projContainer = document.createElement("div");
        projContainer.classList += `${id} projContainer drop-blurry-black ${extraClass}`;
        if (isMobile()) projContainer.style.justifyContent = "center";
        projContainer.style.display = "none";

        // Iterate through the default values and generate the outcome.
        for (let i = 0; i < elements.length; i++) {
            if (!projects[id][key][keys[i]] && keys[i] != "links") continue;
            let toAdd = document.createElement(elements[i]);

            // Logic to add tags and elements.
            if (elements[i] == "img") AddImage(toAdd, id, key, keys, i);
            else if (elements[i] != "div") toAdd.innerHTML = projects[id][key][keys[i]];
            if (isMobile() && elements[i] == "p") {
                toAdd.style.maxWidth = "100%";
                toAdd.style.paddingRight = "0px";
                toAdd.style.textAlign = "center";
                toAdd.style.margin = "0px";
            }

            // Add buttons
            if (keys[i] == "links") {
                if (isMobile()) {
                    toAdd.style.position = "inherit";
                    toAdd.style.flexDirection = "row";
                    toAdd.style.width = "100%";
                    toAdd.style.maxWidth = "100%";
                    toAdd.style.gap = "20px";
                }

                toAdd.classList += "links";
                let buttons = ["website", "source"];
                for (let i = 0; i < buttons.length; i++) {
                    if (projects[id][key][buttons[i]]) {
                        let btn = document.createElement("a");
                        AddBtn(btn, buttons[i], projects[id][key][buttons[i]], id == "games");
                        toAdd.appendChild(btn);
                    }
                }
            }

            projContainer.append(toAdd);
        }
        toAppend.appendChild(projContainer);
    }
}

// Adds a src tag to an element.
function AddImage(toAdd, id, key, keys, i) {
    if (isMobile()) {
        toAdd.style.position = "inherit";
        toAdd.style.marginTop = "25px";
        toAdd.style.marginBottom = "25px";
        toAdd.style.padding = "0px";
    }

    toAdd.src = projects[id][key][keys[i]];
    if (projects[id][key]["tooltip"]) {
        AddTooltipEvent(toAdd, projects[id][key]["tooltip"]);
        toAdd.alt = projects[id][key]["tooltip"];
    }
}

// Adds a href to an <a> tag.
function AddA(toAdd, id, key, keys, i) {
    (keys[i] == "source") ? toAdd.innerText = "Click to view source code." : toAdd.innerText = "Click to view!";
    toAdd.target = "_blank";
    toAdd.rel = "noreferrer noopener";
    toAdd.href = projects[id][key][keys[i]];
}

// Adds a href to an <a> tag.
function AddBtn(toAdd, key, href, isGame) {
    (key == "source") ? toAdd.innerText = "Source Code" : toAdd.innerText = "Visit Website";
    if (isGame && key != "source") toAdd.innerText = "Play Game"
    
    toAdd.classList += "button drop-blurry-black";
    toAdd.style.fontSize = "20px";
    toAdd.style.textDecoration = "none";

    toAdd.target = "_blank";
    toAdd.rel = "noreferrer noopener";
    toAdd.href = href;
}

// Adds tooltip events to an element. Any element.
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

// Checks for browser mobile useragent
function isMobile()
{
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
}

showProject("games");