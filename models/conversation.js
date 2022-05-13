const {
  Model,
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.hasOne(models.Chats, {
        foreignKey: 'conversation_id',
        as: 'chat',
      })
    }
  }
  Conversation.init({
    user_group: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Conversations',
    freezeTableName: true,
  })
  return Conversation
}
