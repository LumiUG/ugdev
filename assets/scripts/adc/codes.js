// Code inputting
var view = document.getElementById("input");
var isInputting = false;
var code = "";

document.body.addEventListener("keydown",
    function (event) {
        if (!isInputting && event.code != "Space") return;

        event.preventDefault();
        if (code.length >= 100) return;

        switch (event.code) {
            case "Space":
                window.scrollTo(0, document.body.scrollHeight);
                isInputting = true;
                break;
            
            case "ArrowUp":
                view.innerText += "↑";
                code += "U";
                break;     
            
            case "ArrowDown":
                view.innerText += "↓";
                code += "D";
                break;          
            
            case "ArrowLeft":
                view.innerText += "←";
                code += "L";
                break;     
            
            case "ArrowRight":
                view.innerText += "→";
                code += "R";
                break;
        }

        ValidateCode();
    }
);

document.body.addEventListener("keyup",
    (event) => {
        if (event.code != "Space") return;
        
        isInputting = false;
        view.innerText = "";
        code = "";
    }
);

function ValidateCode()
{
    if (window.btoa(window.btoa(code)) == "VlVSTVVreFNWVkk9") { view.innerText = "There's no bonuses in here."; isInputting = false; }
    else if (window.btoa(window.btoa(code)) == "VEV4TVVsSlNSRVJFVlZWVg==") { view.innerText = "\"Devoid\" is what you're looking for."; isInputting = false; }
    else if (code == "ULDLULDLURURULURDRULULURULDLURUULURDRDRURDLDRURRDRURDRURRDLDLDRDRDLLDRDLDRURDRURRDDLURULDLULULURRULU") { view.innerText = "No, that's the wrong game."; isInputting = false; }
}