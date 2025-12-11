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

// Associations
User.hasMany(Home, { foreignKey: "created_by" });
Home.belongsTo(User, { foreignKey: "created_by" });

Home.hasMany(Item, { foreignKey: "home_id" });
Item.belongsTo(Home, { foreignKey: "home_id" });

User.hasMany(Item, { foreignKey: "added_by" });
Item.belongsTo(User, { foreignKey: "added_by" });

Home.belongsToMany(User, { through: HomeMember, foreignKey: "home_id", otherKey: "user_id" });
User.belongsToMany(Home, { through: HomeMember, foreignKey: "user_id", otherKey: "home_id" });

Item.hasMany(Notification, { foreignKey: "item_id" });
Notification.belongsTo(Item, { foreignKey: "item_id" });

User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  sequelize,
  User, Home, HomeMember, Item, Notification
};
