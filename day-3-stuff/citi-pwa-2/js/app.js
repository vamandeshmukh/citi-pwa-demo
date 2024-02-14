
// sw registration 

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/serviceWorker.js", { scope: "/" })
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}

document.getElementById("home").style.display = "block";
document.getElementById("blog-list").style.display = "none";
document.getElementById("blog-details").style.display = "none";
document.getElementById("write-blog").style.display = "none";

// home 

const home = () => {

  document.getElementById("home").style.display = "block";
  document.getElementById("blog-list").style.display = "none";
  document.getElementById("blog-details").style.display = "none";
  document.getElementById("write-blog").style.display = "none";

};

// blog functions 

const blogUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments/';
const writersUrl = 'https://jsonplaceholder.typicode.com/users/';

// fetch all blogs list 
const getBlogList = () => {

  document.getElementById("home").style.display = "none";
  document.getElementById("blog-list").style.display = "block";
  document.getElementById("blog-details").style.display = "none";
  document.getElementById("write-blog").style.display = "none";

  fetch(blogUrl)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      let blogList = '';
      data.forEach(element => {
        blogList += `<a href="javascript:getBlogById(${element.id})">${element.title}</a><br />`;
      });
      document.getElementById('blogs-lists').innerHTML = blogList;
    })
    .catch((error) => {
      console.log(error);
    });
};



// fetch blog details 

const getBlogById = (blogId) => {

  document.getElementById("home").style.display = "none";
  document.getElementById("blog-list").style.display = "none";
  document.getElementById("blog-details").style.display = "block";
  document.getElementById("write-blog").style.display = "none";

  fetch(`${blogUrl}/${blogId}`)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById('blog-title').innerText = data.title;
      document.getElementById('blog-body').innerText = data.body;
    })
    .catch((error) => {
      console.log(error);
    });
};

const randomBlog = () => {

  document.getElementById("home").style.display = "none";
  document.getElementById("blog-list").style.display = "none";
  document.getElementById("blog-details").style.display = "block";
  document.getElementById("write-blog").style.display = "none";

  getBlogById(Math.floor(Math.random() * 100));
};

const writeBlog = () => {

  document.getElementById("home").style.display = "none";
  document.getElementById("blog-list").style.display = "none";
  document.getElementById("blog-details").style.display = "none";
  document.getElementById("write-blog").style.display = "block";

  // fetch 

};



