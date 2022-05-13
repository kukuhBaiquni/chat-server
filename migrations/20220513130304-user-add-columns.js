module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    Promise.all([
      await queryInterface.addColumn('Users', 'otp_code', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      await queryInterface.addColumn('Users', 'verification_code', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      await queryInterface.addColumn('Users', 'is_verified', {
        type: Sequelize.BOOLEAN,
        default: false,
      }),
    ])
  },
}
