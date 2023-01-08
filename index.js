const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
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

function postData(uri = "", data = {}) {
  return axios
    .post(uri, { headers: { Authorization: process.env.FCM_SERVER_KEY, "Content-Type": "application/json" } }, data)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
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
  // res.status(200).json({ msg, fcmMsgObject });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
