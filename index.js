const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const fcmAPI = require("./routes/fcm-api");

require("dotenv").config();

app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/firebase", fcmAPI);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "done" });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
