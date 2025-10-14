// god fuck you javascript
var rates = document.getElementsByClassName("rate");

for (let rate of rates) {
    let rating = rate.getAttribute("rating");
    
    for (let i = 0; i < rating; i++) {
        const ele = rate.children[i];
        ele.src = "assets/images/adc/Star_Filled.png"
        ele.classList = "on";
    }
}