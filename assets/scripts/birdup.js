// why am i like this
// ITS 2AM AND THIS SOUNDS FUNNY AS HELL I GOTTA DO IT LMAOO
// im so silly.
// please help me i want to sleep
// NO SLEEP .

// variables
var favicon = document.getElementById("favicon");
var BIRDUP = document.getElementById("BIRDUP");
var lumi = document.getElementById("lumi");
var boopArea = document.getElementById("boopArea");
var messageField = document.getElementById("messageField");
var counter = document.getElementById("counter");
var clicks = 0;

// setup
boopArea.addEventListener("click", () => { ClickEvent(); })
var moveTimer = setInterval(function () { MoveMessage(); }, 750);

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
    if (clicks % 10 === 0 && (clicks < 120 || clicks > 1000)) { messageField.textContent += " chirp"; }
    else if (clicks == 140) { messageField.textContent = "OKAY I GET IT HELLO"; }
    else if (clicks == 180) { messageField.textContent = "stop?"; }
    else if (clicks == 240) { messageField.textContent = "...chirp?"; }
    else if (clicks == 333) { messageField.textContent = "i beg of you, 100 boops were more that enough."; }
    else if (clicks == 370) { messageField.textContent = "-w-"; }
    else if (clicks == 410) { messageField.textContent = "this is nice."; }
    else if (clicks == 460) { messageField.textContent = "... but im actually getting tired of writing stuff."; }
    else if (clicks == 500) { messageField.textContent = "you know, it'd be funny to add a lot of text to make it harder for you to boop lumi, yep, that'd be very annoying i bet!"; }
    else if (clicks == 555) { messageField.textContent = "okay, okay. give me another 100 boops <3"; }
    else if (clicks == 666) { messageField.textContent = "oooh 666 boops. scary, don't you think? >:3c"; }
    else if (clicks == 720) { messageField.textContent = "i appreciate you still clicking, but, please dont get carpal tunnel."; }
    else if (clicks == 777) { messageField.textContent = "... well."; }
    else if (clicks == 844) { messageField.textContent = "We're nearing the end."; }
    else if (clicks == 920) { messageField.textContent = "Remember this longing."; }
    else if (clicks == 1000) { messageField.textContent = "...let's get to chirping. <3"; }

    // jump effect
    lumi.classList.remove("lumijump");
    lumi.offsetHeight; // reflow, i hate js.
    lumi.classList.add("lumijump");

    // new boop !!
    counter.textContent = `Boops: ${clicks}`;
}

// WEE
function MoveMessage() {
    messageField.style.top = Math.random() * document.body.offsetHeight - messageField.offsetHeight + "px";
    messageField.style.left = Math.random() * document.body.offsetWidth - messageField.offsetWidth + "px";

    // check and correct
    if (messageField.style.top.split("px")[0] < 0) messageField.style.top = "0px";
    if (messageField.style.left.split("px")[0] < 0) messageField.style.left = "0px";
}