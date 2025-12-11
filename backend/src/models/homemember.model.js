const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("HomeMember", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    home_id: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.ENUM("admin","member"), allowNull: false }
  }, {
    tableName: "home_members",
    timestamps: false
  });
};
