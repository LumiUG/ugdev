// JSON imports
var posts = await fetch('/assets/data/blog.json')
    .then((response) => response.json())
    .then((data) => {return data});

// Checks for browser mobile useragent (copied from mobile.js)
function isMobile()
{
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
}

var postCatcher = document.getElementById("catcher");
var postModal = document.getElementById("post");
var postTitle = document.getElementById("postTitle");
var postContent = document.getElementById("postContent");
var postDate = document.getElementById("postTime");
postCatcher.addEventListener("click", function () { postCatcher.style.display = "none"; postModal.style.display = "none"; }, false);

// Builds the blog section.
function loadBlog()
{
    let toAppend = document.getElementById("blog");
    
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
function ReadBlog(post)
{
    // Toggle modal
    postModal.style.display = "flex";
    postCatcher.style.display = "flex";
    
    // Replace {} with image
    let text = post["post"];
    let imageName = /{.*}/.exec(text);
    if (imageName) {
        let srcPath = `/assets/images/blog/${imageName[0].split(";")[0].replace("{", "").replace("}", "")}`;
        text = text.replace(/{.*}/, `<a href="${srcPath}"><img src="${srcPath}"></a><br>`);
    }
    
    // Set everything
    postContent.innerHTML = text;
    postTitle.textContent = post["title"];
    postDate.textContent = `Posted on: ${post["date"]}`;

    // Mobile blog post
    if (imageName && isMobile())
    {
        document.querySelector("#postDiv a img").style.maxHeight = `${imageName[0].split(";")[1].replace("}", "")}px`;
    }
}

// Load everything
loadBlog();

// Url variable to load a post
let postPost = new URLSearchParams(window.location.search).getAll("post");
if (postPost.length == 1)
{
    let requestedPost = posts[postPost];
    if (requestedPost != undefined) ReadBlog(requestedPost);
}