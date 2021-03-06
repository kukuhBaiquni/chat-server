const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.Conversations, {
        foreignKey: 'conversation_id',
        as: 'conversation',
      })
    }
  }
  Chat.init(
    {
      user_id: DataTypes.STRING,
      conversation_id: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Chats',
      freezeTableName: true,
    },
  )
  return Chat
}
