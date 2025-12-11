const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Notification", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    item_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
    type: { type: DataTypes.ENUM("daily","2days","week","expired") },
    sent_on: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "notifications",
    timestamps: false
  });
};
