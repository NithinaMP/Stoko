const { Item, HomeMember } = require("../models");

exports.addItem = async (req, res) => {
  try {
    const user = req.user;
    const { home_id, name, category, quantity, location, expiry_date, image_url } = req.body;
    const member = await HomeMember.findOne({ where: { user_id: user.id, home_id }});
    if (!member) return res.status(403).json({ message: "Not a member of this home" });
    const item = await Item.create({
      home_id,
      name,
      category,
      quantity: quantity || 1,
      location,
      expiry_date,
      image_url,
      added_by: user.id
    });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.listItems = async (req, res) => {
  try {
    const user = req.user;
    const home_id = req.query.home_id;
    const member = await HomeMember.findOne({ where: { user_id: user.id, home_id }});
    if (!member) return res.status(403).json({ message: "Not a member" });
    const items = await Item.findAll({ where: { home_id }, order: [["expiry_date","ASC"]]});
    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    const member = await HomeMember.findOne({ where: { user_id: user.id, home_id: item.home_id }});
    if (!member) return res.status(403).json({ message: "Not a member" });
    await item.update(req.body);
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    const member = await HomeMember.findOne({ where: { user_id: user.id, home_id: item.home_id }});
    if (!member) return res.status(403).json({ message: "Not a member" });
    await item.destroy();
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
