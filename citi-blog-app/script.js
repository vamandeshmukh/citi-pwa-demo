
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
        document.getElementById('blog-list').innerHTML = blogList;
    })
    .catch((error) => {
        console.log(error);
    });




