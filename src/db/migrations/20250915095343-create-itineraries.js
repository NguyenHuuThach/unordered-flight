module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("itineraries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      list: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ip: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("itineraries");
  },
};
