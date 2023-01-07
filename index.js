const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

require("dotenv").config();

// const allowlist = ["http://127.0.0.1:3000", "http://localhost:3000", "https://charles-fcm-web.netlify.app"];
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "done" });
});

app.post("/pushNotification", (req, res) => {
  const { data } = req.body;
  const msg = "HELLO WORLD";
  res.status(200).json({ msg, data });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
