// JSON imports
var posts = await fetch('/assets/data/blog.json')
    .then((response) => response.json())
    .then((data) => {return data});

// Builds the blog section.
function loadBlog() {
    let toAppend = document.getElementById("blog");
    let elements = ["h3", "div", "p"];
    let keys = ["title", "post", "date"];

    // Disallow view for mobile.
    if (isMobile()) {
        toAppend.style.textAlign = "center";
        let sorry = document.createElement("p");
        sorry.innerText = "Sorry! Viewing the blog in mobile is not supported right now :(";
        toAppend.appendChild(sorry);
        return;
    };
    
    for (const key in posts) {
        // Set the default div(s).
        let blogPost = document.createElement("div");
        blogPost.classList += `blogPost drop-blurry-black`;

        // Iterate through the default values and generate the outcome.
        for (let i = 0; i < elements.length; i++) {
            if (!posts[key][keys[i]]) continue;
            let toAdd = document.createElement(elements[i]);

            // Add an <img> if the post has it
            if (keys[i] != "post") toAdd.innerText = posts[key][keys[i]];
            else {
                let textList = posts[key][keys[i]].split(/{.*}/);
                let imageName = /{.*}/.exec(posts[key][keys[i]]);

                // Yoo images!!!
                let clickMe;
                if (imageName) {
                    clickMe = document.createElement("a");
                    let image = document.createElement("img");
                    image.src = `/assets/images/blog/${imageName[0].replace("{", "").replace("}", "")}.png`;
                    clickMe.href = image.src;
                    clickMe.appendChild(image);
                }
                
                // Text one.
                let textOne = document.createElement("p");
                textOne.innerText = textList[0];

                // Text two.
                let textTwo = document.createElement("p");
                textTwo.innerText = textList[1];

                // Adds everything.
                toAdd.append(textOne);
                if (imageName) {
                    toAdd.append(clickMe);
                    toAdd.append(textTwo);
                }
            }
            blogPost.append(toAdd);
        }
        toAppend.appendChild(blogPost);
    }
}

// Checks for browser mobile useragent
function isMobile() {
    return /Android|iPhone/i.test(navigator.userAgent);
}

loadBlog();