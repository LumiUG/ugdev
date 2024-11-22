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
        sorry.innerText = "Sorry! Viewing the blog in mobile is not supported right now :<";
        toAppend.appendChild(sorry);
        return;
    };
    
    const sort = Object.keys(posts).sort(function (a, b) { return a + b; }); // latest first
    for (const key of sort) {
        // Set the default div(s).
        let blogPost = document.createElement("div");
        blogPost.classList += `blogPost drop-blurry-black`;
        
        // Iterate through the default values and generate the outcome.
        for (let i = 0; i < elements.length; i++) {
            if (!posts[key][keys[i]]) continue;
            let toAdd = document.createElement(elements[i]);
            let text = posts[key][keys[i]];
            if (elements[i] == "p") toAdd.classList += "date";

            // Custom handling for blog content
            if (elements[i] == "div") {
                // Replace {} with image
                let imageName = /{.*}/.exec(text);
                if (imageName) {
                    let srcPath = `/assets/images/blog/${imageName[0].replace("{", "").replace("}", "")}`;
                    text = text.replace(/{.*}/, `<a href="${srcPath}"><img src="${srcPath}"></a><br>`);
                }
                
                // Adds to toAdd
                let content = document.createElement("p");
                content.innerHTML = text;
                toAdd.append(content);
            }
            else toAdd.innerHTML = text;

            // Adds everything.
            blogPost.append(toAdd);
        }
        toAppend.appendChild(blogPost);
    }
}

// Checks for browser mobile useragent
function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
}

loadBlog();