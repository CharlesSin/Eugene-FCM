const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");

const FCMAPI = require("./routes/fcm-api");
const PORT = process.env.PORT || 8282;

require("dotenv").config();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// routes
app.use("/register", require("./routes/auth/register"));
app.use("/auth", require("./routes/auth/auth"));
app.use("/refresh", require("./routes/auth/refresh"));
app.use("/logout", require("./routes/auth/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/auth/api/employees"));

app.use("/firebase", FCMAPI);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "done" });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
