module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    Promise.all([
      await queryInterface.addColumn('Users', 'socket_id', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      await queryInterface.addColumn('Users', 'last_seen', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ])
  },
}
