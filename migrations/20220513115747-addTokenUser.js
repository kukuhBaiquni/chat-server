module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const tables = await queryInterface.showAllTables()
    console.log(tables)
    await queryInterface.addColumn('Users', 'token', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },
}
