'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
  PasswordReset.belongsTo(models.user, { foreignKey: 'user_id' });

    }
  }
  PasswordReset.init({
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expires_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PasswordReset',
  });
  return PasswordReset;
};