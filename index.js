const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const allowlist = ["http://127.0.0.1:3000", "http://localhost:3000"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "done" });
});

app.post("/pushNotification", (req, res) => {
  const msg = "HELLO WORLD";
  res.status(200).json({ msg });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
