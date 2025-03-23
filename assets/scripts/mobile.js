// Checks for browser mobile useragent
function isMobile()
{
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
}

if (isMobile())
{
    // Nav bar (global)
    var nav = document.getElementById("doors");
    if (nav != null)
    {
        nav.style.display = "flex";
        nav.style.flexWrap = "wrap";
        nav.style.flexDirection = "column";
        nav.style.justifyContent = "center"
        nav.style.alignItems = "center";
        nav.style.padding = "10px";
        
        document.getElementById("separator").style.height = "50px";
        let doors = document.querySelectorAll(".door");
        for (let i = 0; i < doors.length; i++) {
            doors[i].style.fontSize = "25px";
            doors[i].style.padding = "15px 20px 15px 20px";
        };
    }

    // Background (global)
    document.querySelector("body").style.backgroundSize = "100%";

    // Page Specific changes (too lazy to do one script for each) //

    // INDEX.HTML //
    if (document.title.toLowerCase().includes("home"))
    {
        document.getElementById("randMessage").remove();
        document.getElementById("adText").remove();
        document.getElementById("socials").style.marginTop = "10px";
    
        let h2 = document.querySelectorAll("h2");
        for (let i = 0; i < h2.length; i++) {
            h2[i].style.fontSize = "40px";
        };
        
        // var socials = document.querySelectorAll("social");
        // for (let i = 0; i < social.length; i++) {
        //     social[i].style.width = "250px";
        // };
    }

    // ABOUT.HTML //
    else if (document.title.toLowerCase().includes("about"))
    {
        // About section
        document.getElementById("title").style.position = "initial";
        let showcase = document.getElementById("showcase");
        showcase.style.position = "initial";
        showcase.style.width = "300px";

        let together = document.getElementById("together");
        together.style.alignItems = "center";
        together.style.textAlign = "center";
        together.style.flexDirection = "column";

        let paragraph = document.querySelectorAll(".aboutBody");
        for (let i = 0; i < paragraph.length; i++) {
            console.log(paragraph[i]);
            paragraph[i].style.marginLeft = "20px";
            paragraph[i].style.marginRight = "20px";
            paragraph[i].style.width = "90%";
        };

        // Preferences section
        document.getElementById("preferences").style.padding = "0px 10% 0px 10%";

        // Characters section
        let refs = document.querySelectorAll(".refsheet");
        for (let i = 0; i < refs.length; i++) {
            refs[i].style.width = "100%";
        };
    }

    // ABOUT.HTML //
    else if (document.title.toLowerCase().includes("blog"))
    {
        // Modal stuff
        document.getElementById("postTime").style.marginTop = "25px";
        let post = document.getElementById("post");
        post.style.width = "90%";
        post.style.left = "5%";
    }
}