const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Otps, {
        foreignKey: 'user_id',
        as: 'otp',
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      token: DataTypes.STRING,
      otp_code: DataTypes.STRING,
      verification_code: DataTypes.STRING,
      is_verified: DataTypes.BOOLEAN,
      last_seen: DataTypes.DATE,
      socket_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
      freezeTableName: true,
    },
  )
  return User
}
