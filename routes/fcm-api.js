const express = require("express");
const router = express.Router();

router.get("/firebaseConfigKey", (req, res) => {
  const json = {
    apiKey: process.env.APIKEY,
    projectId: process.env.PROJECTID,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
  };
  res.status(200).json({ config: json });
});

router.get("/firebasevapidkey", (req, res) => {
  const json = {
    vapidKey: process.env.VAPIDKEY,
  };
  res.status(200).json({ config: json });
});

router.post("/sendbytoken", async (req, res) => {
  const { fcmToken, msgTitle, msgBody, openUri, imageUri } = req.body;
  const msg = "This is a Middle api.";
  const fcmMsgObject = {
    to: fcmToken,
    data: { msgTitle: msgTitle, msgBody: msgBody, openUri: openUri, imageUri: imageUri },
  };

  res.status(200).json({ msg, fcmMsgObject });
});

module.exports = router;
