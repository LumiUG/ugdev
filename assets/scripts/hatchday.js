// JSON Imports.
var birthdays = await fetch('/assets/data/birthdays.json')
    .then((response) => response.json())
    .then((data) => { return data; });

var bdElements = [];
var bdDates = [];

// Add the birthdays
for (let bd in birthdays) {
    if (birthdays[bd]["timestamp"] == null) continue;

    // Create elements
    let element = document.createElement("h2");
    let time = new Date(birthdays[bd]["timestamp"] * 1000);

    // Append to DOM and save to list
    element.textContent = bd + GetFormattedDate(time);
    document.body.appendChild(element);
    bdElements.push(element);
    bdDates.push(time);
}

// Count down
var intervalTimer = setInterval(function () { Tick() }, 1000);

// Count a second
function Tick() {
    for (let i = 0; i < bdElements.length; i++) {
        bdElements[i].textContent = GetFormattedDate(bdDates[i])
    }
}

// Returns a formatted date
function GetFormattedDate(date)
{
    if (!date) return null;
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}