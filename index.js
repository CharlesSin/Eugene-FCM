const express = require("express");
const path = require("path");
const cors = require("cors");
const customfetch = require("node-fetch");
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

app.post("/sendbytoken", async (req, res) => {
  const { fcmToken, msgTitle, msgBody, openUri, imageUri } = req.body;
  const msg = "HELLO WORLD";
  const fcmMsgObject = {
    to: fcmToken,
    data: { msgTitle: msgTitle, msgBody: msgBody, openUri: openUri, imageUri: imageUri },
  };

  customfetch("https://fcm.googleapis.com/fcm/send", {
    method: "post",
    body: JSON.stringify(fcmMsgObject),
    headers: { "Content-Type": "application/json", Authorization: process.env.FCM_SERVER_TOKEN },
  }).then((responseData) => {
    res.status(200).json({ msg, fcmMsgObject, responseData });
  });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
