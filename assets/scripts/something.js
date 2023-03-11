const m1 = [
	"",
	"Hello",
	"'Something' is going on here.",
	"You might wanna...",
	"Check back later?",
	"",
	"",
	"There's nothing else in here for you.",
	"This'll be 'something' in the future.",
	"But for now, you should leave.",
	"",
	"",
	"",
	"What are you waiting for, now?",
	"",
	"Really, don't you have better stuff to do?",
	"If not, I guess we are on the same boat.",
	"Let's see...",
	"Tell me your name.",
	"",
	"Right, I'm only text.",
	"",
	"",
	"So...",
	"Did you know?",
	"I spent two hours on this.",
	"Two hours on this little page.",
	"Originally, I intended for it to have a 'typing' effect.",
	"But oh well, I had to scrap that.",
	"It's better off this way anyways.",
	"",
	"You know what?",
	"Since you've been here for so long...",
	"I'll tell you a secret:",
	"This will (most likely) be the home for a secret project.",
	"The 'Sanguso Project'.",
	"",
	"",
	"Alright, I'm bored.",
	"Better go do something productive!",
	"",
	"Oh right! Before leaving you here by yourself...",
	"I completly forgot, sorry, haha.",
	"I just wanted to thank you for staying.",
	"That's about it.",
	"See ya around!",
	"<3",
	"<3",
	"<3",
	"<3",
	"(I mean it)"
];

var index = 0;
function sendMessage(messages) {
	if (index < messages.length) {
		// Updates the content of the <p> tag.
		let currMsg = messages[index];
		document.getElementById("narrator").innerHTML = currMsg;
		index++;

		// Text actions
		if (currMsg == "Two hours on this little page.") document.getElementsByTagName("body")[0].style.color = "red";
		else if (currMsg == "Originally, I intended for it to have a 'typing' effect.") document.getElementsByTagName("body")[0].style.color = "white";
		else if (currMsg == "I just wanted to thank you for staying.") document.getElementById("heart").style.display = "inline";
		return
	}
	// Stops the setInterval.
	clearInterval(intervalTimer);
};

// Sends the messages in the "m1" list.
var intervalTimer = setInterval(function () { sendMessage(m1) }, 250); //4250