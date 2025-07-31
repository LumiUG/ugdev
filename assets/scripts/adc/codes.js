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
                document.body.style.boxShadow = "0px 0px 100px 10px rgba(255, 255, 255, 0.28)";
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
        
        document.body.style.boxShadow = "";
        isInputting = false;
        view.innerText = "";
        code = "";
    }
);

function ValidateCode()
{
    if (window.btoa(window.btoa(code)) == "VlVSTVVreFNWVkk9") { view.innerText = "There's no bonuses in here."; isInputting = false; }
    else if (window.btoa(window.btoa(code)) == "VEV4TVVsSlNSRVJFVlZWVg==") { view.innerText = "\"Devoid\" is what you're looking for."; isInputting = false; }
    else if (code == "DDUR") { view.innerText = "Chess Battle Advanced."; isInputting = false; }
    else if (code == "DUDLRLUDLR") { view.innerHTML = "Come on, <a href='https://docs.google.com/spreadsheets/d/1aBWS_-CLZzMZaXhWAYaLY-1-AB9PVJm2QYKIGADLiUY/edit'>get to it</a>."; isInputting = false; }
    else if (code == "UDLRLDUR") { view.innerText = "Let chaos reign! ...Or something like that?"; isInputting = false; }
    else if (code == "RLDDU") { view.innerText = "Gummi! We all love gummi in here."; isInputting = false; }
    else if (code == "RUUUD") { view.innerText = "Strangely, there's bitten RAM on the floor. Oh, and I can smell burning toast too."; isInputting = false; }
    else if (code == "URDLDRUL") { view.innerHTML = "<img src='/assets/images/artwork/lumi/wiggle.gif' style='width:140px'>"; isInputting = false; }
    else if (code == "ULDLULDLURURULURDRULULURULDLURUULURDRDRURDLDRURRDRURDRURRDLDLDRDRDLLDRDLDRURDRURRDDLURULDLULULURRULU") { view.innerText = "No, that's the wrong game."; isInputting = false; }
}