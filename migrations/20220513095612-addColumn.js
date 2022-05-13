module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      await queryInterface.changeColumn('User', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      }),
      await queryInterface.addColumn('User', 'image', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      await queryInterface.changeColumn('Conversation', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      }),
      await queryInterface.changeColumn('Chat', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      }),
      await queryInterface.changeColumn('Otp', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      }),
    ])
  },
}
