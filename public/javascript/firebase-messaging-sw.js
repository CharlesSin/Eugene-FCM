importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

const API_URI = "https://eugene-fcm.vercel.app";

function fetchGetMethod(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
}

setTimeout(async () => {
  const { config: configKey } = await fetchGetMethod(`${API_URI}/firebaseConfigKey`);
  firebase.initializeApp({
    apiKey: `${configKey.apiKey}`,
    projectId: `${configKey.projectId}`,
    messagingSenderId: `${configKey.messagingSenderId}`,
    appId: `${configKey.appId}`,
  });

  firebase.messaging().onBackgroundMessage((payload) => {
    const notificationTitle = `Title: ${payload.data.msgTitle}`;
    const notificationOptions = {
      body: `Body: ${payload.data.msgBody}`,
      icon: payload.data.imageUri,
      data: { link: `${payload.data.openUri}` },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  self.addEventListener(
    "notificationclick",
    function (event) {
      event.notification.close();
      console.log("event.notification.url: ");
      console.log(event.notification);
      clients.openWindow(event.notification.data.link).then((windowClient) => (windowClient ? windowClient.focus() : null));
    },
    false
  );
}, 1000);
