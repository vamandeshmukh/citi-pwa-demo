
const blogUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments/';
const writersUrl = 'https://jsonplaceholder.typicode.com/users/';

// fetch all blogs list 

fetch(blogUrl)
    .then((resp) => {
        return resp.json();
    })
    .then((data) => {
        console.log(data);
        let blogList = '';
        data.forEach(element => {
            blogList += `<a href="./blog-details.html?blog-id=${element.id}">${element.title}</a><br />`;
        });
        if (document.getElementById('blog-list'))
            document.getElementById('blog-list').innerHTML = blogList;
    })
    .catch((error) => {
        console.log(error);
    });

// fetch blog details 

const blogId = new URLSearchParams(window.location.search).get('blog-id');

fetch(`${blogUrl}/${blogId}`)
    .then((resp) => {
        return resp.json();
    })
    .then((data) => {
        console.log(data);
        if (document.getElementById('blog-title'))
            document.getElementById('blog-title').innerText = data.title;
        if (document.getElementById('blog-body'))
            document.getElementById('blog-body').innerText = data.body;
    })
    .catch((error) => {
        console.log(error);
    });



