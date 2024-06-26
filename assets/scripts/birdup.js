// why am i like this
// ITS 2AM AND THIS SOUNDS FUNNY AS HELL I GOTTA DO IT LMAOO
// im so silly.
// please help me i want to sleep
// NO SLEEP .

// variables
var BIRDUP = document.getElementById("BIRDUP");
var boopArea = document.getElementById("boopArea");
var counter = document.getElementById("counter");
var clicks = 0;

// setup
boopArea.addEventListener("click", () => { ClickEvent(); })

// haha boop click click boop hehehehehe
function ClickEvent()
{
    clicks++;
    // initial click
    if (clicks <= 1) {
        document.body.style.backgroundImage = "url('/assets/images/artwork/lumi/wiggle.gif')";
        document.title = "BIRD UP"
        BIRDUP.style.opacity = 1;
        counter.style.opacity = 1;
    }

    if (clicks == 10) 

    // new boop !!
    counter.textContent = `Boops: ${clicks}`;
}