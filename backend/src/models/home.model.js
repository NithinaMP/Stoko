const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Home", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    home_name: { type: DataTypes.STRING, allowNull: false },
    created_by: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "homes",
    timestamps: false
  });
};
