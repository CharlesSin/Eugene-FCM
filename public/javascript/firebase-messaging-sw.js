importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAen2FnXy-gKlxgeHZSgTpr-dAUsD9X7bM",
  projectId: "eugene-fcm",
  messagingSenderId: "909731893166",
  appId: "1:909731893166:web:b18c5a0cdc2fcff00c823f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = `Title: ${payload.data.msgTitle}`;
  const notificationOptions = {
    body: `Body: ${payload.data.msgBody}`,
    icon: "./images01.png",
    url: payload.data.openUri,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener(
  "notificationclick",
  function (event) {
    event.notification.close();
    self.clients.openWindow(event.notification.url).then((windowClient) => (windowClient ? windowClient.focus() : null));
  },
  false
);
