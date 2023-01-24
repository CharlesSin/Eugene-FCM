const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const userService = require("../services/UserService");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ message: "Username and password are required." });

  const allUsers = await userService.getAllUsers();
  const foundUser = allUsers.find((person) => person.username === user);

  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    // Saving refreshToken with current user
    const currentUser = {
      username: foundUser.username,
      password: foundUser.password,
      refreshToken: refreshToken,
      lastLoginTimestamp: new Date().getTime(),
      lastLoginDateTIme: new Date(),
    };

    userService.updateUser(foundUser._id, currentUser);

    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 });

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
