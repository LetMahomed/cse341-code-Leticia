const User = require("../models/user");

// GET all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// GET user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// POST create user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({ error: "name and email are required" });

    const user = new User({ name, email });
    const saved = await user.save();

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT update user
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({ error: "name and email are required" });

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "User not found" });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE user
exports.deleteUser = async (req, res, next) => {
  try {
    const removed = await User.findByIdAndDelete(req.params.id);

    if (!removed)
      return res.status(404).json({ error: "User not found" });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
