const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Home, HomeMember } = require("../models");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
  try {
    const existing = await User.findOne({ where: { email }});
    if (existing) return res.status(409).json({ message: "Email already used" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash: hash });
    const home = await Home.create({ home_name: `${name}'s Home`, created_by: user.id });
    await HomeMember.create({ user_id: user.id, home_id: home.id, role: "admin" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email }});
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.me = async (req, res) => {
  const u = req.user;
  return res.json({ id: u.id, name: u.name, email: u.email });
};
