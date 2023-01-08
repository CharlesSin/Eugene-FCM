const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "done" });
});

app.get("/firebaseConfigKey", (req, res) => {
  const json = {
    apiKey: process.env.APIKEY,
    projectId: process.env.PROJECTID,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
  };
  res.status(200).json({ config: json });
});

app.get("/firebasevapidkey", (req, res) => {
  const json = {
    vapidKey: process.env.VAPIDKEY,
  };
  res.status(200).json({ config: json });
});

// Example POST method implementation:
async function fetchPostData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.FCM_SERVER_KEY,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  // return response.json(); // parses JSON response into native JavaScript objects
  return response; // parses JSON response into native JavaScript objects
}

app.post("/sendbytoken", (req, res) => {
  const { fcmToken, msgTitle, msgBody, openUri, imageUri } = req.body;
  const msg = "HELLO WORLD";
  const fcmMsgObject = {
    to: fcmToken,
    data: { msgTitle: msgTitle, msgBody: msgBody, openUri: openUri, imageUri: imageUri },
  };

  postData("https://fcm.googleapis.com/fcm/send", fcmMsgObject)
    .then((responseData) => {
      console.log(responseData); // JSON data parsed by `data.json()` call
      res.status(200).json({ msg, fcmMsgObject, responseData });
    })
    .catch((err) => {
      res.status(501).json({ msg, fcmMsgObject, err });
    });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
