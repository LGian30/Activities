const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    res.json({ success: true, data: await User.all() });
  } catch (er) {
    res.status(500).json({ success: false, error: er.message})
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.find(req.params.id);
    if(!user) {
      return res.status(404).json({succes: false, error: "User not found"});
    }
    res.json({ success: true, data: user });
  } catch (er) {
    res.status(500).json({ success: false, error: er.message})
  }
}