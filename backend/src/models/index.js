const sequelize = require("../config/db");
const UserModel = require("./user.model");
const HomeModel = require("./home.model");
const HomeMemberModel = require("./homemember.model");
const ItemModel = require("./item.model");
const NotificationModel = require("./notification.model");

const User = UserModel(sequelize);
const Home = HomeModel(sequelize);
const HomeMember = HomeMemberModel(sequelize);
const Item = ItemModel(sequelize);
const Notification = NotificationModel(sequelize);

// User -> Home (creator)
User.hasMany(Home, { foreignKey: "created_by" });
Home.belongsTo(User, { foreignKey: "created_by" });

// Home -> Items
Home.hasMany(Item, { foreignKey: "home_id" });
Item.belongsTo(Home, { foreignKey: "home_id" });

// User -> Items (added by)
User.hasMany(Item, { foreignKey: "added_by" });
Item.belongsTo(User, { foreignKey: "added_by", as: "AddedByUser" });

// Home <-> User (through HomeMember)
HomeMember.belongsTo(Home, { foreignKey: "home_id" });
HomeMember.belongsTo(User, { foreignKey: "user_id" });
Home.hasMany(HomeMember, { foreignKey: "home_id" });
User.hasMany(HomeMember, { foreignKey: "user_id" });

// Item -> Notifications
Item.hasMany(Notification, { foreignKey: "item_id" });
Notification.belongsTo(Item, { foreignKey: "item_id" });

// User -> Notifications
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  sequelize,
  User, Home, HomeMember, Item, Notification
};