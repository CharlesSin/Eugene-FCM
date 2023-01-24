const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const userService = require("../services/UserService");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const allUsers = await userService.getAllUsers();
  const duplicate = allUsers.find((person) => person.username === user);

  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // store the new user
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPwd,
    };

    const createUser = await userService.createUser(newUser);
    res.status(201).json({ success: `New user ${user} created!`, data: createUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
