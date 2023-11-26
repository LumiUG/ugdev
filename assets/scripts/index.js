// JSON Imports.
import socials from '../data/socials.json' assert { type: 'json' };
import projects from '../data/projects.json' assert { type: 'json' };
import posts from '../data/blog.json' assert { type: 'json' };

// Update the random message.
const randMessages = ["Hello world.", "Why hello there- Welcome!", "Sure, I am '!positive' about it.", "How are you doing lil fella?", "Why is JS so weird?", "Motivation? What? What's that?", "Bring it on.", "Let's dance till' we're done.", "Am I dead or alive?", "\"So what do you do for a living?\"", "I believe in VSCode supremacy.", "\"Hey, this doesn't look as bad!\"", "404, page not fo- Oh, wait.", "You... Should buy Rain World.", "*slugcat falls cutely into the void*", "Please verify that you are not a robot.", "*BSOD appears*", "\"ug speak in vc\"", "\"I love digging graves\"", "\"Furries!\"", "STEEVOOOOOOOOOOOO-", "My brothee, ooh my brotheee.", "'Every pit is a chance for glory.' -DGR Dave", "What the cat?", "\"I must be one of the good ones™\"", "More random messages", "Oooh, I want to fall apart again...", "Do not hang up.", "It was... Perfect.", "From my Tower of Dreams, the things I see.", "Concentrate your energy in your heart.", "What awaits you below the bottom of the world?", "I am / Not what / I am", "That is incorrect, try again.", "Gender, and a Metal Bat.", "Ccompu-- uuu- computer is now-- computer is- machine.", "Fu-fu-funding for this program was made possible by by by by", "Fun-di-di-di-di-ding fo-o-o-o for the program program pro-o-o-gram", "Funding for the the wa possib-li viewers like you", "like you like you like you like you like you like you", "AT THE ENDDDDDD OF THE UNIVERSEEEEEEEE", "2, 1, 3, 4, 7, 11, 18...", "1, 1, 2, 3, 5, 8, 13...", "level by Bean", "Original message was deleted", "I was asleep", "stop it I hate it when you do that", "BALKAN GAMBIT", "\"that, word for wrod\"", "\"i have found the most bizarre bug ever\"", "\"Blueberry ice cream Saint\"", "Goldfish", "sina e wawa! <3", "you lost the game.", "...asking for a friend", "\"Hopefully this does not end like crimson\"", "\"i just got so many balls\"", "uh", "Jinxcat, you will be missed.", "\"vcf ydrxgedsr\"", "Hi, it's me, Ditko, just passing through", "meow meow meow mrrow mew", "\"Tried to save myself, but myself keeps slipping away\"", "SPACE BIRDS", "\"A copy of a copy of a\"", "LOOOOOOOOOOOOP", "\"Always breaking, always healing\"", "\"Oyasumi ooooooyasumi...\"", "\"Is this it, is it?\""];
function updateRandom(ele) {
    ele.firstElementChild.textContent = randMessages[Math.floor(Math.random() * randMessages.length)];
}

// Adds the event listenters to the buttons and builds all the projects.
let projectsList = Object.keys(projects).toString().split(",");
for (let key of projectsList) {
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
        else if (id == "games") noProjects.innerText = "Sorry! Nothing to see here yet, stay tuned for more.\nYou can check some cool indies in the meantime:\n\nhttps://store.steampowered.com/app/312520/Rain_World/\nhttps://store.steampowered.com/app/1400910/Soundodger_2/\nhttps://store.steampowered.com/app/977950/A_Dance_of_Fire_and_Ice/\nhttps://store.steampowered.com/app/420530/OneShot/\nhttps://store.steampowered.com/app/460950/Katana_ZERO/";
        else noProjects.innerText = "Sorry! Nothing to see here yet, stay tuned for more.\n(I hope...)";
        projContainer.appendChild(noProjects);
        toAppend.appendChild(projContainer);
    }
}
// Adds a src tag to an element.
function AddImage(toAdd, id, key, keys, i) {
    toAdd.src = projects[id][key][keys[i]];
    if (projects[id][key]["tooltip"]) {
        toAdd.title = projects[id][key]["tooltip"];
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

function genSocials() {
    let toAppend = document.getElementById("socialContainer");
    let elements = ["img", "a", "p"];
    let keys = ["logo", "username", "desc"];

    // Anything that isnt artwork generates here.
    for (const key in socials) {
        // Set the default div(s).
        let descDiv = document.createElement("div");
        let projContainer = document.createElement("div");
        projContainer.classList += `social drop-solid-black`;

        // Iterate through the default values and generate the outcome.
        for (let i = 0; i < elements.length; i++) {
            if (!socials[key][keys[i]]) continue;
            let toAdd = document.createElement(elements[i]);

            // Logic to add tags and elements.
            if (elements[i] == "img") {
                let innerLink = document.createElement("a");
                toAdd.src = socials[key][keys[i]];
                innerLink.href = socials[key]["hyperlink"];
                innerLink.rel = "noreferrer noopener";
                innerLink.target = "_blank";
                innerLink.appendChild(toAdd);
                projContainer.append(innerLink);
            }
            else {
                toAdd.href = socials[key]["hyperlink"];
                toAdd.innerText = socials[key][keys[i]];
                descDiv.append(toAdd);
            }
        }
        projContainer.append(descDiv);
        toAppend.appendChild(projContainer);
    }
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

// Builds the blog section.
function loadBlog() {
    let toAppend = document.getElementById("blog");
    let elements = ["h3", "div", "p"];
    let keys = ["title", "post", "date"];

    // Disallow view for mobile.
    if (isMobile()) {
        toAppend.style.textAlign = "center";
        let sorry = document.createElement("p");
        sorry.innerText = "Sorry! Viewing the blog in mobile is not supported right now :(";
        toAppend.appendChild(sorry);
        return;
    };
    
    for (const key in posts) {
        // Set the default div(s).
        let blogPost = document.createElement("div");
        blogPost.classList += `blogPost drop-blurry-black`;

        // Iterate through the default values and generate the outcome.
        for (let i = 0; i < elements.length; i++) {
            if (!posts[key][keys[i]]) continue;
            let toAdd = document.createElement(elements[i]);

            // Add an <img> if the post has it
            if (keys[i] != "post") toAdd.innerText = posts[key][keys[i]];
            else {
                let textList = posts[key][keys[i]].split(/{.*}/);
                let imageName = /{.*}/.exec(posts[key][keys[i]]);
                console.log(imageName)

                // Yoo images!!!
                let clickMe;
                if (imageName) {
                    clickMe = document.createElement("a");
                    let image = document.createElement("img");
                    image.src = `/assets/images/blog/${imageName[0].replace("{", "").replace("}", "")}.png`;
                    clickMe.href = image.src;
                    clickMe.appendChild(image);
                }
                
                // Text one.
                let textOne = document.createElement("p");
                textOne.innerText = textList[0];

                // Text two.
                let textTwo = document.createElement("p");
                textTwo.innerText = textList[1];

                // Adds everything.
                toAdd.append(textOne);
                if (imageName) {
                    toAdd.append(clickMe);
                    toAdd.append(textTwo);
                }
            }
            blogPost.append(toAdd);
        }
        toAppend.appendChild(blogPost);
    }
}

function isMobile() {
    return /Android|iPhone/i.test(navigator.userAgent)
}


// Run some code a single time when the website loads. To be honest, I should make this into an onload()!
genSocials();
loadBlog();
showProject("misc");
updateRandom(document.getElementById("randMessage"));
document.getElementById("randMessage").addEventListener("click", function () { updateRandom(this) }, false);
