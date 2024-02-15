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





























if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceWorker.js')
          .then(registration => {
              console.log('Service worker registered:', registration);
              return registration.pushManager.getSubscription()
                  .then(subscription => {
                      if (subscription) {
                          return subscription;
                      }
                      return registration.pushManager.subscribe({
                          userVisibleOnly: true,
                          applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_KEY')
                      });
                  });
          })
          .then(subscription => {
              console.log('User subscribed to push notifications:', subscription);
          })
          .catch(error => {
              console.error('Service worker registration failed:', error);
          });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
