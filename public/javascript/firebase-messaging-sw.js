importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

function fetchGetMethod(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
}

setTimeout(() => {
  firebase.initializeApp({
    apiKey: "AIzaSyAen2FnXy-gKlxgeHZSgTpr-dAUsD9X7bM",
    projectId: "eugene-fcm",
    messagingSenderId: "909731893166",
    appId: "1:909731893166:web:b18c5a0cdc2fcff00c823f",
  });

  firebase.messaging().onBackgroundMessage((payload) => {
    const notificationTitle = `Title: ${payload.data.msgTitle}`;
    const notificationOptions = {
      body: `Body: ${payload.data.msgBody}`,
      icon: payload.data.imageUri,
      url: payload.data.openUri,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  self.addEventListener(
    "notificationclick",
    function (event) {
      event.notification.close();
      if (event.notification.url) {
        self.clients.openWindow(event.notification.url).then((windowClient) => (windowClient ? windowClient.focus() : null));
      }
    },
    false
  );
}, 1000);
