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
    if (window.btoa(window.btoa(code)) == "VlVSTVVreFNWVkk9") { view.innerText = "Hold onto this for a while. It'll make sense."; isInputting = false; }
    else if (code == "ULDLULDLURURULURDRULULURULDLURUULURDRDRURDLDRURRDRURDRURRDLDLDRDRDLLDRDLDRURDRURRDDLURULDLULULURRULU") { view.innerText = "Woah..."; isInputting = false; }
}