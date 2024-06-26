// why am i like this
// ITS 2AM AND THIS SOUNDS FUNNY AS HELL I GOTTA DO IT LMAOO
// im so silly.
// please help me i want to sleep
// NO SLEEP .

// variables
var favicon = document.getElementById("favicon");
var BIRDUP = document.getElementById("BIRDUP");
var boopArea = document.getElementById("boopArea");
var messageField = document.getElementById("messageField");
var counter = document.getElementById("counter");
var clicks = 0;

// setup
boopArea.addEventListener("click", () => { ClickEvent(); })
var moveTimer = setInterval(function () { MoveMessage(); }, 550);

// haha boop click click boop hehehehehe
function ClickEvent()
{
    clicks++;
    // initial click
    if (clicks <= 1) {
        document.body.style.backgroundImage = "url('/assets/images/artwork/lumi/wiggle.gif')";
        favicon.setAttribute("href", "/assets/images/artwork/lumi/wiggle.gif")
        messageField.style.opacity = 1;
        BIRDUP.style.opacity = 1;
        counter.style.opacity = 1;
        document.title = "BIRD UP"
    }

    // clicks
    switch (clicks) {
        case 2: messageField.textContent = "boops?"; break;
        case 10: messageField.textContent = "keep,,"; break;
    }

    // new boop !!
    counter.textContent = `Boops: ${clicks}`;
}

// WEE
function MoveMessage() {
    messageField.style.top = Math.random() * screen.height * 0.80 + "px";
    messageField.style.left = Math.random() * screen.width * 0.90 + "px";
}