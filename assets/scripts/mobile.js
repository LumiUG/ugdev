// Checks for browser mobile useragent
function isMobile()
{
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
}

// Export personal 88x31 banger
function eight831()
{
    navigator.clipboard.writeText('<a href="https://ugdev.xyz"><img src="https://ugdev.xyz/assets/images/graphics/ugdev.png" alt="ugdev.xyz"></a>')
    
    // Effect
    let banner = document.getElementById("own8831");
    banner.style.animation = "";
    banner.offsetHeight; // trigger reflow
    banner.style.animation = "2s copyBanner normal";
}

if (isMobile())
{
    // Page Specific changes (too lazy to do one script for each) //

    // INDEX.HTML //
    if (document.title.toLowerCase().includes("home"))
    {
        document.getElementById("randMessage").remove();
        document.getElementById("adText").remove();
    }

    // ABOUT.HTML //
    // else if (document.title.toLowerCase().includes("about")) { }

    // BLOG.HTML //
    // else if (document.title.toLowerCase().includes("blog")) { }

    // ADC.HTML //
    // else if (document.title.toLowerCase().includes("directionless")) { }

    // 404.HTML //
    else if (document.title.toLowerCase().includes("404"))
    {
        // Custom texts
        let text = document.querySelectorAll("custom");
        text[0].style.setProperty("--size", "60px");
        text[1].style.setProperty("--size", "40px");
    }
        
    // eugene.HTML //
    else if (document.title.toLowerCase().includes("eugene"))
    {
        document.getElementsByTagName("html")[0].style.fontSize = "4vw";

        // Everything idk
        let image = document.getElementsByTagName("img")[0];
        image.style.top = "36%";
        image.style.left = "38%";
        image.style.height = "200px";

        document.getElementById("top").style.left = "8%";
        document.getElementById("bottom").style.left = "30%";

        let link = document.getElementsByTagName("a")[0];
        link.style.top = "44%";
        link.style.left = "14%";
        link.style.fontSize = "8vw"
    }
}
