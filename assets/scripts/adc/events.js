// CLASSES AND STUFF //
class DialogScriptable
{
    // Scriptable settings
    dialog = [];
    events = [];
    textSpeed = 0.05;
    canBeSkipped = true;
}

// Dialog events
class DialogEvent
{
    // textSpeedEvent = null;
    setTileEvent = new EventSetTile();
    executeAtIndex = 0;
}

// Required to have Run() or something idk
// class EventAction
// {
//     enabled = false;
// }

// Change text speed
class EventTextSpeed
{
    textSpeed = 0.05;
}

// Set a tile
class EventSetTile {
    enabled = false;
    setAs = 0;
    position = {"x": 0, "y": 0};
    delete = false;
}

// {
//  "dialog":["Custom dialog scriptables!!"]
    // ,"events":[
        // {
        // "setTileEvent":{
            // "enabled":true,
            // "setAs":0,
            // "position":{
            //      "x":0,
            //      "y":0
            // },
            // "delete":false
            // },
            // "executeAtIndex":0
        // }
    // ],
    // "textSpeed":0.05,
    // "canBeSkipped":true
// }
// ;SPRITE;0-1;0-1


// ["Wall", "AntiWall", "Box", "Circle", "Hexagon", "Mimic", "Area", "InverseArea", "OutboundArea", "Hazard", "Void", "Invert", "Arrow", "NegativeArrow", "Orb", "Fragment", "Level", "Hologram", "NPC", "Fake"]
var objectTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

var dialogElementList = []
var dialogHTML = document.getElementById("dialogs");
var dialogQuantity = document.getElementById("dialogQuantity");
EditDialog(true);

var textSpeedHTML = document.getElementById("textSpeed");
var canBeSkippedHTML = document.getElementById("canBeSkipped");
textSpeedHTML.value = 0.05;

var eventElementList = []
var eventHTML = document.getElementById("appendHere");
var eventQuantity = document.getElementById("eventQuantity");

document.getElementById("export").addEventListener("click", function () { ExportEvent(); });
document.getElementById("moreDialog").addEventListener("click", function () { EditDialog(true); });
document.getElementById("lessDialog").addEventListener("click", function () { EditDialog(false); });
document.getElementById("moreEvents").addEventListener("click", function () { EditEvent(true); });
document.getElementById("lessEvents").addEventListener("click", function () { EditEvent(false); });

function ExportEvent()
{
    let dialog = new DialogScriptable();
    dialogElementList.forEach(e => { dialog.dialog.push(SanitizeText(document.getElementById(e).value)); });
    dialog.textSpeed = Number(textSpeedHTML.value);
    if (canBeSkippedHTML.value == "on") dialog.canBeSkipped = true;
    else dialog.canBeSkipped = false;
    
    dialog.events.push(new DialogEvent());
    
    navigator.clipboard.writeText(JSON.stringify(dialog));
    console.log(JSON.stringify(dialog));
}

// Remove any and ALL ";", as its used with text slicing.
function SanitizeText(text)
{
    return text.replaceAll(";", "");
}

function EditDialog(toggle)
{
    if (toggle)
    {
        if (dialogElementList.length >= 8) return; // Capped at 8

        let newInput = document.createElement("input");
        newInput.type = "text";
        newInput.class = "dialog";
        newInput.id = `dial${dialogElementList.length + 1}`

        dialogHTML.insertBefore(newInput, dialogQuantity);
        dialogElementList.push(newInput.id);
        return;
    }

    if (dialogElementList.length == 0) return; // At least 1
    dialogHTML.removeChild(document.getElementById(dialogElementList[dialogElementList.length - 1]));
    dialogElementList.pop();
}

function EditEvent(toggle)
{
    if (toggle)
    {
        if (eventElementList.length >= 6) return; // Capped at 6

        // Holder
        let eventHolder = document.createElement("span");
        eventHolder.classList += "event";
        eventHolder.id = `event${eventElementList.length + 1}`

        // Enabled
        let enabledEle = document.createElement("input");
        enabledEle.type = "checkbox";

        // Tile type
        let tileEle = document.createElement("input");
        tileEle.type = "number";
        tileEle.value = 0;

        // Position
        let posHolder = document.createElement("span");
        let xEle = document.createElement("input");
        let yEle = document.createElement("input");
        xEle.type = "number";
        yEle.type = "number";
        xEle.value = 0;
        yEle.value = 0;
        posHolder.appendChild(xEle);
        posHolder.appendChild(yEle);

        // Delete
        let deleteEle = document.createElement("input");
        deleteEle.type = "checkbox";

        // Execute at
        let execEle = document.createElement("input");
        execEle.type = "number";
        execEle.value = 0;

        // Put it all together
        eventHolder.appendChild(GroupElements("Event enabled?", enabledEle));
        eventHolder.appendChild(GroupElements("Tile to create?", tileEle));
        eventHolder.appendChild(GroupElements("Position", posHolder));
        eventHolder.appendChild(GroupElements("Delete/Create (T/F)", deleteEle));
        eventHolder.appendChild(GroupElements("Execute at index", execEle));

        // Everything else
        eventHTML.appendChild(eventHolder);
        eventElementList.push(eventHolder.id);
        return;
    }

    if (eventElementList.length == 0) return; // At least 1
    eventHTML.removeChild(document.getElementById(eventElementList[eventElementList.length - 1]));
    eventElementList.pop();
}

function GroupElements(text, element)
{
    let holder = document.createElement("span");
    holder.classList += "group";

    let comment = document.createElement("h3");
    comment.textContent = text;
    
    holder.appendChild(comment);
    holder.appendChild(element);
    return holder;
}