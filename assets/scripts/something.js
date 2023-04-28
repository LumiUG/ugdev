const m1 = [
	"",
	"Been a while, crocodile-",
	"Okay, I'm just playing with you.",
	"Whatever was supposed to happen",
	"has already happened >:3",
	"So um... just enjoy yourself!",
	"Here, take another heart!",
	"Now leave, and have an amazing day,",
	"because you are valid and deserve it <3",
	"See ya around. Toodle pip!",
	"",
	"",
	"<3"
];

var index = 0;
function sendMessage(messages) {
	if (index < messages.length) {
		// Updates the content of the <p> tag.
		let currMsg = messages[index];
		document.getElementById("narrator").innerHTML = currMsg;
		index++;

		// Text actions
		if (currMsg == "Here, take another heart!") document.getElementById("heart").style.display = "inline";
		return
	}
	// Stops the setInterval.
	clearInterval(intervalTimer);
};

// Sends the messages in the "m1" list.
var intervalTimer = setInterval(function () { sendMessage(m1) }, 4250);