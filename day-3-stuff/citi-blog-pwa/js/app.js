// app.js 
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/serviceWorker.js", { scope: "/" })
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}


// get blog by id 

const url = 'https://jsonplaceholder.typicode.com/posts';

const getBlogById = () => {
  const blogId = document.getElementById('blog-id').value;
  console.log(blogId);

  fetch(`${url}/${blogId}`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      document.getElementById('blog-title').innerHTML = data.title;
      document.getElementById('blog-body').innerHTML = data.body;
      data.forEach(elem => {
        blogList += `<p>${elem.title}</p>`;
      });
      document.getElementById('blog-list').innerHTML = blogList;
    })
    .catch();
}

// const url = 'https://jsonplaceholder.typicode.com/posts';
// fetch(url)
//   .then(resp => resp.json())
//   .then(data => {
//     console.log(data);
//     let blogList = `<p><b>Blog List</b></p>`;
//     data.forEach(elem => {
//       blogList += `<p>${elem.title}</p>`;
//     });
//     document.getElementById('blog-list').innerHTML = blogList;
//   })
//   .catch();

// camera access 

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      let video = document.getElementById('camera-preview');
      // video.srcObject = stream;
      // video.onplay();
    })
    .catch(err => console.log(err));
}
else {
  console.log('not working!');
}

// source: https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos 


const camPics = () => {

  const width = 320;
  let height = 0;
  let streaming = false;
  let video = null;
  let canvas = null;
  let photo = null;
  let startbutton = null;

  function showViewLiveResultButton() {

    if (window.self !== window.top) {
      document.querySelector(".contentarea").remove();
      const button = document.createElement("button");
      button.textContent = "View live result of the example code above";
      document.body.append(button);
      button.addEventListener("click", () => window.open(location.href));
      return true;
    }
    return false;
  }

  function startup() {
    if (showViewLiveResultButton()) {
      return;
    }
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          if (isNaN(height)) {
            height = width / (4 / 3);
          }
          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false,
    );

    startbutton.addEventListener(
      "click",
      (ev) => {
        takepicture();
        ev.preventDefault();
      },
      false,
    );
    clearphoto();
  }

  function clearphoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }
  window.addEventListener("load", startup, false);
}

camPics();



// notifications 
self.addEventListener("load", () => {
  console.log('load');
  Notification.requestPermission().then((result) => {
    console.log('click');
    if (result === "granted") {
      randomNotification();
    }
  });
});

const randomNotification = async () => {
  console.log('randomNotification');
  const notifImg = `/images/citi-logo.png`;
  const options = {
    title: 'title1',
    body: 'body1',
    icon: notifImg,
  };
  new Notification(notifTitle, options);
  setTimeout(randomNotification, 1000000);
}






















