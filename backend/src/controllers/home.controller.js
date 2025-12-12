const { Home, HomeMember, User } = require("../models");
const { Op } = require("sequelize");

exports.createHome = async (req, res) => {
  try {
    const user = req.user;
    const { home_name } = req.body;
    if (!home_name) return res.status(400).json({ message: "Home name required" });
    
    const home = await Home.create({ 
      home_name, 
      created_by: user.id 
    });
    
    await HomeMember.create({ 
      user_id: user.id, 
      home_id: home.id, 
      role: "admin" 
    });
    
    return res.json(home);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMyHomes = async (req, res) => {
  try {
    const user = req.user;
    const members = await HomeMember.findAll({ 
      where: { user_id: user.id },
      include: [{ model: Home, as: 'Home' }]
    });
    
    const homes = members.map(m => ({
      ...m.Home.toJSON(),
      role: m.role
    }));
    
    return res.json(homes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.inviteMember = async (req, res) => {
  try {
    const user = req.user;
    const { home_id, email } = req.body;
    
    const member = await HomeMember.findOne({ 
      where: { user_id: user.id, home_id } 
    });
    if (!member || member.role !== "admin") {
      return res.status(403).json({ message: "Only admins can invite" });
    }
    
    const invitee = await User.findOne({ where: { email } });
    if (!invitee) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const existing = await HomeMember.findOne({ 
      where: { user_id: invitee.id, home_id } 
    });
    if (existing) {
      return res.status(409).json({ message: "Already a member" });
    }
    
    await HomeMember.create({ 
      user_id: invitee.id, 
      home_id, 
      role: "member" 
    });
    
    return res.json({ message: "Member invited successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const user = req.user;
    const { home_id } = req.query;
    
    const member = await HomeMember.findOne({ 
      where: { user_id: user.id, home_id } 
    });
    if (!member) {
      return res.status(403).json({ message: "Not a member" });
    }
    
    const members = await HomeMember.findAll({ 
      where: { home_id },
      include: [{ model: User, as: 'User', attributes: ['id', 'name', 'email'] }]
    });
    
    const result = members.map(m => ({
      id: m.User.id,
      name: m.User.name,
      email: m.User.email,
      role: m.role
    }));
    
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};