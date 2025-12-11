const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    home_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    location: { type: DataTypes.STRING },
    expiry_date: { type: DataTypes.DATEONLY },
    image_url: { type: DataTypes.TEXT },
    added_by: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "items",
    timestamps: false
  });
};
