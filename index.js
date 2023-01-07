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
    apiKey: "AIzaSyAen2FnXy-gKlxgeHZSgTpr-dAUsD9X7bM",
    projectId: "eugene-fcm",
    messagingSenderId: "909731893166",
    appId: "1:909731893166:web:b18c5a0cdc2fcff00c823f",
  };
  res.status(200).json({ config: json });
});

app.get("/firebasevapidkey", (req, res) => {
  const json = {
    vapidKey: "BI4vxOcRLneYRWuOhoaXWLTdYmY4xChF_XudMLNyW1wreBM9kE3bdEA66AAiQPRuTvo_otmq37UedZwiiOXwoBA",
  };
  res.status(200).json({ config: json });
});

app.post("/pushNotification", (req, res) => {
  const { data } = req.body;
  const msg = "HELLO WORLD";
  res.status(200).json({ msg, data });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
