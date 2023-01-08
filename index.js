const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");
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

async function postData(uri = "", data = {}) {
  const response = await fetch(uri, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Authorization: process.env.FCM_SERVER_TOKEN },
  });
  const data = await response.json();

  return data;
}

app.post("/sendbytoken", (req, res) => {
  const { fcmToken, msgTitle, msgBody, openUri, imageUri } = req.body;
  const msg = "HELLO WORLD";
  const fcmMsgObject = {
    to: fcmToken,
    data: { msgTitle: msgTitle, msgBody: msgBody, openUri: openUri, imageUri: imageUri },
  };

  postData("https://fcm.googleapis.com/fcm/send", fcmMsgObject).then((responseData) => {
    console.log(responseData); // JSON data parsed by `data.json()` call
    res.status(200).json({ msg, fcmMsgObject, responseData });
  });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
