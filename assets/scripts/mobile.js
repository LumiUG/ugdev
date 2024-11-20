// Checks for browser mobile useragent
function isMobile() {
    return /Android|iPhone|iPad/i.test(navigator.userAgent);
}

if (isMobile())
{
    // Nav bar
    var nav = document.getElementById("doors");
    if (nav != null) {
        nav.style.display = "flex";
        nav.style.flexWrap = "wrap";
        nav.style.flexDirection = "column";
        nav.style.justifyContent = "center"
        nav.style.alignItems = "center";
        nav.style.padding = "10px";
        
        document.getElementById("separator").style.height = "50px";
        var doors = document.querySelectorAll(".door");
        for (let i = 0; i < doors.length; i++) {
            doors[i].style.fontSize = "25px";
            doors[i].style.padding = "15px 20px 15px 20px";
        };
    }

    // index.html's stuff
    var socials = document.getElementById("socials");
    if (socials != null) {
        document.getElementById("randMessage").remove();
        document.getElementById("adText").remove();
        socials.style.marginTop = "10px";
        // bird.style.left = "0px";
    
        var h2 = document.querySelectorAll("h2");
        for (let i = 0; i < h2.length; i++) {
            h2[i].style.fontSize = "40px";
        };
        
        // var socials = document.querySelectorAll("social");
        // for (let i = 0; i < social.length; i++) {
        //     social[i].style.width = "250px";
        // };
    }
}