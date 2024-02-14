// app.js 
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/serviceWorker.js", { scope: "/" })
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}


const url = 'https://jsonplaceholder.typicode.com/posts';

fetch(url)
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    let blogList = `<p><b>Blog List</b></p>`;
    data.forEach(elem => {
      blogList += `<p>${elem.title}</p>`;
    });
    document.getElementById('blog-list').innerHTML = blogList;
  })
  .catch();
