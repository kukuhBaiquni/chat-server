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
      Chat.belongsTo(models.Conversation, {
        foreignKey: 'conversation_id',
        as: 'conversation',
      })
    }
  }
  Chat.init(
    {
      user_id: DataTypes.STRING,
      conversation_id: DataTypes.INTEGER,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Chat',
      freezeTableName: true,
    },
  )
  return Chat
}
