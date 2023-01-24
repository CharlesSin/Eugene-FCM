const UserModel = require("../models/User");

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.createUser = async (userObj) => {
  return await UserModel.create(userObj);
};
exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUser = async (id, userObj) => {
  return await UserModel.findByIdAndUpdate(id, userObj);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
