const fsPromises = require("fs").promises;
const path = require("path");

const userService = require("../services/UserService");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const allUsers = await userService.getAllUsers();

  const foundUser = allUsers.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(204).json({ data: "User Not Found" });
  }

  // replace refreshToken in db
  const currentUser = {
    username: foundUser.username,
    password: foundUser.password,
    refreshToken: "",
  };

  userService.updateUser(foundUser._id, currentUser);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(201).json({ data: "Logout Successful" });
};

module.exports = { handleLogout };
