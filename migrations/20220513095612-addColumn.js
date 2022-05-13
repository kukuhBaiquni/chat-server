module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    Promise.all([
      await queryInterface.changeColumn('Users', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      }),
      await queryInterface.changeColumn('Conversations', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      }),
      await queryInterface.changeColumn('Chats', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      }),
      await queryInterface.changeColumn('Otps', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      }),
    ])
  },
}
