// JSON Imports.
var socials = await fetch('/assets/data/socials.json')
    .then((response) => response.json())
    .then((data) => { return data });

// Update the random message.
const randMessages = [
    "Hello world.",
    "Why hello there- Welcome!",
    "Sure, I am \"!positive\" about it.",
    "How are you doing lil fella?",
    "Why is JS so weird?",
    "Motivation? What? What's that?",
    "Bring it on.",
    "Let's dance till' we're done.",
    "Am I dead or alive?",
    "\"So what do you do for a living?\"",
    "I believe in VSCode supremacy.",
    "\"Hey, this doesn't look as bad!\"",
    "404, page not fo- Oh, wait.",
    "You... Should buy Rain World.",
    "*slugcat falls cutely into the void*",
    "Please verify that you are not a robot.",
    "*BSOD appears*",
    "\"ug speak in vc\"",
    "\"I love digging graves\"",
    "\"Furries!\"",
    "STEEVOOOOOOOOOOOO-",
    "My brothee, ooh my brotheee.",
    "\"Every pit is a chance for glory.\"",
    "What the cat?",
    "\"I must be one of the good ones™\"",
    "More random messages",
    "Oooh, I want to fall apart again...",
    "Do not hang up.",
    "It was... Perfect.",
    "From my Tower of Dreams, the things I see.",
    "Concentrate your energy in your heart.",
    "What awaits you below the bottom of the world?",
    "I am / Not what / I am",
    "That is incorrect, try again.",
    "Ccompu-- uuu- computer is now-- computer is- machine.",
    "Fu-fu-funding for this program was made possible by by-",
    "Fun-di-di-di-di-ding fo-o-o-o for the program-",
    "Funding for the the wa possib-li viewers like you",
    "like you like you like you like you like you like you",
    "AT THE ENDDDDDD OF THE UNIVERSEEEEEEEE",
    "2, 1, 3, 4, 7, 11, 18...",
    "1, 1, 2, 3, 5, 8, 13...",
    "level by Bean",
    "Original message was deleted",
    "I was asleep",
    "stop it I hate it when you do that",
    "BALKAN GAMBIT",
    "\"that, word for wrod\"",
    "\"i have found the most bizarre bug ever\"",
    "\"Blueberry ice cream Saint\"",
    "Goldfish",
    "sina e wawa! <3",
    "you lost the game.",
    "...asking for a friend",
    "\"Hopefully this does not end like crimson\"",
    "\"i just got so many balls\"",
    "uh",
    "Jinxcat, you will be missed.",
    "\"vcf ydrxgedsr\"",
    "Hi, it's me, Ditko, just passing through",
    "meow meow meow mrrow mew",
    "\"Tried to save myself, but myself keeps slipping away\"",
    "SPACE BIRDS",
    "\"A copy of a copy of a\"",
    "LOOOOOOOOOOOOP",
    "\"Always breaking, always healing\"",
    "\"Oyasumi ooooooyasumi...\"",
    "\"Is this it, is it?\"",
    "His name is Meem.",
    "Oh, and the cat, it's Ploof.",
    "And this just feels like spinning plates.",
    // "\"How much dressing can you put in a salad before it becomes a soup?\"",
    "\"I love blankets\"",
    "\"don't say anything.\"",
    "That there, that's not me.",
    "There was nothing to fear and nothing to doubt.",
    "commence the mass stoning.",
    "\"snit now im hungry\"",
    "\"SHUAH\"",
    "\"i want to kill rabbits now\"",
    "Poli my beloved.",
    "<3",
    "Encore! Encore! Encore!",
    "Chirp chirp chirp chirp chirp",
    "Tax time!",
    "Place your faith and embrace the Void.",
    "You do remember why you are here, right?",
    "Or have you lost something?",
    "Something very important to you.",
    "i hold on i hold i hold on",
    "the \"bird\" command, of course",
    "I dream in black and white",
    "\"fart flower light baby\"",
    "O---- holy shit The Witness",
    "All of the birds sing to me",
    "Everything stops, everything falls apart."
];

var tooltip = document.getElementById("tooltip");
function updateRandom(ele) {
    if (!ele) return;
    ele.firstElementChild.textContent = randMessages[Math.floor(Math.random() * randMessages.length)];
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
        if (isMobile()) projContainer.style.width = "250px";

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

// Checks for browser mobile useragent
function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
}

// Run some code a single time when the website loads. To be honest, I should make this into an onload()!
genSocials();
updateRandom(document.getElementById("randMessage"));
document.getElementById("randMessage")?.addEventListener("click", function () { updateRandom(this) }, false);
