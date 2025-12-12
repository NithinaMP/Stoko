const { Notification, Item } = require("../models");

exports.getNotifications = async (req, res) => {
  try {
    const user = req.user;
    const notifications = await Notification.findAll({
      where: { user_id: user.id },
      include: [{ 
        model: Item, 
        as: 'Item',
        attributes: ['id', 'name', 'category', 'expiry_date', 'location']
      }],
      order: [['sent_on', 'DESC']],
      limit: 50
    });
    
    return res.json(notifications);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    
    const notification = await Notification.findOne({
      where: { id, user_id: user.id }
    });
    
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    
    await notification.destroy();
    return res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};