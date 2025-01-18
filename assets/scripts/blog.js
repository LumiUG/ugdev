// JSON imports
var posts = await fetch('/assets/data/blog.json')
    .then((response) => response.json())
    .then((data) => {return data});

var postCatcher = document.getElementById("catcher");
var postModal = document.getElementById("post");
var postTitle = document.getElementById("postTitle");
var postContent = document.getElementById("postContent");
var postDate = document.getElementById("postTime");
postCatcher.addEventListener("click", function () { postCatcher.style.display = "none"; postModal.style.display = "none"; }, false);

// Builds the blog section.
function loadBlog() {
    let toAppend = document.getElementById("blog");
    
    // Disallow view for mobile.
    if (isMobile()) {
        toAppend.style.textAlign = "center";
        let sorry = document.createElement("p");
        sorry.innerText = "Sorry! Viewing the blog in mobile is not supported right now. You can check the blog titles, though.";
        sorry.style.marginBottom = "15px";
        toAppend.appendChild(sorry);
    };
    
    // Create all the main divs for blog posts
    const sort = Object.keys(posts).sort(function (a, b) { return a + b; }); // latest first
    for (const key of sort) {
        let blogPost = document.createElement("div");
        let title = document.createElement("h3");
        blogPost.classList += `blogPost drop-blurry-black`;
        title.textContent = posts[key]["title"];
        
        // Add it
        blogPost.append(title);
        blogPost.addEventListener("click", function () { ReadBlog(posts[key]) }, false);
        toAppend.appendChild(blogPost);
    }
}

// Opens up the modal for reading
function ReadBlog(post) {
    if (isMobile()) return;
    
    // Toggle modal
    postModal.style.display = "flex";
    postCatcher.style.display = "flex";
    
    // Replace {} with image
    let text = post["post"];
    let imageName = /{.*}/.exec(text);
    if (imageName) {
        let srcPath = `/assets/images/blog/${imageName[0].replace("{", "").replace("}", "")}`;
        text = text.replace(/{.*}/, `<a href="${srcPath}"><img src="${srcPath}"></a><br>`);
    }
    
    // Set everything
    postContent.innerHTML = text;
    postTitle.textContent = post["title"];
    postDate.textContent = `Posted on: ${post["date"]}`;
}

// Checks for browser mobile useragent
function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
}

// Load everything
loadBlog();

// Url variable to load a post
let postPost = new URLSearchParams(window.location.search).getAll("post");
if (postPost.length == 1) {
    let requestedPost = posts[postPost];
    if (requestedPost != undefined) ReadBlog(requestedPost);
}