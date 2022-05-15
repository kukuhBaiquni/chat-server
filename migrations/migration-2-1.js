module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    Promise.all([
      await queryInterface.changeColumn('Chats', 'user_id', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      await queryInterface.changeColumn('Chats', 'conversation_id', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ])
  },
}
