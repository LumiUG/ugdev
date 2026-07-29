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
    "My brothee, ooh my brotheee.", // Jazz Emu - My Brothe
    "\"Every pit is a chance for glory.\"",
    "What the cat?",
    "I must be one of the good ones™", // Jazz Emu - One of the good ones
    "More random messages",
    "Oooh, I want to fall apart again...", // Frums - Absolute Zero
    "Do not hang up.",  // Frums - Wavetapper
    "It was... Perfect.", // Frums - Pictured as Perfect
    "From my Tower of Dreams, the things I see.",  // Frums - Tower of Dreams
    "Concentrate your energy in your heart.",  // Frums - Living Will
    "What awaits you below the bottom of the world?", // Frums - Overdead
    "I am / Not what / I am",  // Frums - My Capacitance
    "That is incorrect, try again.", // Frums - Nisemono
    "Ccompu-- uuu- computer is now-- computer is- machine.",  // Frums - I FORGOT
    "Fu-fu-funding for this program was made possible by by-",  // Frums - Credits
    "Fun-di-di-di-di-ding fo-o-o-o for the program-",  // Frums - Credits
    "Funding for the the wa possib-li viewers like you",  // Frums - Credits
    "like you like you like you like you like you like you",  // Frums - Credits
    "AT THE ENDDDDDD OF THE UNIVERSEEEEEEEE",  // Frums - Absolute Zero
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
    "Tried to save myself, but myself keeps slipping away", // Nine Inch Nails - Into the Void
    "SPACE BIRDS",
    "A copy of a copy of a", // Nine Inch Nails - Copy of a
    "LOOOOOOOOOOOOP",
    "Always breaking, always healing", // Alexander Panos - always breaking, always healing
    "Oyasumi ooooooyasumi...", // Bo en - My Time
    "Is this it, is it?", // Garlagan - Is This It Is It
    "His name is Meem.",
    "Oh, and the cat, it's Ploof.",
    "And this just feels like spinning plates.", // Radiohead - Like Spinning Plates
    // "\"How much dressing can you put in a salad before it becomes a soup?\"",
    "\"I love blankets\"",
    "\"don't say anything.\"",
    "That there, that's not me.", // Radiohead - How to dissapear completely
    "There was nothing to fear and nothing to doubt.", // Radiohead - Pyramid Song 
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
    "i hold on i hold i hold on",
    "Our memories... make it... endless.",
    "Per aspera, ad astra.",
    "the \"bird\" command, of course",
    "I dream in black and white.",
    "See it all through laser eyes.",
    "\"fart flower light baby\"",
    "O---- holy shit The Witness",
    "All of the birds sing to me", // Nest - Everything Falls Apart
    "Everything stops, everything falls apart.", // Nest - Everything Falls Apart
    "@everyone curse of candlekeep",
    "katana",
    "13 30 32",
    "RECRUDESCENT",
    "How dapper of you.",
    "happy new year",
    "happy halloween",
    "Restless, Treacherous, Your Heart, Lies.", // Carousel - Hush!
    "You're watching me spread my golden wings.", // Dark Blossom - Fireworks
    "And I'll light fireworks with their blood.", // Dark Blossom - Fireworks
    "Let's put your heart back together.", // Dark Blossom - Dark Heart
    "Dark angels will run with scissors-", // Dark Blossom - Crimson Dance
    "And I don't want to be someone that you don't know.", // Dark Blossom - &sleep
    "Why Oh You Are LOVE", // Everhood OST
    "Hear its roar.",
    "Hekki grace.",
    "Hekki allmo.",
    "There is a star and a star and a dangerous gravity.",
    "For me and me and me and me?",
    "And we will help, in any way we can.", // DM Dokuro - the beacon
    "SO I REJECT YOUR GRIM COLLAPSE", // DM Dokuro - the beacon
    "THE SIGNAL'S SENT, AND YOU'RE TOO LATE-", // DM Dokuro - the beacon
    "Have you forgotten that I've done this all before?!", // DM Dokuro - STILL HERE
    "Growing spineless day by day, Watching as your mind decays-", // DM Dokuro - STILL HERE
    "Insanity consuming that which I have come to be.", // DM Dokuro - the momentary highs, the unfathomable lows
    "Friday nights, foggy streets and christmas lights.", // Glass Beach - classic j dies and goes to hell part 1
    "We're still here, can you hear me?", // Glass Beach - orchids
    "As the starlight just fades out, there's no tears no celebration.", // Glass Beach - orchids
    "Hold me underwater, in your sweet embrace.", // Glass Beach - commatose
    "Send every message as an SOS, SOS.", // Glass Beach - commatose
    "Goodnight.",
    "soooo... when do you get a job?",
    "\"double and give it to the next person\"",
    "AI \"art\" isnt real art.",
    "You can do anything.",
    "Love you!",
    "\"brick this guy\"",
    "\"Sir, there's been a second Lumi.\"",
    "wawawawawawawa",
    "yip yip yip yip",
    "awawawawawawawa",
    "\"vcf hg\"",
    "Press F5?",
    // "Half Sun Games.....",
    "Did you check out my games yet?",
    ":3",
    ":3c",
    ">:3c",
    "CSS is <span style='position: relative; top: -20px;'>hard</span>",
    "<marquee>weeeeeeee</marquee>",
    // "<img src='/assets/images/favicon.png'/>",
    "<img src='/assets/images/artwork/lumi/wiggle.gif' style='height: auto'/>",
    "Like a firebird, just burn it all away",
    "Strong enough to forge my destiny",
    "Gone caving.", // CAVES
    "I wonder what's outside my box?", // CAVES
    "Bold of you to think you'll collect all of you!", // CAVES
    "Dance, dance the pain away~", // CAVES
    "Can you feel it? No, you don't.", // CAVES
    "Only time will tell. And you've got a lot of that.", // CAVES
    "Isn't it a beautiful dance?", // CAVES
    "I guess it is, until your legs give out.", // CAVES
    "Turn back? Aren't I too deep in?", // CAVES
    "Pull me out until I can feel again.", // CAVES
    "What if you were nothing?", // CAVES
    "Is your light strong enough?", // CAVES
    "[You dream of purpose.]", // CAVES
    "Turn into a tempest, violent, silent in the eye.", // FLAVOR FOLEY - weathergirl
    "\"And the idea changes you in turn.\"",
    "There's something fundamental I can't bear", // Jamie Paige - Little Secret
    "Tell me quietly so I can't hear you", // Jamie Paige - Little Secret
    "So believe me when I say that you are a new heart", // postergirlxoxo - <3
    "All of this turbulence wasn't forecasted", // Bury Me At Makeout Creek - Last Words of a Shooting Star
    "Nothing ever happens, oh", // Jamie Paige - Nothing Ever
    "I wish that I could fall, but only truly backwards", // Constant Companions - I Wish That I Could Fall
    "Can you hear me softly singing?", // Constant Companions - Breeze Blows
    "Cuz you're not a real musician", // can opener's notebook: fish whisperer - you're not a real musician
    "Won't you make a wish, my dear? There's a shooting star out tonight.", // can opener's notebook: fish whisperer - ANGELFISH
    "And all my friends could see it, and all my friends knew", // 867 - January
    "Driving through Houston, we have a problem", // Sings: The Inimitable Sound of Archie Henderson - Driving Through Houston
    "Heart attacks, yeah every single day now!", // Silly Love Songs For Unfortunate Breakups - Power Walker
    "Blurring out the dreams we had and all the time with you" // UNBEATABLE (ALBUM) - NO SIGNAL
];

var tooltip = document.getElementById("tooltip");
function updateRandom(ele) {
    if (!ele) return;
    ele.firstElementChild.innerHTML = randMessages[Math.floor(Math.random() * randMessages.length)];
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
                toAdd.alt = key;
                innerLink.href = socials[key]["hyperlink"];
                innerLink.rel = "noreferrer noopener";
                innerLink.target = "_blank";
                innerLink.appendChild(toAdd);
                projContainer.append(innerLink);
            }
            else {
                toAdd.href = socials[key]["hyperlink"];
                toAdd.innerText = socials[key][keys[i]];
                toAdd.rel = "noreferrer noopener";
                toAdd.target = "_blank";
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
