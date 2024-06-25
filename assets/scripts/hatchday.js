// JSON Imports.
var birthdays = await fetch('/assets/data/birthdays.json')
    .then((response) => response.json())
    .then((data) => { return data; });

// Do the things
for (let birthday in birthdays) {
    let ele = document.createElement("p");
    ele.textContent = birthdays[birthday]["timestamp"];
    document.body.appendChild(ele);
}